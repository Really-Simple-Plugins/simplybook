<?php

namespace SimplyBook\Http;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Carbon\Carbon;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Http\DTO\ApiResponseDTO;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Traits\HasTokenManagement;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Support\Builders\CompanyBuilder;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;
use SimplyBook\Services\CreateAccountService;
use SimplyBook\Services\CallbackUrlService;

/**
 * @todo Refactor this to a proper Client (jira: NL14RSP2-6)
 */
class ApiClient
{
    use LegacyLoad;
    use LegacySave;
    use HasTokenManagement;
    use HasLogging;
    use HasAllowlistControl;

    protected EnvironmentConfig $env;

    protected CreateAccountService $createAccountService;

    protected CallbackUrlService $callbackUrlService;

    /**
     * Flag to use during onboarding. Will help us recognize if we are in the
     * middle of the onboarding process.
     */
    private bool $duringOnboardingFlag = false;

    /**
     * Key for the {@see authenticationFailedFlag} property.
     */
    protected string $authenticationFailedFlagKey = 'simplybook_authentication_failed_flag';

    /**
     * Flag to use when the authentication failed indefinitely. This is used to
     * prevent us retrying again and again. This flag is possibly true when a
     * refresh token is outdated AND the user has changed their password.
     */
    protected bool $authenticationFailedFlag = false;

    protected string $_commonCacheKey = '_v13';
    protected array $_avLanguages = [
        'en', 'fr', 'es', 'de', 'ru', 'pl', 'it', 'uk', 'zh', 'cn', 'ko', 'ja', 'pt', 'br', 'nl'
    ];

    /**
     * Construct is executed on plugins_loaded on purpose. This way even
     * visitors can refresh invalid tokens.
     *
     * @throws \LogicException For developers.
     */
    public function __construct(EnvironmentConfig $env, CreateAccountService $createAccountService, CallbackUrlService $callbackUrlService)
    {
        $this->env = $env;
        $this->createAccountService = $createAccountService;
        $this->callbackUrlService = $callbackUrlService;
        $environment = $this->env->get('simplybook.api', []);

        if (empty($environment)) {
            throw new \LogicException('Register the environment for the application in the container');
        }

        if (get_option($this->authenticationFailedFlagKey)) {
            $this->handleFailedAuthentication();
            return;
        }

        // Refresh admin token if needed
        if (!empty($this->getToken('admin')) && !$this->tokenIsValid('admin')) {
            $this->refresh_token('admin');
        }
    }

    /**
     * Helper method for easy access to the authentication failed flag. Can be
     * useful if somewhere in the App this value is needed. For example
     * {@see \SimplyBook\Features\TaskManagement\Tasks\FailedAuthenticationTask}
     */
    public function authenticationHasFailed(): bool
    {
        return $this->authenticationFailedFlag;
    }

    /**
     * Handle failed authentication. Sets the authentication failed flag to
     * true and dispatches the event on init.
     */
    public function handleFailedAuthentication(): void
    {
        $this->authenticationFailedFlag = true;

        // Dispatch after plugins_loaded so Event can be listened to
        add_action('init', function() {
            Event::dispatch(Event::AUTH_FAILED);
        });
    }

    /**
     * Clear the authentication failed flag. This is used when the user has
     * successfully authenticated again. Currently used after successfully
     * logging in with the sign in modal.
     */
    public function clearFailedAuthenticationFlag(): void
    {
        $this->authenticationFailedFlag = false;
        delete_option($this->authenticationFailedFlagKey);
    }

    /**
     * Set the during onboarding flag
     */
    public function setDuringOnboardingFlag(bool $flag): ApiClient
    {
        $this->duringOnboardingFlag = $flag;
        return $this;
    }

    /**
     * Check if an admin token exists, which indicates the company is registered,
     * and we can make authenticated API calls.
     *
     * Cache duration:
     * - When onboarding completed: 24 hours (stable state)
     * - During onboarding: 10 minutes (more frequent checks)
     * - When no token: 1 minute
     */
    public function company_registration_complete(): bool
    {
        $cacheName = 'company_registration_complete';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        // Check if admin token exists
        if ( !$this->getToken('admin') ) {
            $companyRegistrationStartTime = get_option('simplybook_company_registration_start_time', 0);

            $oneHourAgo = Carbon::now()->subHour();
            $companyRegistrationStartedAt = Carbon::createFromTimestamp($companyRegistrationStartTime);

            // Registration was more than 1h ago. Clear and try again.
            if ($companyRegistrationStartedAt->isBefore($oneHourAgo)) {
                $this->delete_company_login();
            }

            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS);
            return false;
        }

        // If the token exists, and the onboarding is completed, we know
        // the company registration is complete, and we can cache for a longer
        // time.
        $isOnboardingCompleted = (get_option('simplybook_onboarding_completed', false) !== false);
        $cacheTime = MINUTE_IN_SECONDS * 10;
        if ($isOnboardingCompleted) {
            $cacheTime = DAY_IN_SECONDS;
        }

        wp_cache_set($cacheName, true, 'simplybook', $cacheTime);
        return true;
    }

    /**
     * Build the endpoint
     */
    public function endpoint(string $path, string $companyDomain = '', bool $secondVersion = true): string
    {
        $base = 'https://user-api' . ($secondVersion ? '-v2.' : '.');

        // Prevent fields config from being loaded before the init hook. In this
        // case we do not need to validate by default.
        $validateBasedOnDomainConfig = (did_action('init') > 0);

        $domain = $companyDomain ?: $this->get_domain($validateBasedOnDomainConfig);

        return $base . $domain . '/' . $path;
    }

    /**
     * Get a direct login to simplybook.me
     *
     * @return string
     */
    public function get_login_url(): string {
        if ( !$this->company_registration_complete() ) {
            return '';
        }
        //we can't cache this url, because it expires after use.
        //but we want to prevent using it too much, limit request to once per 20 minutes, which is the max of three times/hour.
        $login_url_request_count = get_transient('simplybook_login_url_request_count');
        if ( !$login_url_request_count ) {
            $login_url_request_count = 0;
        }

        $login_url_first_request_time = get_transient('simplybook_login_url_first_request_time');
        $expiration = HOUR_IN_SECONDS;
        if ( $login_url_request_count>=3 ) {
            return '';
        }

        $time_passed_since_first_request = time() - $login_url_first_request_time;
        $remaining_expiration = $expiration - $time_passed_since_first_request;
        set_transient('simplybook_login_url_request_count', $login_url_request_count + 1, $remaining_expiration);
        if ( $login_url_request_count===1 ) {
            set_transient('simplybook_login_url_first_request_time', time(), $remaining_expiration);
        }

        $response = $this->api_call("admin/auth/create-login-hash", [], 'POST');
        if (isset($response['login_url'])) {
            return esc_url_raw($response['login_url']);
        }

        return '';
    }

    /**
     * Method call the create-login-hash endpoint on the SimplyBook API.
     * @throws \Exception When the company registration is not complete or when
     * the response is not as expected.
     */
    public function createLoginHash(): array
    {
        if ( !$this->company_registration_complete() ) {
            throw new \Exception('Company registration is not complete');
        }

        $response = $this->api_call("admin/auth/create-login-hash", [], 'POST');
        if (!isset($response['login_url'])) {
            throw new \Exception('Login URL not found');
        }

        Event::dispatch(EVENT::NAVIGATE_TO_SIMPLYBOOK);
        return $response;
    }

    /**
     * Get headers for an API call
     *
     * @param bool $include_token // optional, default false
     * @param string $token_type
     *
     * @return array
     */
    protected function get_headers( bool $include_token = false, string $token_type = 'public' ): array {
        $token_type = in_array($token_type, ['public', 'admin']) ? $token_type : 'public';
        $headers = array(
            'Content-Type'  => 'application/json',
            'User-Agent' => $this->getRequestUserAgent(),
        );

        if ( $include_token ) {
            $token = $this->getToken($token_type);
            if ( empty($token) && $token_type === 'admin' ) {
                $this->refresh_token('admin');
            }
            $headers['X-Token'] = $token;
            $headers['X-Company-Login' ] = $this->get_company_login();
        }

        return $headers;
    }

    /**
     * Refresh the admin token
     */
    public function refresh_token(string $type = 'admin'): void
    {
        if ($type !== 'admin') {
            return;
        }

        if ($this->isRefreshLocked($type)) {
            return;
        }

        $refresh_token = $this->getToken($type, true);
        if (empty($refresh_token)) {
            $this->releaseRefreshLock($type);
            $this->automaticAuthenticationFallback($type);
            return;
        }

        if ($this->tokenIsValid($type)) {
            $this->releaseRefreshLock($type);
            return;
        }

        // Invalidate the one-time use token as we are about to use it for
        // refreshing the token. This prevents re-use.
        $this->updateToken('', $type, true);

        $this->refreshAdminToken($refresh_token);

        $this->releaseRefreshLock($type);
    }

    /**
     * Refresh admin token directly with SimplyBook
     */
    private function refreshAdminToken(string $refresh_token): void
    {
        $data = [
            'refresh_token' => $refresh_token,
            'company' => $this->get_company_login(),
        ];

        $request = wp_remote_post($this->endpoint('admin/auth/refresh-token'), [
            'headers' => $this->get_headers(false),
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode($data),
        ]);

        $response_code = wp_remote_retrieve_response_code($request);

        if ($response_code === 401) {
            $this->automaticAuthenticationFallback('admin');
            return;
        }

        if (!is_wp_error($request)) {
            $request = json_decode(wp_remote_retrieve_body($request));

            if (isset($request->token) && isset($request->refresh_token)) {
                delete_option('simplybook_token_error');
                $this->updateToken($request->token, 'admin');
                $this->updateToken($request->refresh_token, 'admin', true);
                update_option('simplybook_refresh_company_token_expiration', time() + ($request->expires_in ?? 3600));
                Event::dispatch(Event::AUTH_SUCCEEDED);
            } else {
                $this->log("Error during admin token refresh");
            }
        } else {
            $this->log("Error during admin token refresh: " . $request->get_error_message());
        }
    }

    /**
     * Check if the refresh function is locked for this type. Method also
     * sets the lock for 10 seconds if it is not already set.
     */
    private function isRefreshLocked(string $type): bool
    {
        $lockKey = "simplybook_refresh_lock_{$type}";
        if (get_transient($lockKey)) {
            return true;
        }

        set_transient($lockKey, true, 10);
        return false;
    }

    /**
     * Release the refresh lock for this type.
     */
    private function releaseRefreshLock(string $type): void
    {
        $lockKey = "simplybook_refresh_lock_{$type}";
        delete_transient($lockKey);
    }

    /**
     * Method is used as a fallback mechanism when the refresh token is invalid.
     * This can happen when the user changes their password and the refresh
     * token is invalidated. In this case we need to re-authenticate the
     * user. Currently used when refreshing a token results in a 401
     * error on when decrypting an existing token fails.
     */
    private function automaticAuthenticationFallback(string $type): void
    {
        // Company login can be empty for fresh accounts
        if ($this->authenticationFailedFlag || empty($this->get_company_login(false))) {
            $this->releaseRefreshLock($type);
            return; // Dont even try (again).
        }

        $validateBasedOnDomainConfig = did_action('init');
        $domain = $this->get_domain((bool) $validateBasedOnDomainConfig);

        $companyData = $this->get_company();
        $sanitizedCompany = (new CompanyBuilder())->buildFromArray($companyData);

        try {
            $response = $this->authenticateExistingUser(
                $domain,
                $this->get_company_login(),
                $sanitizedCompany->userLogin,
                $this->decryptString($sanitizedCompany->password)
            );
        } catch (\Exception $e) {
            Event::dispatch(Event::AUTH_FAILED);
            // Their password probably changed. Stop trying to refresh.
            update_option($this->authenticationFailedFlagKey, true);
            $this->authenticationFailedFlag = true;
            $this->log('Error during token refresh: ' . $e->getMessage());
            return;
        }

        $responseStorage = new Storage($response);
        $this->setDuringOnboardingFlag(true); // Allows saving stale fields
        $this->saveAuthenticationData(
            $responseStorage->getString('token'),
            $responseStorage->getString('refresh_token'),
            $domain,
            $this->get_company_login(),
            $responseStorage->getInt('company_id'),
        );

        Event::dispatch(Event::AUTH_SUCCEEDED);

        $this->setDuringOnboardingFlag(false); // Revert previous action
        $this->releaseRefreshLock($type);
    }

    /**
     * Get locale, based on current user's preference, with fallback to site locale, and fallback to 'en' if not existing in available languages
     *
     * @return string
     */
    public function get_locale(): string {
        $available_languages = $this->_avLanguages;
        $user_locale = get_user_locale();
        $user_locale = substr($user_locale, 0, 2);
        if ( in_array( $user_locale, $available_languages ) ) {
            return $user_locale;
        }

        $site_locale = get_locale();
        $site_locale = substr($site_locale, 0, 2);
        if ( in_array( $site_locale, $available_languages ) ) {
            return $site_locale;
        }

        return 'en';
    }

    /**
     * Get company login and generate one if it does not exist
     * @return string
     */
    public function get_company_login(bool $create = true): string
    {
        $login = get_option('simplybook_company_login', '');
        if ( !empty($login) ) {
            return $login;
        }

        if ($create === false) {
            return ''; // Abort
        }

        //generate a random integer of 10 digits
        //we don't use random characters because of forbidden words.
        $random_int = random_int(1000000000, 9999999999);
        $login = 'rsp'.$random_int;
        update_option('simplybook_company_login', $login, false );
        return $login;
    }

    /**
     * Clear the company login, used when the company registration is never completed, possibly when the callback has failed.
     *
     * @return void
     */
    public function delete_company_login(): void {
        delete_option('simplybook_company_login');
    }



    /**
     * Check if authorization is valid and complete
     */
    public function isAuthenticated(): bool
    {
        //check if we have a token
        if (!$this->tokenIsValid('admin')) {
            $this->refresh_token('admin');
        }

        // Check if the flag is set
        if ($this->authenticationFailedFlag) {
            return false;
        }

        //check if we have a company
        if (!$this->company_registration_complete()) {
            return false;
        }

        return true;
    }

    public function reset_registration(): void
    {
        $this->delete_company_login();
        $this->clearTokens();
        delete_option('simplybook_completed_step');
    }

    /**
     * Registers a company with the API
     * @internal method can be recursive a maximum of 3 times in one minute
     * @throws ApiException
     */
    public function register_company(CompanyBuilder $company, $captchaToken = ''): ApiResponseDTO
    {
        if ($this->adminAccessAllowed() === false) {
            throw new ApiException(
                __('You are not authorized to do this.', 'simplybook')
            );
        }

        if (get_transient('simply_book_attempt_count') > 3) {
            throw new ApiException(
                __('Too many attempts to register company, please try again in a minute.', 'simplybook')
            );
        }

        if ($company->isValid() === false) {
            throw new ApiException(
                __('Please fill in all required fields to create an account.', 'simplybook')
            );
        }

        $companyLogin = $this->get_company_login();
        $callbackUrl = $this->callbackUrlService->getFullCallbackUrl();

        $rawResponse = $this->createAccountService->registerCompany(
            $companyLogin,
            $company->email,
            $this->decryptString($company->password),
            $company->marketingConsent,
            $callbackUrl,
            $captchaToken,
            $company->category,
        );

        $response = (object) $rawResponse['body'];

        // Response returns success
        if (isset($response->success) && $response->success) {
            return new ApiResponseDTO(true, __('Company successfully registered.', 'simplybook'), 200, []);
        }

        // We generate a company_login dynamically, but because SimplyBook has
        // very strict checks this company_login might be invalid. In this case
        // we delete the company_login and try again.
        if (
            isset($response->data->company_login) &&
            (
                in_array('The field contains illegal words', $response->data->company_login)
                || in_array('login_reserved', $response->data->company_login)
            )
        ) {
            delete_option('simplybook_company_login');
            return $this->register_company($company, $captchaToken);
        }

        throw (new ApiException(
            __('Unknown error encountered while registering your company. Please try again.', 'simplybook')
        ))->setData([
            'message' => $response->message ?? '',
            'data' => isset($response->data) ? (is_object($response->data) ? get_object_vars($response->data) : $response->data) : null,
        ]);
    }

    /**
     * Get a timezone string
     *
     * @return string
     */
    protected function get_timezone_string(): string {
        $gmt_offset = get_option('gmt_offset');
        $timezone_string = get_option('timezone_string');
        if ($timezone_string) {
            return $timezone_string;
        } else {
            $timezone = timezone_name_from_abbr('', $gmt_offset * 3600, 0);
            if ($timezone === false) {
                // Fallback
                $timezone = 'Europe/Dublin';
            }

            return $timezone;
        }
    }

    /**
     * Get all subscription data
     */
    public function get_subscription_data(): array
    {
        if ($this->company_registration_complete() === false) {
            return [];
        }

        $cacheName = 'simplybook_subscription_data';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $response = $this->api_call('admin/tariff/current', [], 'GET');

        wp_cache_set($cacheName, $response, 'simplybook', MINUTE_IN_SECONDS);
        return $response;
    }

    /**
     * Get all statistics
     */
    public function get_statistics(): array
    {
        if ($this->company_registration_complete() === false) {
            return [];
        }

        $cacheName = 'simplybook_statistics';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $response = $this->api_call('admin/statistic', [], 'GET');
        if (empty($response)) {
            return [];
        }

        wp_cache_set($cacheName, $response, 'simplybook', MINUTE_IN_SECONDS);
        return $response;
    }

    /**
     * Get list of plugins with is_active and is_turned_on information
     * @return array
     */
    public function get_plugins(): array
    {
        if ( !$this->company_registration_complete() ){
            return [];
        }

        $cacheName = 'simplybook_special_feature_plugins';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $response = $this->api_call('admin/plugins', [], 'GET');
        $plugins = $response['data'] ?? [];

        Event::dispatch(Event::SPECIAL_FEATURES_LOADED, $plugins);

        wp_cache_set($cacheName, $plugins, 'simplybook', MINUTE_IN_SECONDS);
        return $plugins;
    }

    /**
     * Check if a specific plugin is active
     *
     * @param string $plugin
     *
     * @return bool
     */

    public function is_plugin_active( string $plugin ): bool {
        $plugins = $this->get_plugins();
        //check if the plugin with id = $plugin has is_active = true
        foreach ( $plugins as $p ) {
            if ( $p['id'] === $plugin && $p['is_active'] ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Do an API request to simplybook
     *
     * @param string $path
     * @param array $data
     * @param string $type
     * @param int $attempt
     *
     * @return array
     */
    public function api_call( string $path, array $data = [], string $type='POST', int $attempt = 1 ): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        //for all requests to /admin/ endpoints, use the company token. Otherwise use the common token.
        $token_type = str_contains( $path, 'admin' ) ? 'admin' : 'public';

        if ( !$this->tokenIsValid($token_type) ) {
            //try to refresh
            $this->refresh_token($token_type);
            //still not valid
            if ( !$this->tokenIsValid($token_type) ) {
                $this->log("Token not valid, cannot make API call");
                return [];
            }
        }

        if ( $type === 'POST' ) {
            $response_body = wp_remote_post( $this->endpoint( $path ), array(
                'headers'   => $this->get_headers( true, $token_type ),
                'timeout'   => 15,
                'sslverify' => true,
                'body'      => json_encode( $data ),
            ) );
        } else {
            //replace %5B with [ and %5D with ]
            $args = [
                'headers' => $this->get_headers( true, $token_type ),
                $data,
            ];
            $response_body = wp_remote_get($this->endpoint( $path ), $args );
        }

        if (is_wp_error( $response_body ) ) {
            $message = "WP_Error during api call for path: $path. Error: " . $response_body->get_error_message();
            $this->log($message);

            update_option('simplybook_api_status', [
                'status' => 'error',
                'time' => time(),
                'error' => esc_sql($message),
            ]);

            return [];
        }

        $response_code = wp_remote_retrieve_response_code( $response_body );
        $response = json_decode( wp_remote_retrieve_body( $response_body ), true );

        if ( $response_code === 200 ) {
            update_option('simplybook_api_status', [
                'status' => 'success',
                'time' => time(),
            ]);
            return $response;
        }

        $message = '';
        if ( isset($response['message'])) {
            $message = $response['message'];
        } elseif (isset($response->message)){
            $message = $response->message;
        }

        if ( $attempt === 1 && str_contains( $message, 'Token Expired')) {
            //invalid token, refresh.
            $this->refresh_token($token_type);
            return $this->api_call( $path, $data, $type, $attempt + 1 );
        }

        $this->log("Error during $path retrieval: ".$message);

        /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r */
        $msg = "response code: " . $response_code . ", response body: ".print_r($response_body,true);

        $this->_log($msg);
        update_option('simplybook_api_status', array(
            'status' => 'error',
            'error' => esc_sql($msg),
            'time' => time(),
        ) );

        return [];
    }

    /**
     * Check if we have a valid API Connection
     */
    public function checkApiConnection(): bool
    {
        $response = wp_remote_get($this->endpoint('admin'));

        // if response 401 and valid json - api is working
        if (wp_remote_retrieve_response_code($response) == 401) {
            $result = wp_remote_retrieve_body($response);
            $result = json_decode($result, true);
            if ($result && isset($result['code']) && $result['code'] == 401) {
                return true;
            }
        }

        return false;
    }

    /**
     * @todo - maybe this can be an Entity in the future?
     */
    public function getCategories(bool $onlyValues = false): array
    {
        $cacheKey = 'sb_plugin_categories' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/categories', [], 'GET');
        $result = $response['data'] ?? [];

        return $onlyValues ? array_values($result) : $result;
    }

    /**
     * @todo - maybe this can be an Entity in the future?
     */
    public function getLocations(bool $onlyValues = false): array
    {
        $cacheKey = 'sb_plugin_locations' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/locations', [], 'GET');
        $result = $response['data'] ?? [];

        return $onlyValues ? array_values($result) : $result;
    }

    /**
     * @todo - maybe this can be an Entity in the future?
     */
    public function getSpecialFeatureList(): array
    {
        $cacheKey = 'sb_plugin_plugins' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/plugins', [], 'GET');
        return $response['data'] ?? [];
    }

    /**
     * Method is used to check if the special feature related to the plugin key is
     * enabled or not.
     * @uses wp_cache_set(), wp_cache_get()
     */
    public function isSpecialFeatureEnabled(string $featureKey): bool
    {
        $cacheName = 'simplybook-feature-enabled-' . trim($featureKey);
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        $features = $this->getSpecialFeatureList();
        if (empty($features)) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS);
            return false;
        }

        $isActive = false;
        foreach ($features as $feature) {
            if (!isset($feature['key']) || ($feature['key'] !== $featureKey)) {
                continue;
            }

            $isActive = (bool) $feature['is_active'];
            break;
        }

        wp_cache_set($cacheName, $isActive, 'simplybook', MINUTE_IN_SECONDS);
        return $isActive;
    }

    /**
     * @param mixed $error
     */
    protected function _log($error): void
    {
        // Return if WP_DEBUG is not enabled
        if ( !defined('WP_DEBUG') || !WP_DEBUG ) {
            return;
        }

        /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_debug_backtrace */
        $fileTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        $last4 = array_slice($fileTrace, 0, 4);

        if(!is_string($error)){
            @ob_start();
            /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_var_dump */
            var_dump($error);
            $error = @ob_get_clean();
        }

        /* phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date */
        $error = date('Y-m-d H:i:s') . ' ' . $error . "\n";
        $error .= "\n\n" . implode("\n", array_map(function ($item) {
                return $item['file'] . ':' . $item['line'];
            }, $last4));
        $error .= "\n----------------------\n\n\n";

        /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log */
        error_log($error);
    }

    /**
     * Authenticate an existing user with the API by company login, user login
     * and password. If successful, the token is stored in the options.
     *
     * @return array Includes at least keys: 'token', 'refresh_token' & 'domain'
     * @throws \Exception|RestDataException
     */
    public function authenticateExistingUser(string $companyDomain, string $companyLogin, string $userLogin, string $userPassword): array
    {
        $payload = json_encode([
            'company' => $companyLogin,
            'login' => $userLogin,
            'password' => $userPassword,
        ]);

        $endpoint = $this->endpoint('admin/auth', $companyDomain);
        $response = wp_safe_remote_post($endpoint, [
            'headers' => $this->get_headers(),
            'timeout' => 15,
            'sslverify' => true,
            'body' => $payload,
        ]);

        if (is_wp_error($response)) {
            throw new \Exception($response->get_error_code() . ": ". $response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode != 200) {
            $this->throwSpecificLoginErrorResponse($responseCode, $response);
        }

        $responseBody = json_decode(wp_remote_retrieve_body($response), true);
        if (!is_array($responseBody) || !isset($responseBody['token'], $responseBody['refresh_token'], $responseBody['domain'])) {
            throw (new RestDataException(
                __('Login failed! Please try again later.', 'simplybook')
            ))->setResponseCode(500)->setData([
                'response_code' => $responseCode,
                'response_message' => __('Invalid response from SimplyBook.me', 'simplybook'),
            ]);
        }

        if (isset($responseBody['require2fa'], $responseBody['auth_session_id']) && ($responseBody['require2fa'] === true)) {
            throw (new RestDataException('Two FA Required'))
                ->setResponseCode(200)
                ->setData([
                    'require2fa' => true,
                    'auth_session_id' => $responseBody['auth_session_id'],
                    'company_login' => $companyLogin,
                    'user_login' => $userLogin,
                    'domain' => $companyDomain,
                    'allowed2fa_providers' => $this->get2FaProvidersWithLabel(($responseBody['allowed2fa_providers'] ?? ['ga'])),
                ]);
        }

        return $responseBody;
    }

    /**
     * Process two-factor authentication with the API. If successful, the token is stored in the options.
     * @throws \Exception|RestDataException
     */
    public function processTwoFaAuthenticationRequest(string $companyDomain, string $companyLogin, string $sessionId, string $twoFaType, string $twoFaCode): array
    {
        $payload = json_encode([
            'company' => $companyLogin,
            'session_id' => $sessionId,
            'code' => $twoFaCode,
            'type' => $twoFaType,
        ]);

        $endpoint = $this->endpoint('admin/auth/2fa', $companyDomain);
        $response = wp_safe_remote_post($endpoint, [
            'headers' => $this->get_headers(),
            'timeout' => 15,
            'sslverify' => true,
            'body' => $payload,
        ]);

        if (is_wp_error($response)) {
            throw new \Exception($response->get_error_code() . " ". $response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode != 200) {
            $this->throwSpecificLoginErrorResponse($responseCode, $response, true);
        }

        $responseBody = json_decode(wp_remote_retrieve_body($response), true);
        if (!is_array($responseBody) || !isset($responseBody['token'])) {
            throw (new RestDataException(
                __('Two factor authentication failed! Please try again later.', 'simplybook')
            ))->setData([
                'response_code' => $responseCode,
                'response_message' => __('Invalid 2FA response from SimplyBook.me', 'simplybook'),
            ]);
        }

        return $responseBody;
    }

    /**
     * Handles api related login errors based on the response code and if it is
     * a 2FA call. When there is no specific case throw a RestDataException with
     * a more generic message.
     *
     * Codes:
     * 400 = Wrong login or 2FA code
     * 403 = Too many attempts
     * 404 = SB generated a 404 page with the given company login
     * Else generic failed attempt message
     *
     * @throws RestDataException
     */
    public function throwSpecificLoginErrorResponse(int $responseCode, ?array $response = [], bool $isTwoFactorAuth = false): void
    {
        $response = (array) $response; // Ensure we have an array
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        $responseMessage = __('No error received from remote.', 'simplybook');
        if (is_array($responseBody) && !empty($responseBody['message'])) {
            $responseMessage = $responseBody['message'];
        }

        switch ($responseCode) {
            case 400:
                $message = __('Invalid login or password, please try again.', 'simplybook');
                if ($isTwoFactorAuth) {
                    $message = __('Incorrect 2FA authentication code, please try again.', 'simplybook');
                }
                break;
            case 403:
                $message = __('Too many login attempts. Verify your credentials and try again in a few minutes.', 'simplybook');
                break;
            case 404:
                $message = __("Could not find a company associated with that company login.", 'simplybook');
                break;
            default:
                $message = __('Authentication failed, please verify your credentials.', 'simplybook');
        }

        $exception = new RestDataException($message);
        $exception->setData([
            'response_code' => $responseCode,
            'response_message' => $responseMessage,
        ]);

        // 2Fa uses request() on client side thus needs a 200 response code.
        // Default is 500 to end up in the catch() function.
        $exception->setResponseCode($isTwoFactorAuth ? 200 : 500);

        throw $exception;
    }

    /**
     * Request to send an SMS code to the user for two-factor authentication.
     * @throws \Exception
     */
    public function requestSmsForUser(string $companyDomain, string $companyLogin, string $sessionId): bool
    {
        $endpoint = add_query_arg([
            'company' => $companyLogin,
            'session_id' => $sessionId,
        ], $this->endpoint('/admin/auth/sms', $companyDomain));

        $response = wp_safe_remote_get($endpoint, [
            'headers' => $this->get_headers(),
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new \Exception($response->get_error_message());
        }

        $responseBody = json_decode(wp_remote_retrieve_body($response), true);
        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode != 200) {
            throw new \Exception($responseBody['message'] ?? 'SMS request failed');
        }

        return true; // code send.
    }

    /**
     * Save the authentication data given as parameters. This method is used
     * after a successful authentication process. For example after
     * {@see authenticateExistingUser} & {@see processTwoFaAuthenticationRequest}.
     * This is used in {@see OnboardingController}
     */
    public function saveAuthenticationData(string $token, string $refreshToken, string $companyDomain, string $companyLogin, int $companyId, string $tokenType = 'admin'): void
    {
        $this->updateToken($token, $tokenType);
        $this->updateToken($refreshToken, $tokenType, true );

        $this->update_option('domain', $companyDomain, $this->duringOnboardingFlag, [
            'type' => 'hidden',
        ]);
        $this->update_option('company_id', $companyId, $this->duringOnboardingFlag, [
            'type' => 'hidden',
        ]);

        update_option('simplybook_refresh_company_token_expiration', time() + 3600);

        update_option('simplybook_company_login', $companyLogin);
        update_option('simplybook_company_registration_start_time', time());
    }

    /**
     * Return given providers with their labels. Can be used to parse the
     * 'allowed2fa_providers' key in a response from the API.
     */
    private function get2FaProvidersWithLabel(array $providerKeys): array
    {
        $providerLabels = [
            'ga'  => __('Google Authenticator', 'simplybook'),
            'sms' => __('SMS', 'simplybook'),
        ];

        $allowedProviders = [];
        foreach ($providerKeys as $provider) {
            $allowedProviders[$provider] = ($providerLabels[$provider] ??
                __('Unknown 2FA provider', 'simplybook'));
        }

        return $allowedProviders;
    }

    /**
     * Get the list of themes available for the company
     * @throws \Exception
     */
    public function getThemeList(): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        $cacheName = 'simplybook_theme_list';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $fallback = [
            'created_at_utc' => Carbon::now('UTC')->subDays(3)->toDateTimeString(),
            'themes' => [],
        ];

        $cachedOption = get_option('simplybook_cached_theme_list', $fallback);
        $cachedOptionCreatedAt = Carbon::parse($cachedOption['created_at_utc']);
        $cachedOptionIsValid = $cachedOptionCreatedAt->isAfter(
            Carbon::now('UTC')->subDays(2) // Cache is valid for 2 days
        );

        if ($cachedOptionIsValid) {
            return $cachedOption;
        }

        $response = $this->post('public', json_encode([
            'jsonrpc' => '2.0',
            'method' => 'getThemeList',
            'id' => 1,
        ]));

        $data['created_at_utc'] = Carbon::now('UTC')->toDateTimeString();
        $data['themes'] = $response['result'] ?? [];

        update_option('simplybook_cached_theme_list', $data);
        wp_cache_add($cacheName, $data, 'simplybook', (2 * DAY_IN_SECONDS));
        return $data;
    }

    /**
     * Get the timeline setting options that are available for the company
     */
    public function getTimelineList(): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        $cacheName = 'simplybook_timeline_list';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $fallback = [
            'created_at_utc' => Carbon::now('UTC')->subDays(3)->toDateTimeString(),
            'list' => [],
        ];

        $cachedOption = get_option('simplybook_cached_timeline_list', $fallback);
        $createdAtUtc = ($cachedOption['created_at_utc'] ?? $fallback['created_at_utc']);

        $cachedOptionCreatedAt = Carbon::parse($createdAtUtc);
        $cachedOptionIsValid = is_array($cachedOption) && $cachedOptionCreatedAt->isAfter(
            Carbon::now('UTC')->subDays(2) // Cache is valid for 2 days
        );

        if ($cachedOptionIsValid) {
            return $cachedOption;
        }

        $response = $this->post('public', json_encode([
            'jsonrpc' => '2.0',
            'method' => 'getTimelineList',
            'id' => 1,
        ]));

        $data['created_at_utc'] = Carbon::now('UTC')->toDateTimeString();
        $data['list'] = $response['result'] ?? [];

        update_option('simplybook_cached_timeline_list', $data);
        wp_cache_add($cacheName, $data, 'simplybook', (2 * DAY_IN_SECONDS));
        return $data;
    }

    /**
     * Get the company info without caching. Caching should be done by the
     * consumer of this method, in this case {@see CompanyInfoService}.
     */
    public function getCompanyInfo(): array
    {
        if ($this->company_registration_complete() === false) {
            return [];
        }

        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        try {
            $response = $this->request('GET', 'admin/company_info');
        } catch (\Exception $e) {
            return [];
        }

        return $response;
    }

    /**
     *
     * \EXTENDIFY_PARTNER_ID will contain the required value if WordPress is
     * configured using Extendify. Otherwise, use default 'wp'.
     */
    private function getReferrer(): string
    {
        return (defined('EXTENDIFY_PARTNER_ID') ? \EXTENDIFY_PARTNER_ID : 'wp');
    }

    /**
     * Get the user agent for the API requests.
     *
     * @example format SimplyBookPlugin/3.2.1 (WordPress/6.5.3; ref:
     * EXTENDIFY_PARTNER_ID; +https://example.com)
     */
    private function getRequestUserAgent(): string
    {
        return "SimplyBookPlugin/" . $this->env->getString('plugin.version') . " (WordPress/" . get_bloginfo('version') . "; ref: " . $this->getReferrer() . "; +" . site_url() . ")";
    }

    /**
     * Helper method to easily do a GET request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws \Exception
     */
    public function get(string $endpoint): array
    {
        if ($this->company_registration_complete() === false) {
            throw new \Exception('Company registration is not complete.');
        }

        $cacheValue = $this->getRequestCache($endpoint);
        if (!empty($cacheValue) && is_array($cacheValue)) {
            return $cacheValue;
        }

        $response = $this->request('GET', $endpoint);

        $this->setRequestCache($endpoint, $response);

        return $response;
    }

    /**
     * Helper method to easily do a PUT request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function put(string $endpoint, string $payload): array
    {
        return $this->request('PUT', $endpoint, $payload);
    }

    /**
     * Helper method to easily do a POST request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function post(string $endpoint, string $payload): array
    {
        return $this->request('POST', $endpoint, $payload);
    }

    /**
     * Helper method to easily do a DELETE request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function delete(string $endpoint): array
    {
        return $this->request('DELETE', $endpoint);
    }

    /**
     * Helper method to easily do a request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function request(string $method, string $endpoint, string $payload = ''): array
    {
        $requestType = str_contains($endpoint, 'admin') ? 'admin' : 'public';

        $requestArgs = [
            'method' => $method,
            'headers' => $this->get_headers(true, $requestType),
            'timeout' => 15,
            'sslverify' => true,
        ];

        if (!empty($payload)) {
            $requestArgs['body'] = $payload;
        }

        // For JSON RPC endpoints (endpoint is exactly 'public'), use v1 API
        $useV2 = ($endpoint !== 'public');

        $response = wp_safe_remote_request(
            $this->endpoint($endpoint, '', $useV2),
            $requestArgs
        );

        // Ensure we get fresh data next time we do a request to this endpoint.
        $this->clearRequestCache($endpoint);

        if (is_wp_error($response)) {
            throw (new RestDataException($response->get_error_message()))
                ->setResponseCode($response->get_error_code())
                ->setData($response->get_error_data());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseMessage = wp_remote_retrieve_response_message($response);
        $responseBody = wp_remote_retrieve_body($response);

        $responseData = json_decode($responseBody, true);
        $jsonError = json_last_error();

        if ($jsonError !== JSON_ERROR_NONE) {
            $responseData = [];
        }

        if ($responseCode < 200 || $responseCode >= 300) {
            throw (new RestDataException($responseMessage))
                ->setResponseCode($responseCode)
                ->setData($responseData);
        }

        return $responseData;
    }

    /**
     * Clear the request cache for a specific endpoint. This is used to ensure
     * we get fresh data from the API.
     * @uses wp_cache_delete
     */
    private function clearRequestCache(string $endpoint): void
    {
        wp_cache_delete($this->requestKey($endpoint), 'simplybook');
    }

    /**
     * Set the request cache for a specific endpoint. This is used to cache the
     * response data for a specific endpoint.
     * @uses wp_cache_set
     */
    private function setRequestCache(string $endpoint, array $data): void
    {
        wp_cache_set($this->requestKey($endpoint), $data, 'simplybook', MINUTE_IN_SECONDS);
    }

    /**
     * Get the request cache for a specific endpoint. This is used to retrieve
     * cached data for a specific endpoint.
     * @uses wp_cache_get
     * @return false|mixed
     */
    private function getRequestCache(string $endpoint)
    {
        return wp_cache_get($this->requestKey($endpoint), 'simplybook');
    }

    /**
     * Generate a unique cache key for a specific endpoint. This is used to
     * store and retrieve cached data for a specific endpoint.
     */
    private function requestKey(string $endpoint): string
    {
        return 'simplybook/' . $endpoint;
    }
}

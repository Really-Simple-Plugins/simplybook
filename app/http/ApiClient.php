<?php
namespace SimplyBook\Http;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Helpers\Event;
use SimplyBook\Helpers\Storage;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\LegacyHelper;
use SimplyBook\Http\DTO\ApiResponseDTO;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Builders\CompanyBuilder;
use SimplyBook\Exceptions\RestDataException;

/**
 * @todo Refactor this to a proper Client (jira: NL14RSP2-6)
 */
class ApiClient
{
    use LegacyLoad;
    use LegacySave;
    use LegacyHelper;

    protected JsonRpcClient $jsonRpcClient;

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
     * The key is used to fetch the public token for the current user.
     */
    protected string $app_key;

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
     * @param JsonRpcClient $client
     * @param array $environment Dependency: App::provide('simplybook_env')
     * @throws \LogicException For developers.
     */
    public function __construct(JsonRpcClient $client, array $environment)
    {
        $this->jsonRpcClient = $client;
        $this->app_key = ($environment['app_key'] ?? '');

        if (empty($this->app_key)) {
            throw new \LogicException('Provide the key of the application in the environment');
        }

        if (get_option($this->authenticationFailedFlagKey)) {
            $this->handleFailedAuthentication();
            return;
        }

        //if we have a token, check if it needs to be refreshed
        if ( !$this->get_token('public') ) {
            $this->get_public_token();
        } else {
            if ( !$this->token_is_valid('public') ) {
                $this->refresh_token();
            }

            if ( !empty($this->get_token('admin') ) && !$this->token_is_valid('admin') ) {
                $this->refresh_token('admin');
            }
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
     * Check if we have a company_id, which shows we have a registered company
     */
    public function company_registration_complete(): bool
    {
        //check if the callback has been completed, resulting in a company/admin token.
        if ( !$this->get_token('admin') ) {
            $companyRegistrationStartTime = get_option('simplybook_company_registration_start_time', 0);

            $oneHourAgo = Carbon::now()->subHour();
            $companyRegistrationStartedAt = Carbon::createFromTimestamp($companyRegistrationStartTime);

            // Registration was more than 1h ago. Clear and try again.
            if ($companyRegistrationStartedAt->isBefore($oneHourAgo)) {
                $this->delete_company_login();
            }

            return false;
        }
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
            $token = $this->get_token($token_type);
            if ( empty($token) ) {
                switch ($token_type) {
                    case 'public':
                        $this->get_public_token();
                        break;
                    case 'admin':
                        $this->refresh_token('admin');
                        break;
                }
                $token = $this->get_token($token_type);
            }
            $headers['X-Token'] = $token;
            $headers['X-Company-Login' ] = $this->get_company_login();
        }

        return $headers;
    }

    /**
     * Get a token
     * @param string $type //public or admin
     * @param bool $refresh
     * @return string
     */
    public function get_token( string $type = 'public', bool $refresh = false ) : string {
        $type = in_array($type, ['public', 'admin', 'user']) ? $type : 'public';
        if ( $refresh ) {
            $type = $type . '_refresh';
        }
        $token = get_option("simplybook_token_" . $type, '');

        return $this->decrypt_string($token);
    }

    /**
     * Get public token
     *
     * @return void
     */
    public function get_public_token(): void {
        if ( $this->token_is_valid() ) {
            return;
        }
        $request = wp_remote_post( $this->endpoint( 'simplybook/auth/token' ), array(
            'headers' => $this->get_headers(),
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                array(
                    'api_key' => $this->app_key,
                )),
        ) );

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );
            if ( isset($request->token) ) {
                delete_option('simplybook_token_error' );
                $expiration = time() + $request->expires_in;
                $this->update_token( $request->token );
                $this->update_token( $request->refresh_token, 'public', true );
                update_option('simplybook_refresh_token_expiration', time() + $request->expires_in);
                $this->update_option( 'domain', $request->domain, $this->duringOnboardingFlag );
            }
        }
    }

    /**
     * Refresh the token
     *
     * @return void
     */
    public function refresh_token($type = 'public'): void {
        if ($this->isRefreshLocked($type)) {
            return;
        }

        //check if we have a token
        $refresh_token = $this->get_token($type, true);
        if (empty($refresh_token) && $type === 'admin') {
            $this->releaseRefreshLock($type);
            $this->automaticAuthenticationFallback($type);
            return;
        }

        if (empty($refresh_token) && $type === 'public') {
            $this->get_public_token();
            $this->releaseRefreshLock($type);
            return;
        }

        if ( $this->token_is_valid($type) ) {
            $this->releaseRefreshLock($type);
            return;
        }

        $data = array(
            'refresh_token' => $refresh_token,
        );

        // Invalidate the one-time use token as we are about to use it for
        // refreshing the token. This prevents re-use.
        $this->update_token('', $type, true);

        if ( $type === 'admin' ){
            $path = 'admin/auth/refresh-token';
            $headers = $this->get_headers(false);
            $data['company'] = $this->get_company_login();
        } else {
            $path = 'simplybook/auth/refresh-token';
            $headers = $this->get_headers(true);
        }

        $request = wp_remote_post($this->endpoint( $path ), array(
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                $data
            ),
        ) );

        $response_code = wp_remote_retrieve_response_code( $request );

        if (($response_code === 401) && ($type === 'public')) {
            $this->get_public_token();
            $this->releaseRefreshLock($type);
            return;
        }

        // If token is 'admin' and the refresh request was "unauthorized" we
        // need to login again.
        if (($response_code === 401) && ($type === 'admin')) {
            $this->automaticAuthenticationFallback($type);
            return;
        }

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );

            if ( isset($request->token) && isset($request->refresh_token) ) {
                delete_option('simplybook_token_error' );
                $this->update_token( $request->token, $type );
                $this->update_token( $request->refresh_token, $type, true );
                $expires_option = $type === 'public' ? 'simplybook_refresh_token_expiration' : 'simplybook_refresh_company_token_expiration';
                $expires = $request->expires_in ?? 3600;
                update_option($expires_option, time() + $expires);
                Event::dispatch(Event::AUTH_SUCCEEDED);
            } else {
                $this->log("Error during token refresh");
            }
        } else {
            $this->log("Error during token refresh: ".$request->get_error_message());
        }

        $this->releaseRefreshLock($type);
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
    private function automaticAuthenticationFallback(string $type)
    {
        // Company login can be empty for fresh accounts
        if ($this->authenticationFailedFlag || empty($this->get_company_login(false))) {
            $this->releaseRefreshLock($type);
            return; // Dont even try (again).
        }

        $validateBasedOnDomainConfig = did_action('init');
        $domain = $this->get_domain($validateBasedOnDomainConfig);

        $companyData = $this->get_company();
        $sanitizedCompany = (new CompanyBuilder())->buildFromArray($companyData);

        try {
            $response = $this->authenticateExistingUser(
                $domain,
                $this->get_company_login(),
                $sanitizedCompany->user_login,
                $this->decrypt_string($sanitizedCompany->password)
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
     * Generate callback URL for registration, with an expiration
     *
     * @return string
     */
    protected function generate_callback_url(): string {
        if ( !$this->user_can_manage() ) {
            return '';
        }

        //create temporary callback url, with a lifetime of 5 minutes. This is just for the registration process.
        $random_string = wp_generate_password( 32, false );
        update_option('simplybook_callback_url', $random_string, false );
        update_option('simplybook_callback_url_expires', time() + 10 * MINUTE_IN_SECONDS, false );
        return $random_string;
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
     * Check if we have a valid token
     *
     * @param string $type
     *
     * @return bool
     */
    protected function token_is_valid( string $type = 'public' ): bool {
        $refresh_token = $this->get_token($type, true );
        $type = in_array($type, ['public', 'admin']) ? $type : 'public';
        if ( $type === 'admin' ) {
            $expires = get_option( 'simplybook_refresh_company_token_expiration', 0 );
        } else {
            $expires = get_option( 'simplybook_refresh_token_expiration', 0 );
        }

        if ( !$refresh_token || !$expires ) {
            return false;
        }
        if ( $expires < time() ) {
            return false;
        }
        return true;
    }

    /**
     * Clear tokens
     *
     * @return void
     */

    protected function clear_tokens(): void {
        delete_option('simplybook_token_refresh');
        delete_option('simplybook_refresh_token_expiration');
        delete_option('simplybook_refresh_company_token_expiration');
        delete_option('simplybook_token');
    }

    /**
     * Check if authorization is valid and complete
     */
    public function isAuthenticated(): bool
    {
        //check if we have a token
        if (!$this->token_is_valid('admin')) {
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

    public function reset_registration(){
        $this->delete_company_login();
        $this->clear_tokens();
        delete_option('simplybook_completed_step');
    }

    /**
     * Registers a company with the API
     * @internal method can be recursive a maximum of 3 times in one minute
     * @throws ApiException
     */
    public function register_company(): ApiResponseDTO
    {
        if ($this->user_can_manage() === false) {
            throw new ApiException(
                esc_html__('You are not authorized to do this.', 'simplybook')
            );
        }

        if (get_transient('simply_book_attempt_count') > 3) {
            throw new ApiException(
                esc_html__('Too many attempts to register company, please try again in a minute.', 'simplybook')
            );
        }

        //check if we have a token
        if ($this->token_is_valid() === false) {
            $this->get_public_token();
        }

        $companyData = $this->get_company();
        $sanitizedCompany = (new CompanyBuilder())->buildFromArray($companyData);

        if ($sanitizedCompany->isValid() === false) {
            throw (new ApiException(
                esc_html__('Please fill in all company data.', 'simplybook')
            ))->setData([
                'invalid_fields' => $sanitizedCompany->getInvalidFields(),
            ]);
        }

        $callback_url = $this->generate_callback_url();
        $company_login = $this->get_company_login();

        $coordinates = $this->get_coordinates(
            $sanitizedCompany->address, $sanitizedCompany->zip, $sanitizedCompany->city, $sanitizedCompany->country
        );

        $request = wp_remote_post( $this->endpoint( 'simplybook/company' ), array(
            'headers' => $this->get_headers( true ),
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                [
                    'company_login' => $company_login,
                    'email' => $sanitizedCompany->email,
                    'name' => $sanitizedCompany->company_name,
                    'description' => $this->get_description(),
                    'phone' => $sanitizedCompany->phone,
                    'city' => $sanitizedCompany->city,
                    'address1' => $sanitizedCompany->address,
                    'zip' => $sanitizedCompany->zip,
                    "lat" => $coordinates['lat'],
                    "lng" => $coordinates['lng'],
                    "timezone" => $this->get_timezone_string(),
                    "country_id" => $sanitizedCompany->country,
                    "password" => $this->decrypt_string($sanitizedCompany->password),
                    "retype_password" => $this->decrypt_string($sanitizedCompany->password),
                    'categories' => [$sanitizedCompany->category],
                    'lang' => $this->get_locale(),
                    'marketing_consent' => false,
					'journey_type' => 'skip_welcome_tour',
                    'callback_url' => get_rest_url(get_current_blog_id(),"simplybook/v1/company_registration/$callback_url"),
                    'ref' => $this->getReferrer(),
                ]
            ),
        ));

        if (is_wp_error($request)) {
            throw (new ApiException(
                esc_html__('Something went wrong while registering your company. Please try again.', 'simplybook'))
            )->setData([
                'error' => $request->get_error_message(),
            ]);
        }

        $response = json_decode(wp_remote_retrieve_body($request));
        $companySuccessfullyRegistered = (
            isset($response->recaptcha_site_key) && isset($response->success) && $response->success
        );

        if ($companySuccessfullyRegistered) {
            return new ApiResponseDTO(true, esc_html__('Company successfully registered.', 'simplybook'), 200, [
                'recaptcha_site_key' => $response->recaptcha_site_key,
                'recaptcha_version' => $response->recaptcha_version,
                'company_id' => $response->company_id,
            ]);
        }

        // When unsuccessful due to token expiration, we refresh and try again
        if (str_contains($response->message, 'Token Expired')) {
            $currentAttemptCount = get_transient('simply_book_attempt_count') ?: 0;
            set_transient('simply_book_attempt_count', ($currentAttemptCount + 1), MINUTE_IN_SECONDS);
            $this->refresh_token();
            return $this->register_company();
        }

        // We generate a company_login dynamically, but because SimplyBook has
        // very strict checks this company_login might be invalid. In this case
        // we delete the company_login and try again.
        if (isset($response->data->company_login) &&
            (
                in_array('The field contains illegal words', $response->data->company_login)
                || in_array('login_reserved', $response->data->company_login)
            )
        ) {
            delete_option('simplybook_company_login');
            return $this->register_company();
        }

        // Company name contains illegal words, user should be notified.
        if (isset($response->data->name) &&
            in_array('The field contains illegal words', $response->data->name)
        ) {
            throw (new ApiException(
                esc_html__('The company name is not allowed. Please change the company name.', 'simplybook')
            ))->setData([
                'name' => $response->data->name,
                'message' => $response->message,
            ]);
        }

        throw (new ApiException(
            esc_html__('Unknown error encountered while registering your company. Please try again.', 'simplybook')
        ))->setData([
            'message' => $response->message,
            'data' => is_object($response->data) ? get_object_vars($response->data) : $response->data,
        ]);
    }

    /**
     * Get user full name to set as the default provider
     *
     * @return string
     */
    private function get_user_full_name(): string {
        $user = wp_get_current_user();
        $first_name = $user->first_name;
        $last_name = $user->last_name;
        if ( !empty($first_name) && !empty($last_name) ) {
            return $first_name . ' ' . $last_name;
        }

        if ( !empty($user->user_nicename)) {
            return $user->user_nicename;
        }
        return $user->display_name;
    }

    /**
     * Get the description for the company, with fallbacks.
     * @return string
     */
    private function get_description() : string {
        $description = get_bloginfo('description');
        if ( empty( $description) ) {
            $description = get_bloginfo('name');
        }

        if ( empty( $description) ) {
            $description = get_site_url();
        }

        return $description;
    }

    /**
     * Get lat and long coordinates for an address from openstreetmap.
     *
     * @param string $address
     * @param string $zip
     * @param string $city
     * @param string $country
     *
     * @return array
     */
    private function get_coordinates( string $address, string $zip, string $city, string $country ): array {
        $address = urlencode("$address, $zip $city, $country");
        $url = "https://nominatim.openstreetmap.org/search?q={$address}&format=json";

        $response = wp_remote_get($url);
        if ( is_wp_error( $response ) ) {
            $this->log("Error during address lookup: ".$response->get_error_message());
            return [
                'lat' => 0,
                'lng' => 0,
            ];
        }
        $data = wp_remote_retrieve_body($response);
        $data = json_decode($data, true);
        if (!empty($data)) {
            $lat = $data[0]['lat'];
            $lng = $data[0]['lon'];
            return [
                'lat' => $lat,
                'lng' => $lng,
            ];
        }
        return [
            'lat' => 0,
            'lng' => 0,
        ];
    }

    /**
     * Confirm email for the company registration based on the email code and
     * the recaptcha token.
     * @throws ApiException
     */
    public function confirm_email( int $email_code, string $recaptcha_token ): ApiResponseDTO
    {
        if ($this->user_can_manage() === false) {
            throw new ApiException(
                esc_html__('You are not authorized to do this.', 'simplybook')
            );
        }

        // If the company registration is not started someone tries to submit
        // the email confirm step without first completing the registration.
        if (get_option("simplybook_company_registration_start_time") === false) {
            throw new ApiException(
                esc_html__('Something went wrong, are you sure you started the company registration?', 'simplybook')
            );
        }

        $request = wp_remote_post( $this->endpoint( 'simplybook/company/confirm' ), array(
            'headers' => $this->get_headers( true ),
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                [
                    'company_login' => $this->get_company_login(),
                    'confirmation_code' => $email_code,
                    'recaptcha' => $recaptcha_token,
                ]
            ),
        ));

        if (is_wp_error($request)) {
            throw (new ApiException(
                esc_html__('Something went wrong while confirming your email. Please try again.', 'simplybook'))
            )->setData([
                'error' => $request->get_error_message(),
            ]);
        }

        $response = json_decode(wp_remote_retrieve_body($request));
        if (isset($response->success)) {
            return new ApiResponseDTO(true, esc_html__('Email successfully confirmed.', 'simplybook'));
        }

        $codeIsValid = true;
        $errorMessage = esc_html__('Unknown error encountered while confirming your email. Please try again.', 'simplybook');
        if (isset($response->message) && str_contains($response->message, 'not valid')) {
            $errorMessage = esc_html__('This confirmation code is not valid.', 'simplybook');
            $codeIsValid = false;
        }

        throw (new ApiException($errorMessage))->setData([
            'message' => $response->message,
            'valid' => $codeIsValid,
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

        if ($cache = wp_cache_get('simplybook_subscription_data', 'simplybook')) {
            return $cache;
        }

        $response = $this->api_call('admin/tariff/current', [], 'GET');

        wp_cache_set('simplybook_subscription_data', $response, 'simplybook', MINUTE_IN_SECONDS);
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

        if ($cache = wp_cache_get('simplybook_statistics', 'simplybook')) {
            return $cache;
        }

        $response = $this->api_call('admin/statistic', [], 'GET');
        if (empty($response)) {
            return [];
        }

        wp_cache_set('simplybook_statistics', $response, 'simplybook', MINUTE_IN_SECONDS);
        return $response;
    }

    /**
     * Get list of plugins with is_active and is_turned_on information
     * @return array
     */
    public function get_plugins(): array {
        if ( !$this->company_registration_complete() ){
            return [];
        }

        if ($cache = wp_cache_get('simplybook_special_feature_plugins', 'simplybook')) {
            return $cache;
        }

        $response = $this->api_call('admin/plugins', [], 'GET');
        $plugins = $response['data'] ?? [];

        Event::dispatch(Event::SPECIAL_FEATURES_LOADED, $plugins);

        wp_cache_set('simplybook_special_feature_plugins', $plugins, 'simplybook', MINUTE_IN_SECONDS);
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

        //with common API (common token): you are able to call /simplybook/* endpoints. ( https://vetalkordyak.github.io/sb-company-api-explorer/main/ )
        //with company API (company token): you are able to call company API endpoints. ( https://simplybook.me/en/api/developer-api/tab/rest_api )
        $apiStatus = get_option( 'simplybook_api_status' );
        //get part of $path after last /
        $path_type = substr( $path, strrpos( $path, '/' ) + 1 );

        if ( $apiStatus && $apiStatus['status'] === 'error' && $apiStatus['time'] > time() - HOUR_IN_SECONDS ) {
            $cache = get_option( 'simplybook_persistent_cache' );
            //return $cache[ $type ] ?? [];
        }

        //for all requests to /admin/ endpoints, use the company token. Otherwise use the common token.
        $token_type = str_contains( $path, 'admin' ) ? 'admin' : 'public';

        if ( !$this->token_is_valid($token_type) ) {
            //try to refresh
            $this->refresh_token($token_type);
            //still not valid
            if ( !$this->token_is_valid($token_type) ) {
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

        $response_code = wp_remote_retrieve_response_code( $response_body );
        if ( !is_wp_error( $response_body)) {
            $response = json_decode( wp_remote_retrieve_body( $response_body ), true );
        }

        if ( $response_code === 200 ) {
            update_option('simplybook_api_status', [
                'status' => 'success',
                'time' => time(),
            ]);
            delete_option("simplybook_{$path_type}_error" );
            //update the persistent cache
            $cache = get_option('simplybook_persistent_cache', []);
            $cache[ $path_type ] = $response;
            update_option('simplybook_persistent_cache', $cache, false);
            return $response;
        } else {
            if ( isset($response['message'])) {
                $message = $response['message'];
            } else if (isset($response->message)){
                $message = $response->message;
            } else {
                $message = '';
            }
            if ( $attempt===1 &&  str_contains( $message, 'Token Expired')) {
                //invalid token, refresh.
                $this->refresh_token($token_type);
                $this->api_call( $path, $data, $type, $attempt + 1 );
            }
            $this->log("Error during $path_type retrieval: ".$message);

            /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r */
            $msg = "response code: " . $response_code . ", response body: ".print_r($response_body,true);

            update_option('simplybook_api_status', array(
                'status' => 'error',
                'error' => esc_sql($msg),
                'time' => time(),
            ) );
            $this->_log($msg);
        }
        return [];
    }

    /**
     *
     *
     * Below old api functions
     */


    public function checkApiConnection(){
        $response = wp_remote_get($this->endpoint('admin'));

        //if reponse 401 and valid json - api is working
        if(wp_remote_retrieve_response_code($response) == 401){
            $result = wp_remote_retrieve_body($response);
            $result = json_decode($result, true);
            if($result && isset($result['code']) && $result['code'] == 401){
                return true;
            }
        }
        return false;
    }

    /**
     * @todo - maybe this can be an Entity in the future?
     */
    public function getCategories(bool $onlyValues = false)
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
    public function getLocations(bool $onlyValues = false)
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
    public function getSpecialFeatureList()
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
        if ($cached = wp_cache_get($cacheName, 'simplybook')) {
            return $cached;
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

    protected function _log($error)
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
     * Check if we have an error status stored
     * @return bool
     */
    private function api_is_ok(): bool
    {
        $api_status = get_option('simplybook_api_status');
        if ( !isset($api_status['status']) ) {
            //nothing saved yet, assume ok.
            return true;
        }
        if ( $api_status['status'] === 'error' && $api_status['time'] > time() - HOUR_IN_SECONDS ) {
            return false;
        }

        //success, or last fail was an hour ago, try again.
        return true;
    }

    /**
     * Authenticate an existing user with the API by company login, user login
     * and password. If successful, the token is stored in the options.
     *
     * @todo: response data is handling is not DRY (see CompanyRegistrationEndpoint)
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
        if (!is_array($responseBody) || !isset($responseBody['token'])) {
            throw (new RestDataException(
                esc_html__('Login failed! Please try again later.', 'simplybook')
            ))->setResponseCode(500)->setData([
                'response_code' => $responseCode,
                'response_message' => esc_html__('Invalid response from SimplyBook.me', 'simplybook'),
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
                esc_html__('Two factor authentication failed! Please try again later.', 'simplybook')
            ))->setData([
                'response_code' => $responseCode,
                'response_message' => esc_html__('Invalid 2FA response from SimplyBook.me', 'simplybook'),
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
	public function throwSpecificLoginErrorResponse(int $responseCode, ?array $response = [], bool $isTwoFactorAuth = false)
    {
        $response = (array) $response; // Ensure we have an array
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        $responseMessage = esc_html__('No error received from remote.', 'simplybook');
        if (is_array($responseBody) && !empty($responseBody['message'])) {
            $responseMessage = $responseBody['message'];
        }

        switch ($responseCode) {
            case 400:
                $message = esc_html__('Invalid login or password, please try again.', 'simplybook');
                if ($isTwoFactorAuth) {
                    $message = esc_html__('Incorrect 2FA authentication code, please try again.', 'simplybook');
                }
                break;
            case 403:
                $message = esc_html__('Too many login attempts. Verify your credentials and try again in a few minutes.', 'simplybook');
                break;
            case 404:
                $message = esc_html__("Could not find a company associated with that company login.", 'simplybook');
                break;
            default:
                $message = esc_html__('Authentication failed, please verify your credentials.', 'simplybook');
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
        $this->update_token($token, $tokenType);
        $this->update_token($refreshToken, $tokenType, true );

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
            'ga'  => esc_html__('Google Authenticator', 'simplybook'),
            'sms' => esc_html__('SMS', 'simplybook'),
        ];

        $allowedProviders = [];
        foreach ($providerKeys as $provider) {
            $allowedProviders[$provider] = ($providerLabels[$provider] ??
                esc_html__('Unknown 2FA provider', 'simplybook'));
        }

        return $allowedProviders;
    }

    /**
     * Get the list of themes available for the company
     * @uses \SimplyBook\Http\JsonRpcClient
     * @throws \Exception
     */
    public function getThemeList(): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        if ($cache = wp_cache_get('simplybook_theme_list', 'simplybook')) {
            return $cache;
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

        $response = $this->jsonRpcClient->setUrl(
            $this->endpoint('public', '', false)
        )->setHeaders([
            'X-Company-Login: ' . $this->get_company_login(),
            'X-User-Token: ' . $this->get_token('public'),
        ])->getThemeList();

        $data['created_at_utc'] = Carbon::now('UTC')->toDateTimeString();
        $data['themes'] = $response;

        update_option('simplybook_cached_theme_list', $data);
        wp_cache_add('simplybook_theme_list', $data, 'simplybook', (2 * DAY_IN_SECONDS));
        return $data;
    }

    /**
     * Get the timeline setting options that are available for the company
     * @uses \SimplyBook\Http\JsonRpcClient
     */
    public function getTimelineList(): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        if ($cache = wp_cache_get('simplybook_timeline_list', 'simplybook')) {
            return $cache;
        }

        $fallback = [
            'created_at_utc' => Carbon::now('UTC')->subDays(3)->toDateTimeString(),
            'list' => [],
        ];

        $cachedOption = get_option('simplybook_cached_timeline_list', $fallback);
        $cachedOptionCreatedAt = Carbon::parse($cachedOption['created_at_utc']);
        $cachedOptionIsValid = $cachedOptionCreatedAt->isAfter(
            Carbon::now('UTC')->subDays(2) // Cache is valid for 2 days
        );

        if ($cachedOptionIsValid) {
            return $cachedOption;
        }

        $response = $this->jsonRpcClient->setUrl(
            $this->endpoint('public', '', false)
        )->setHeaders([
            'X-Company-Login: ' . $this->get_company_login(),
            'X-User-Token: ' . $this->get_token('public'),
        ])->getTimelineList();

        $data['created_at_utc'] = Carbon::now('UTC')->toDateTimeString();
        $data['list'] = $response;

        update_option('simplybook_cached_timeline_list', $data);
        wp_cache_add('simplybook_timeline_list', $response, 'simplybook', (2 * DAY_IN_SECONDS));
        return $response;
    }

	/**
	 *
	 * \EXTENDIFY_PARTNER_ID will contain the required value if WordPress is
	 * configured using Extendify. Otherwise, use default 'wp'.
	 */
	private function getReferrer(): string
	{
		return (defined('\EXTENDIFY_PARTNER_ID') ? \EXTENDIFY_PARTNER_ID : 'wp');
	}

	/**
	 * Get the user agent for the API requests.
	 *
	 * @example format SimplyBookPlugin/3.2.1 (WordPress/6.5.3; ref:
	 * EXTENDIFY_PARTNER_ID; +https://example.com)
	 */
	private function getRequestUserAgent(): string
	{
		return "SimplyBookPlugin/" . App::env('plugin.version') . " (WordPress/" . get_bloginfo('version') . "; ref: " . $this->getReferrer() . "; +" . site_url() . ")";
	}

    /**
     * Helper method to easily do a GET request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws \Exception
     */
    public function get(string $endpoint)
    {
        if ($this->company_registration_complete() === false) {
            throw new \Exception('Company registration is not complete.');
        }

        if ($cache = $this->getRequestCache($endpoint)) {
            return $cache;
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
    public function put($endpoint, string $payload): array
    {
        return $this->request('PUT', $endpoint, $payload);
    }

    /**
     * Helper method to easily do a POST request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function post($endpoint, string $payload): array
    {
        return $this->request('POST', $endpoint, $payload);
    }

    /**
     * Helper method to easily do a DELETE request to a specific endpoint on the
     * SimplyBook.me API.
     * @throws RestDataException
     */
    public function delete($endpoint): array
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

        $response = wp_safe_remote_request(
            $this->endpoint($endpoint),
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
        $responseData = is_array($responseBody) ? $responseBody : json_decode($responseBody, true);

        if (!($responseCode >= 200 && $responseCode < 300)) {
            throw (new RestDataException($responseMessage))
                ->setResponseCode($responseCode)
                ->setData($responseData ?: []);
        }

        return $responseData ?: [];
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
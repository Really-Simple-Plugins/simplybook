<?php
namespace SimplyBook\Http;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Carbon\Carbon;
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
     * Flag to use when the authentication failed indefinitely. This is used to
     * prevent us retrying again and again. This flag is possibly true when a
     * refresh token is outdated AND the user has changed their password.
     */
    protected bool $authenticationFailedFlag = false;

    protected string $_commonCacheKey = '_v13';
    protected array $_avLanguages = [
        'en', 'fr', 'es', 'de', 'ru', 'pl', 'it', 'uk', 'zh', 'cn', 'ko', 'ja', 'pt', 'br', 'nl'
    ];

    protected string $public_key = 'U0FAJxPqxrh95xAL6mqL06aqv8itrt85QniuWJ9wLRU9bcUJp7FxHCPr62Da3KP9L35Mmdp0djZZw9DDQNv1DHlUNu5w3VH6I5CB';

    public function __construct(JsonRpcClient $client)
    {
        $this->jsonRpcClient = $client;

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
    protected function endpoint(string $path, string $companyDomain = '', bool $secondVersion = true): string
    {
        $base = 'https://user-api' . ($secondVersion ? '-v2.' : '.');

        // Prevent fields config from being loaded before the init hook. In this
        // case we do not need to validate by default.
        $validateBasedOnDomainConfig = did_action('init');

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
                    case 'user':
                        $this->get_user_token();
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
        $token = get_option("simplybook_token_$type", '');

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
                    'api_key' => $this->public_key,
                )),
        ) );

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );
            error_log("retrieve token response" );
            error_log( print_r($request,true) );
            if ( isset($request->token) ) {
                delete_option('simplybook_token_error' );
                error_log("setting token ".$request->token);
                error_log("setting refresh token ".$request->refresh_token);
                $expiration = time() + $request->expires_in;
                error_log("set expiration to ".$expiration);
                $this->update_token( $request->token );
                $this->update_token( $request->refresh_token, 'public', true );
                update_option('simplybook_refresh_token_expiration', time() + $request->expires_in);
                $this->update_option( 'domain', $request->domain, $this->duringOnboardingFlag );
            } else {
                $this->log("Error during token retrieval");
            }
        } else {
            $this->log("Error during token retrieval: ".$request->get_error_message());		}
    }

    /**
     * Refresh the token
     *
     * @return void
     */
    public function refresh_token($type = 'public'): void {
        //check if we have a token
        $refresh_token = $this->get_token($type, true );
        if (!$refresh_token) {
            return;
        }

        if ( empty($refresh_token) ) {
            $this->get_public_token();
            return;
        }

        if ( $this->token_is_valid($type) ) {
            return;
        }

        //https://user-api-v2.wp.simplybook.ovh/admin/auth/refresh-token

        $data = array(
            'refresh_token' => $refresh_token,
        );

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
            return;
        }

        // If token is 'admin' and the refresh request was "unauthorized" we
        // need to login again.
        if (($response_code === 401) && ($type === 'admin')) {
            if ($this->authenticationFailedFlag) {
                return; // Dont even try again.
            }

            $validateBasedOnDomainConfig = did_action('init');
            $domain = $this->get_domain($validateBasedOnDomainConfig);

            $companyData = $this->get_company();
            $sanitizedCompany = (new CompanyBuilder())->buildFromArray($companyData);

            try {
                $response = $this->authenticateExistingUser(
                    $domain,
                    $this->get_company_login(),
                    $sanitizedCompany->email,
                    $this->decrypt_string($sanitizedCompany->password)
                );
            } catch (\Exception $e) {
                Event::dispatch(Event::AUTH_FAILED);
                // Their password probably changed. Stop trying to refresh.
                update_option($this->authenticationFailedFlagKey, true);
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
            return;
        }

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );

            error_log(print_r("refresh token response for type $type",true));
            error_log(print_r($request,true));
            if ( isset($request->token) ) {
                delete_option('simplybook_token_error' );
                error_log("updating $type token: $request->token");
                error_log("updating $type refresh_token: $request->refresh_token");
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
    public function get_company_login(): string {
        $login = get_option('simplybook_company_login', '');
        if ( !empty($login) ) {
            return $login;
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
     *
     * @return bool
     */
    public function is_authorized(): bool {
        //check if we have a token
        if ( !$this->token_is_valid('admin') ) {
            $this->refresh_token('admin');
        }

        //check if we have a company
        if ( !$this->company_registration_complete() ) {
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
                ]
            ),
        ));

        if (is_wp_error($request)) {
            throw (new ApiException(
                esc_html__('Something went wrong while registering your company. Please try again.'))
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
            esc_html__('Unknown error encountered while registering your company. Please try again.')
        ))->setData([
            'message' => $response->message,
            'data' => get_object_vars($response->data),
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
                esc_html__('Something went wrong while confirming your email. Please try again.'))
            )->setData([
                'error' => $request->get_error_message(),
            ]);
        }

        $response = json_decode(wp_remote_retrieve_body($request));
        if (isset($response->success)) {
            return new ApiResponseDTO(true, esc_html__('Email successfully confirmed.', 'simplybook'));
        }

        $codeIsValid = true;
        $errorMessage = esc_html__('Unknown error encountered while confirming your email. Please try again.');
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
     * Get list of SimplyBook.me services
     *
     * @return array
     */
    public function get_services(): array {
        if ( !$this->company_registration_complete() ){
            return [];
        }

        if ($cache = wp_cache_get('simplybook_services', 'simplybook')) {
            return $cache;
        }

        $response = $this->api_call('admin/services', [], 'GET');
        $services = $response['data'] ?? [];

        if (empty($services)) {
            Event::dispatch(Event::EMPTY_SERVICES);
            return $services;
        }

        Event::dispatch(Event::HAS_SERVICES, [
            'count' => count($services),
        ]);

        wp_cache_set('simplybook_services', $services, 'simplybook', MINUTE_IN_SECONDS);
        return $services;
    }

    /**
     * Update service based on service ID. Make sure to pass at least the
     * mandatory fields: duration and is_visible, besides of course the ID.
     */
    public function updateService(string $serviceId, array $updatedData): array
    {
        $mandatoryFields = [
            'duration',
            'is_visible',
        ];

        foreach ($mandatoryFields as $field) {
            if (!isset($updatedData[$field])) {
                throw new \InvalidArgumentException("Missing mandatory field: $field");
            }
        }

        $endpoint = $this->endpoint('admin/services/' . sanitize_text_field($serviceId));
        $response = wp_safe_remote_request($endpoint, [
            'method' => 'PUT',
            'headers' => $this->get_headers(true, 'admin'),
            'body' => json_encode($updatedData),
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw (new RestDataException($response->get_error_message()))
                ->setResponseCode($response->get_error_code())
                ->setData($response->get_error_data());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode !== 200) {
            throw (new RestDataException($response->get_error_message()))
                ->setResponseCode($responseCode)
                ->setData($response->get_error_data());
        }

        return json_decode(wp_remote_retrieve_body($response), true);
    }

    /**
     * Get list of SimplyBook.me providers
     */
    public function get_providers(): array
    {
        if ( !$this->company_registration_complete() ){
            return [];
        }

        if ($cache = wp_cache_get('simplybook_providers', 'simplybook')) {
            return $cache;
        }

        $response = $this->api_call('admin/providers', [], 'GET');
        $providers = $response['data'] ?? [];

        if (empty($providers)) {
            Event::dispatch(Event::EMPTY_PROVIDERS);
            return $providers;
        }

        Event::dispatch(Event::HAS_PROVIDERS, [
            'count' => count($providers),
        ]);

        wp_cache_set('simplybook_providers', $providers, 'simplybook', MINUTE_IN_SECONDS);
        return $providers;
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

        return $this->api_call('admin/statistic', [], 'GET');
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

    protected function api_call( string $path, array $data = [], string $type='POST', int $attempt = 1 ): array
    {
        if ($this->authenticationFailedFlag) {
            return []; // Prevent us even trying.
        }

        error_log( "api call for $path" );
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
            error_log("POST response body for $path");
            error_log(print_r($response_body, true));
        } else {
            //replace %5B with [ and %5D with ]
            error_log("GET url: ".$this->endpoint( $path ));
            $args = [
                'headers' => $this->get_headers( true, $token_type ),
                $data,
            ];
            $response_body = wp_remote_get($this->endpoint( $path ), $args );
            error_log("GET response body");
            error_log(print_r($response_body, true));
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
            error_log("request success for $path_type");
            error_log(print_r($response,true));
            //update the persistent cache
            $cache = get_option('simplybook_persistent_cache', []);
            $cache[ $path_type ] = $response;
            update_option('simplybook_persistent_cache', $cache, false);
            return $response;
        } else {
            error_log("$$$$$$$");
            error_log(print_r($response, true));
            if ( isset($response['message'])) {
                $message = $response['message'];
            } else if (isset($response->message)){
                $message = $response->message;
            } else {
                $message = '';
            }
            if ( $attempt===1 &&  str_contains( $message, 'Token Expired')) {
                error_log("refresh expired token, attempt $attempt");
                //invalid token, refresh.
                $this->refresh_token($token_type);
                $this->api_call( $path, $data, $type, $attempt + 1 );
            }
            $this->log("Error during $path_type retrieval: ".$message);
            $msg = "response code: $response_code, response body: ".print_r($response_body,true);

            update_option('simplybook_api_status', array(
                'status' => 'error',
                'error' => $msg,
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

    //GET https://user-api-v2.simplybook.me/admin/providers?filter[search]=mike&filter[service_id]=1
    //Content-Type: application/json
    //X-Company-Login: <insert your company login>
    //X-Token: <insert your token from auth step>
    //Response in JSON format
    //With cache data on 30 minutes
    public function getProviders(bool $onlyValues = false)
    {
        $cacheKey = 'sb_plugin_providers' . $this->_commonCacheKey;

        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/providers', [], 'GET');
        $result = $response['data'] ?? [];

        return $onlyValues ? array_values($result) : $result;
    }

    public function getServices(bool $onlyValues = false)
    {
        $cacheKey = 'sb_plugin_services' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/services', [], 'GET');
        $result = $response['data'] ?? [];

        return $onlyValues ? array_values($result) : $result;
    }

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

    public function getSpecialFeatureList()
    {
        $cacheKey = 'sb_plugin_plugins' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }

        $response = $this->api_call('admin/plugins', [], 'GET');
        return $response['data'] ?? [];
    }

    public function isSpecialFeatureEnabled($pluginKey){
        $plugins = $this->getSpecialFeatureList();
        if(!$plugins){
            return false;
        }
        foreach($plugins as $plugin){
            if($plugin['key'] == $pluginKey){
                return $plugin['is_active'];
            }
        }
        return false;
    }

    protected function _log($error)
    {
        $fileTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        $last4 = array_slice($fileTrace, 0, 4);

        if(!is_string($error)){
            @ob_start();
            var_dump($error);
            $error = @ob_get_clean();
        }

        $error = date('Y-m-d H:i:s') . ' ' . $error . "\n";
        $error .= "\n\n" . implode("\n", array_map(function ($item) {
                return $item['file'] . ':' . $item['line'];
            }, $last4));
        $error .= "\n----------------------\n\n\n";
        if ( defined('WP_DEBUG') && WP_DEBUG ) {
            error_log($error);
        }
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
            throw new \Exception($response->get_error_message());
        }

        $responseBody = json_decode(wp_remote_retrieve_body($response), true);
        $responseCode = wp_remote_retrieve_response_code($response);

        if ($responseCode != 200) {
            throw (new RestDataException(
                esc_html__('Failed logging in, please verify your credentials.', 'simplybook')
            ))->setResponseCode(500)->setData([
                'response_code' => $responseCode,
                'response_message' => ($responseBody['message'] ?? esc_html__('Unknown error', 'simplybook')),
            ]);
        }

        if (!isset($responseBody['token'])) {
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
            throw new \Exception($response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode != 200) {
            throw (new RestDataException(
                esc_html__('Failed two factor authentication, please verify your credentials.', 'simplybook')
            ))->setData([
                'response_code' => $responseCode,
                'response_message' => ($responseBody['message'] ?? esc_html__('Unknown 2FA error', 'simplybook')),
            ]);
        }

        $response = json_decode(wp_remote_retrieve_body($response), true);
        if (!isset($response['token'])) {
            throw (new RestDataException(
                esc_html__('Two factor authentication failed! Please try again later.', 'simplybook')
            ))->setData([
                'response_code' => $responseCode,
                'response_message' => esc_html__('Invalid 2FA response from SimplyBook.me', 'simplybook'),
            ]);
        }

        return $response;
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

        $this->update_option('domain', $companyDomain, $this->duringOnboardingFlag);
        $this->update_option('company_id', $companyId, $this->duringOnboardingFlag);

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

}
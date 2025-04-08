<?php
namespace SimplyBook\Http;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Carbon\Carbon;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\LegacyHelper;
use SimplyBook\Http\DTO\ApiResponseDTO;
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

    protected string $_commonCacheKey = '_v13';
    protected array $_avLanguages = [
        'en', 'fr', 'es', 'de', 'ru', 'pl', 'it', 'uk', 'zh', 'cn', 'ko', 'ja', 'pt', 'br', 'nl'
    ];

    protected string $public_key = 'U0FAJxPqxrh95xAL6mqL06aqv8itrt85QniuWJ9wLRU9bcUJp7FxHCPr62Da3KP9L35Mmdp0djZZw9DDQNv1DHlUNu5w3VH6I5CB';

    public function __construct(JsonRpcClient $client)
    {
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

        $this->jsonRpcClient = $client;

//		$recently_loaded = get_transient('simplybook_recently_loaded');
//		if ( !$recently_loaded ) {
//			$this->getBookingStats();
//			set_transient('simplybook_recently_loaded', true, MINUTE_IN_SECONDS);
//		}
    }

    /**
     * Set the during onboarding flag
     */
    public function setDuringOnboardingFlag(bool $flag): ApiClient
    {
        $this->duringOnboardingFlag = $flag;
        return $this;
    }

    public function getBookingStats(){

//		$this->get_user_token();
//		//$headers = $this->get_headers(true, 'user');
//		//$client = new JsonRpcClient($this->endpoint . '/admin/', $headers );
//		$client = new JsonRpcClient('http://user-api.simplybook.me' . '/admin/', array(
//			'headers' => array(
//				'X-Company-Login: ' . $this->get_company_login(),
//				'X-User-Token: ' . $this->get_token('user'),
//			)
//		));
//		$stats = $client->getBookingStats('week');
//		error_log(print_r('stats', true));
//		error_log(print_r($stats, true));

    }

//	public function get_user_token(){
//		$loginClient = new JsonRpcClient($this->endpoint . 'login/' );
//		$pw = $this->decrypt_string(get_option('simplybook_user_token'));
//		$token = $loginClient->getUserToken($this->get_company_login(), sanitize_email( $this->get_option('email') ), $pw);
//		error_log(print_r('user token', true));
//		error_log(print_r($token, true));
//		if ( $token ) {
//			$this->update_token($token, 'user');
//		}
//	}

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
        $domain = $companyDomain ?: $this->get_domain();

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
     * get a token
     *
     * @param string $token
     * @param string $type //public or admin
     * @param bool $refresh
     *
     * @return void
     */

    public function update_token( string $token, string $type = 'public', bool $refresh = false ): void {
        $type = in_array($type, ['public', 'admin', 'user']) ? $type : 'public';
        if ( $refresh ) {
            $type = $type . '_refresh';
        }
        $token = $this->sanitize_token( $token );
        update_option("simplybook_token_$type", $this->encrypt_string($token) );
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
            $headers = $this->get_headers(false );
            $data['company'] = $this->get_company_login();
        } else {
            $path = 'simplybook/auth/refresh-token';
            $headers = $this->get_headers(true );
        }

        $request = wp_remote_post( $this->endpoint( $path ), array(
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                $data
            ),
        ) );

        if ( ! is_wp_error( $request ) ) {
            $response_code = wp_remote_retrieve_response_code( $request );
            $request = json_decode( wp_remote_retrieve_body( $request ) );
            if ( $response_code === 401 && $type==='public' ) {
                error_log("unauthorized, get fresh $type token");
                $this->get_public_token();
                return;
            }
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
     *
     * @return ApiResponseDTO
     */
    public function register_company(): ApiResponseDTO {

        if ( !$this->user_can_manage() ) {
            return new ApiResponseDTO( false, __('You are not authorized to do this.', 'simplybook') );
        }

        //check if we have a token
        if ( !$this->token_is_valid() ) {
            error_log("invalid public token");
            $this->get_public_token();
        }

        if ( get_transient('simply_book_attempt_count') >3 ) {
            $this->log("Too many attempts to register company");
            return new ApiResponseDTO( false, __('Too many attempts, please try again later.', 'simplybook') );
        }

        $email = sanitize_email( $this->get_company('email') );
        $callback_url = $this->generate_callback_url();
        $category = (int) $this->get_company('category');
        $category =  $category < 1 ? 8 : $category; //default other category
        $random_password = wp_generate_password( 24, false );
        $company_name = sanitize_text_field( $this->get_company('company_name') );
        //strip off
        //get a description using the WordPress get_bloginfo function
        $description = $this->get_description();
        $phone = sanitize_text_field( $this->get_company('phone') );
        $city = sanitize_text_field( $this->get_company('city') );
        $address = sanitize_text_field( $this->get_company('address') );
        $service = sanitize_text_field( $this->get_company('service') );
        $country = $this->sanitize_country( $this->get_company('country') );
        //no spaces allowed in zip
        $zip = (string) $this->get_company('zip');
        $zip = sanitize_text_field( strtolower(str_replace(' ', '', trim( $zip ) ) ) );
        $company_login = $this->get_company_login();
        error_log("company login $company_login");
        if ( empty($country) || empty($email) || empty($phone) || empty($company_name) || empty($city) || empty($address) || empty($zip) ) {
            $this->log("Missing fields for company registration");
            $this->log("email: $email, phone: $phone, company_name: $company_name, description: $description, city: $city, address: $address, zip: $zip");
            return new ApiResponseDTO( false, __('Missing fields for company registration. Please fill out all fields.', 'simplybook') );
        }

        $coordinates = $this->get_coordinates($address, $zip, $city, $country);

        $provider = $this->get_user_full_name();
        $request = wp_remote_post( $this->endpoint( 'simplybook/company' ), array(
            'headers' => $this->get_headers( true ),
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode(
                [
                    'company_login' => $company_login,
                    'email' => $email,
                    'name' => $company_name,
                    'description' => $description,
                    'phone' => $phone,
                    'city' => $city,
                    'address1' => $address,
                    'zip' => $zip,
                    "lat" => $coordinates['lat'],
                    "lng" => $coordinates['lng'],
                    "timezone" => $this->get_timezone_string(),
                    "country_id" => $country,
                    "password" => $random_password,
                    "retype_password" => $random_password,
                    'categories' => [$category],
                    'lang' => $this->get_locale(),
                    'marketing_consent' => false,
                    //add a query arg so we can redirect to the correct page when user ends up on this link.
                    'widget_notification_url' => add_query_arg(['simplybook' => true], get_site_url()),
//					'providers'=>[$provider],
//					'services'=>[$service],
					'journey_type' => 'skip_welcome_tour',
//                    'callback_url' => get_rest_url(get_current_blog_id(),"simplybook/v1/company_registration/$callback_url"),
                    'callback_url' => 'https://webhook.site/e58d0977-2a8e-4a77-8806-238a2191aab2',
                ]
            ),
        ) );
        error_log("company registration response");
        error_log(print_r($request,true));

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );
            if ( isset($request->recaptcha_site_key) && $request->success ) {
                delete_option('simplybook_company_registration_error' );
                error_log(print_r($request,true));
                update_option( 'simplybook_recaptcha_site_key', sanitize_text_field( $request->recaptcha_site_key) );
                update_option( 'simplybook_recaptcha_version', sanitize_text_field( $request->recaptcha_version ) );
                $this->update_option( 'company_id', (int) $request->company_id, $this->duringOnboardingFlag );
                update_option("simplybook_company_registration_start_time", time(), false);
                //successful registered
                return new ApiResponseDTO( true );

            } else {
                if ( str_contains( $request->message, 'Token Expired')) {
                    error_log("token expired, refresh");
                    //invalid token, refresh.
                    set_transient('simply_book_attempt_count', get_transient('simply_book_attempt_count') + 1, MINUTE_IN_SECONDS);
                    $this->refresh_token();
                    return $this->register_company();
                }
                error_log(print_r($request->data, true));
                if ( isset($request->data->company_login) &&
                    in_array('The field contains illegal words',$request->data->company_login)
                ) {
                    error_log("company login contains illegal words, generate new one");
                    delete_option('simplybook_company_login');
                    return $this->register_company();
                }

                if ( isset($request->data->name) &&
                    in_array('The field contains illegal words', $request->data->name)
                ) {
                    error_log("company name contains illegal words, go one step back and report issue");
                    return new ApiResponseDTO( false, __('The company name contains illegal words. Please change the company name.', 'simplybook') );
                }

                if ( isset($request->data->company_login) && in_array('login_reserved',$request->data->company_login) ) {
                    error_log("company login already exists");
                    //company login already exists. We will be assuming for now that the user is here by accident.
                    //we return a success and exit.
                    //@todo update existing data instead of just returning.
                    return new ApiResponseDTO( true );
                }

                $this->log("Error during company registration: ".$request->message);
                //get first property of $request->data
                $error = '';
                $fields        = get_object_vars( $request->data );
                if ( $fields && is_array($fields) ) {
                    $error_messages = reset( $fields );
                    $error = $error_messages[0] ?? '';
                }

                return new ApiResponseDTO( false, $request->message.' '.$error );
            }

        } else {
            //retrieve the wp_error message
            $this->log("Error during company registration: ".$request->get_error_message());
            return new ApiResponseDTO( false, __('Error during company registration.', 'simplybook')." ".$request->get_error_message() );
        }
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
     * Registers a company with the API
     *
     * @param int $email_code
     * @param string $recaptcha_token
     *
     * @return ApiResponseDTO
     */
    public function confirm_email( int $email_code, string $recaptcha_token ): ApiResponseDTO {
        if ( !$this->user_can_manage() ) {
            return new ApiResponseDTO( false, __('You are not authorized to do this.', 'simplybook') );
        }

        //check if the company registration was started
        if ( !get_option("simplybook_company_registration_start_time") ) {
            $this->log("Company registration not started yet");
            return new ApiResponseDTO( false, __('Complete the previous, company registration step first.', 'simplybook') );
        }

        error_log("confirming email with body:");
        error_log(print_r(				[
            'company_login' => $this->get_company_login(),
            'confirmation_code' => $email_code,
            'recaptcha' => $recaptcha_token,
        ], true));

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
        ) );

        error_log("email confirmation response");
        error_log( print_r($request,true) );

        if ( ! is_wp_error( $request ) ) {
            $request = json_decode( wp_remote_retrieve_body( $request ) );
            if ( isset($request->success) ) {
                error_log("email confirmation success, please wait for the callback.");
                return new ApiResponseDTO( true, __('Email successfully confirmed.', 'simplybook') );
            } else {
                $this->log("Error during email confirmation: ".$request->message);
                return new ApiResponseDTO( false, $request->message);
            }
        } else {
            return new ApiResponseDTO( false, __('Error email confirmation.', 'simplybook')." ".$request->get_error_message() );
        }
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
     * Get list of Simplybook services
     *
     * @return array
     */

    public function get_services(): array {
        if ( !$this->company_registration_complete() ){
            return [];
        }
        $response = $this->api_call('admin/services', [], 'GET');
        return $response['data'] ?? [];
    }

    /**
     * Get list of Simplybook providers
     *
     * @return array
     */

    public function get_providers(): array {
        if ( !$this->company_registration_complete() ){
            return [];
        }
        $response = $this->api_call('admin/providers', [], 'GET');
        return $response['data'] ?? [];
    }

    /**
     * Get all subscription data
     */
    public function get_subscription_data(): array
    {
        if ($this->company_registration_complete() === false) {
            return [];
        }

        return $this->api_call('admin/tariff/current', [], 'GET');
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
     * If any services are registered
     *
     * @return bool
     */
    public function has_services(): bool {
        $services = $this->get_services();
        return !empty($services);
    }

    /**
     * Get list of plugins with is_active and is_turned_on information
     * @return array
     */
    public function get_plugins(): array {
        if ( !$this->company_registration_complete() ){
            return [];
        }
//		paid_events
        //memberships
        //sms
        $array = [
            "event_field",
            "status",
            "paid_events",
            "description",
            "event_category",
            "news",
            "google_analytics",
            "facebookImage",
            "google_calendar_export",
            "user_license",
            "promo",
            "custom_css",
            "advanced_notification",
            "multiple_booking",
            "group_booking",
            "any_unit",
            "location",
            "secure",
            "contact_widget",
            "api",
            "financial_dashboard",
            "limit_bookings",
            "approve_booking",
            "back_to_site",
            "data_security",
            "unit_colors",
            "recap",
            "counter",
            "hipaa",
            "fixed_time",
            "cancelation_policy",
            "gallery",
            "flexible_template",
            "smtp",
            "client_login",
            "membership",
            "custom_domain",
            "enterprise",
            "client_soap",
            "sms",
            "classes",
            "import_clients",
            "social_gallery",
            "paid_attributes",
            "product",
            "google_authenticator",
            "facebook_bot",
            "voice_booking",
            "client_soap_crypt",
            "promotion",
            "google_translate",
            "strict_password",
            "google_tag_manager",
            "pos",
            "static_page",
            "package",
            "zapier",
            "google_business",
            "line_bot",
            "facebook_business",
            "deposit_paid_events",
            "kiosk",
            "reschedule_booking",
            "slots_count",
            "resources",
            "tickets",
            "client_field",
            "online_meeting",
            "saml",
            "waiting_list",
            "pwa",
            "external_booking_validator",
            "tickets_qr_code",
            "vaccination",
            "custom_email",
            "tracking",
            "medical_test",
            "cloud_storage",
            "telegram_notifications",
            "bonus_system",
            "line_liff",
            "look_busy",
            "google_reviews",
            "booking_restriction",
            "time_before_service",
            "tips",
            "tags",
            "campaign",
            "react_widget",
            "classpass"
        ];



        $plugins = $this->api_call('admin/plugins', [], 'GET');

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

    protected function api_call( string $path, array $data = [], string $type='POST', int $attempt = 1 ): array {
        error_log( "api call for $path" );
        //with common API (common token): you are able to call /simplybook/* endpoints. ( https://vetalkordyak.github.io/sb-company-api-explorer/main/ )
        //with company API (company token): you are able to call company API endpoints. ( https://simplybook.me/en/api/developer-api/tab/rest_api )
        $apiStatus = get_option( 'api_status' );
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
            update_option('api_status', [
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

            update_option('api_status', array(
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
        $api_status = get_option('api_status');
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

        $responseCode = wp_remote_retrieve_response_code($response);
        if ($responseCode != 200) {
            throw new \Exception('Authentication failed with code ' . $responseCode);
        }

        $response = json_decode(wp_remote_retrieve_body($response), true);
        if (!isset($response['token'])) {
            throw new \Exception('Authentication failed with no token');
        }

        if (isset($response['require2fa'], $response['auth_session_id']) && ($response['require2fa'] === true)) {
            throw (new RestDataException('Two FA Required'))
                ->setResponseCode(200) // todo - 200 is needed due to how to "request" now works in React :/
                ->setData([
                    'require2fa' => true,
                    'auth_session_id' => $response['auth_session_id'],
                    'company_login' => $companyLogin,
                    'user_login' => $userLogin,
                    'domain' => $companyDomain,
                    'allowed2fa_providers' => $this->get2FaProvidersWithLabel(($response['allowed2fa_providers'] ?? ['ga'])),
                ]);
        }

        return $response;
    }

    /**
     * Process two-factor authentication with the API. If successful, the token is stored in the options.
     *
     * @throws \Exception
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
            throw new \Exception('2fa Authentication failed with code ' . $responseCode);
        }

        $response = json_decode(wp_remote_retrieve_body($response), true);
        if (!isset($response['token'])) {
            throw new \Exception('2fa Authentication failed with no token');
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
                esc_html__('Unknown 2fa provider', 'simplybook'));
        }

        return $allowedProviders;
    }

    /**
     * Get the list of themes available for the company
     * @uses \SimplyBook\Http\JsonRpcClient
     */
    public function getThemeList(): array
    {
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
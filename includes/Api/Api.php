<?php
namespace Simplybook\Api;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Simplybook\Traits\Helper;
use Simplybook\Traits\Load;
use Simplybook\Traits\Save;


class Api
{
    use Load;
    use Save;
	use Helper;

	protected $_commonCacheKey = '_v13';
    protected $_avLanguages = [
        'en', 'fr', 'es', 'de', 'ru', 'pl', 'it', 'uk', 'zh', 'cn', 'ko', 'ja', 'pt', 'br', 'nl'
    ];
	protected $api_url = 'https://user-api-v2.simplybook.me/';

	protected $endpoint = 'https://user-api-v2.wp.simplybook.ovh/';

	protected $public_key = 'U0FAJxPqxrh95xAL6mqL06aqv8itrt85QniuWJ9wLRU9bcUJp7FxHCPr62Da3KP9L35Mmdp0djZZw9DDQNv1DHlUNu5w3VH6I5CB';
    public function __construct()
    {
		//$this->get_services();

	    //if a token has never been set before, we load it.
	    //if we have a token, check if it needs to be refreshed
	    error_log("common token: ".$this->get_token('common'));
	    error_log("common refresh token: ".$this->get_token('common'));

	    error_log("admin token: ".$this->get_token('company'));
	    error_log("admin refresh token: ".$this->get_token('company'));
		if ( !$this->get_token('common') ) {
			$this->get_common_token();
		} else {
			if ( !$this->token_is_valid('common') ) {
				error_log("common token expired, refresh");
				$this->refresh_token();
			}

			if ( !empty($this->get_token('company') ) && !$this->token_is_valid('company') ) {
				error_log("company token expired, refresh");
				$this->refresh_token('company');
			}

		}



//		add_action('init', array($this, 'register_company'));
	}

	/**
	 * Check if we have a company_id, which shows we have a registered company
	 *
	 * @return bool
	 */
	public function company_registration_complete(): bool {
		if ( !$this->get_option('company_id') ) {
			return false;
		}
		return true;
	}

	/**
	 * Build the endpoint
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	protected function endpoint( string $path ): string {
		return $this->endpoint . $path;
	}

	/**
	 * Get a direct login to simplybook.me
	 *
	 * @return string
	 */
	public function get_login_url(): string {

		$response = $this->api_call("admin/auth/create-login-hash", [], 'POST');
		error_log(print_r($response,true));
		if (isset($response['login_url'])) {
			return esc_url_raw($response['login_url']);
		}
		return 'https://simplybook.me';
	}

	/**
	 * Get headers for an API call
	 * @param bool $include_token // optional, default false
	 * @return array
	 */
	protected function get_headers( bool $include_token = false, $token_type = 'common' ): array {
		$token_type = in_array($token_type, ['common', 'company']) ? $token_type : 'common';
		$headers = array(
			'Content-Type'  => 'application/json',
		);

		if ( $include_token ) {
			$headers['X-Token'] = $this->get_token($token_type);
			$headers[ 'X-Company-Login' ] = $this->get_company_login();
		}

		error_log("used headers:");
		error_log(print_r($headers,true));
		return $headers;
	}

	/**
	 * get a token
	 *
	 * @param string $token
	 * @param string $type //common or company
	 * @param bool $refresh
	 *
	 * @return void
	 */

	public function update_token( string $token, string $type = 'common', bool $refresh = false ): void {
		$type = in_array($type, ['common', 'company']) ? $type : 'common';
		if ( $refresh ) {
			$type = $type . '_refresh';
		}
		$token = $this->sanitize_token( $token );
		update_option("simplybook_token_$type", $this->encrypt_string($token) );
	}

	/**
	 * Get a token
	 * @param string $type //common or company
	 * @param bool $refresh
	 * @return string
	 */
	public function get_token( string $type = 'common', bool $refresh = false ) : string {
		$type = in_array($type, ['common', 'company']) ? $type : 'common';
		if ( $refresh ) {
			$type = $type . '_refresh';
		}
		$token = get_option("simplybook_token_$type", '');

		return $this->decrypt_string($token);
	}

	/**
	 * Get common token
	 *
	 * @return void
	 */
	public function get_common_token(): void {
		error_log("GET COMMON TOKEN");
		if ( $this->token_is_valid() ) {
			error_log("we have a valid token");
			return;
		}
		error_log("request to ".'simplybook/auth/token');
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
				$this->update_token( $request->refresh_token, 'common', true );
				update_option('simplybook_refresh_token_expiration', time() + $request->expires_in);
				$this->update_option( 'domain', $request->domain );
			} else {
				error_log("token not set in object");
				update_option('simplybook_token_error', true, false);
			}
		} else {
			update_option('simplybook_token_error', true, false);
		}
	}

	/**
	 * Refresh the token
	 *
	 * @return void
	 */
	public function refresh_token($type = 'common'): void {
		//check if we have a token
		$refresh_token = $this->get_token($type, true );
		if (!$refresh_token) {
			return;
		}
		error_log("refresh token". $refresh_token);
		if ( empty($refresh_token) ) {
			error_log("MISSING REFRESH TOKEN, GET $type TOKEN");
			$this->get_common_token();
			return;
		}

		if ( $this->token_is_valid($type) ) {
			error_log("no need to refresh, refresh token of type $type is already valid ");
			return;
		}

		error_log("refreshing $type token");
		//https://user-api-v2.wp.simplybook.ovh/admin/auth/refresh-token

		$data = array(
			'refresh_token' => $refresh_token,
		);
		if ( $type === 'company' ){
			$path = 'admin/auth/refresh-token';
			$headers = $this->get_headers(false );
			$data['company'] = $this->get_company_login();
		} else {
			$path = 'simplybook/auth/refresh-token';
			$headers = $this->get_headers(true );
		}
		error_log("using body");
		error_log(print_r($data,true));
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
			if ( $response_code === 401 && $type==='common' ) {
				error_log("unauthorized, get fresh $type token");
				$this->get_common_token();
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
				$expires_option = $type === 'common' ? 'simplybook_refresh_token_expiration' : 'simplybook_refresh_company_token_expiration';
				update_option($expires_option, time() + $request->expires_in);
			} else {
				update_option('simplybook_token_error', true, false);
			}
		} else {
			update_option('simplybook_token_error', true, false);
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
	 *
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
	 * Get the server URL
	 *
	 * @return string
	 */
	public function get_server(): string {
		$domain = $this->get_option('domain');
		$login = $this->get_company_login();
		return "https://$login.$domain";
	}

	/**
	 * Check if we have a valid token
	 *
	 * @return bool
	 */
	protected function token_is_valid( $type = 'common' ): bool {
		$refresh_token = $this->get_token($type, true );
		$type = in_array($type, ['common', 'company']) ? $type : 'common';
		if ( $type === 'company' ) {
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
		if ( !$this->token_is_valid('company') ) {
			$this->refresh_token('company');
		}

		//check if we have a company
		if ( !$this->company_registration_complete() ) {
			return false;
		}
		return true;
	}

	/**
	 * Registers a company with the API
	 *
	 * @return bool
	 */
	public function register_company(): bool {
		if ( !$this->user_can_manage() ) {
			return false;
		}

		//check if we have a token
		if ( !$this->token_is_valid() ) {
			$this->get_common_token();
		}

		if ( get_transient('simply_book_attempt_count') >2 ) {
			$this->log("Too many attempts to register company");
			return false;
		}

		$email = sanitize_email( $this->get_option('email') );
		$callback_url = $this->generate_callback_url();
		$category = (int) $this->get_option('category');
		$category =  $category < 1 ? 8 : $category; //default other category
		$random_password = wp_generate_password( 24, false );
		$company_name = sanitize_text_field( $this->get_option('company_name') );
		$description = sanitize_text_field( $this->get_option('description') );
		$phone = sanitize_text_field( $this->get_option('phone') );
		$city = sanitize_text_field( $this->get_option('city') );
		$address = sanitize_text_field( $this->get_option('address') );
		//no spaces allowed in zip
		$zip = (string) $this->get_option('zip');
		$zip = sanitize_text_field( str_replace(' ', '', trim( $zip ) ) );

		//use some defaults for testing purposes
		$company_name = "really simple plugins";
		$description = "plugins dev";
		$phone = '1234567890';
		$city = 'Groningen';
		$address = 'Kalmarweg 14-5';
		$email = "rogierlankhorst@gmail.com";
		$company_login = $this->get_company_login();
		error_log("company login $company_login");
		$zip = "12345";
		if ( empty($email) || empty($phone) || empty($company_name) || empty($description) || empty($city) || empty($address) || empty($zip) ) {
			$this->log("Missing fields for company registration");
			$this->log("email: $email, phone: $phone, company_name: $company_name, description: $description, city: $city, address: $address, zip: $zip");
			return false;
		}

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
					"lat" => "",
				    "lng" => "",
				    "timezone" => $this->get_timezone_string(),
				    "country_id" => "NL",
				    "password" => $random_password,
				    "retype_password" => $random_password,
					'categories' => [$category],
					'lang' => $this->get_locale(),
					'callback_url' => get_rest_url(get_current_blog_id(),"simplybook/v1/company_registration/$callback_url"),
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
				$this->update_option( 'company_id', (int) $request->company_id );
				//successful registered
				return true;
			} else {
				if ( str_contains( $request->message, 'Token Expired')) {
					//invalid token, refresh.
					set_transient('simply_book_attempt_count', get_transient('simply_book_attempt_count') + 1, MINUTE_IN_SECONDS);
					$this->refresh_token();
					$this->register_company();
				}
				error_log(print_r($request->data, true));
				if ( isset($request->data->company_login) &&
				     in_array('The field contains illegal words',$request->data->company_login)
				) {
					error_log("company login contains illegal words, generate new one");
					delete_option('simplybook_company_login');
					$this->register_company();
				}

				if ( isset($request->data->company_login) && in_array('login_reserved',$request->data->company_login) ) {
					error_log("company login already exists, and we should already have a company token");
					//@todo if company token does not exist, delete company_login and register new.
					return true;
				}

				$this->log("Error during company registration: ".$request->message);
				update_option('simplybook_company_registration_error', $request->message, false);
			}
		} else {
			update_option('simplybook_company_registration_error', true, false);
		}

		//not successful registered
		return false;
	}

	/**
	 * Registers a company with the API
	 *
	 * @return bool
	 */
	public function confirm_email( $email_code, $recaptcha_token ){
		if ( !$this->user_can_manage() ) {
			return false;
		}

		//check if the company registration was completed already
		if ( !$this->company_registration_complete() ) {
			$this->log("Company registration not completed yet");
			return false;
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
		error_log(print_r($request,true));

		if ( ! is_wp_error( $request ) ) {
			$request = json_decode( wp_remote_retrieve_body( $request ) );
			if ( isset($request->success) ) {
				error_log("email confirmation success, please wait for the callback.");
				delete_option('simplybook_email_confirm_error' );
				return true;
			} else {
				$this->log("Error during email confirmation: ".$request->message);
				update_option('simplybook_email_confirm_error', $request->message, false);
			}
		} else {
			update_option('simplybook_email_confirm_error', true, false);
		}
		return false;
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
		if( !$this->token_is_valid('company') ){
			$this->refresh_admin_token();
			return array();
		}
		$services = get_transient('simplybook_services');
		//if ( !$services ) {
			$services = $this->api_call('admin/services', [], 'GET');
			set_transient('simplybook_services', $services, WEEK_IN_SECONDS);
		//}

		return $services;
	}

	/**
	 * Do an API request to simplybook
	 *
	 * @param string $path
	 * @param array $data
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
		$token_type = str_contains( $path, 'admin' ) ? 'company' : 'common';

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
			$url = add_query_arg($data, $this->endpoint( $path ));
			error_log("GET url: ".$url);
			$response_body = wp_remote_get($url, $this->get_headers( true, $token_type ) );
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
			$cache = get_option('simplybook_persistent_cache');
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
			update_option("simplybook_{$path_type}_error", $message, false);
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

	/*POST https://user-api-v2.simplybook.me/admin/auth/refresh-token
	Content-Type: application/json

	{
	"company": "<insert your company login>",
	"refresh_token": "<insert refresh_token from auth step>"
	}*/
	public function refreshToken()
	{
		$authData = $this->getAuthData();
		if (!$authData) {
			return false;
		}

		$url = $this->_getApiUrl() . 'admin/auth/refresh-token';
		$args = array(
			'body' => json_encode(array(
				'company' => $authData['company'],
				'refresh_token' => $authData['refresh_token'],
			)),
			'headers' => array(
				'Content-Type' => 'application/json',
			),
		);
		$response = wp_remote_post($url, $args);
		$result = wp_remote_retrieve_body($response);

		if (is_wp_error($response)) {
			$this->_log(json_encode($response));
			return false;
		}

		$result = json_decode($result, true);

		if (!$result || !isset($result['token']) || !$result['token']) {
			$this->_log('Logout after Refresh token because incorrect data received');
			return false;
		}

		$authData = array_merge($authData, $result, array(
			'is_refreshed' => true,
			'refresh_time' => time(),
		));

		foreach ( $authData as $key => $value ) {
			$this->update_option($key, $value);
		}

		$this->update_option('auth_datetime', time());
		$this->update_option('is_auth', true);

		return true;
	}

    public function auth()
    {
        $url = $this->getAuthUrl();
        $this->_redirect($url);
    }

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

    protected function _redirect($url, $params = array())
    {
        $params['exit'] = true;
        header('Location: ' . $url);
        exit;
    }

    public function authenticate(){
        $url = $this->_getApiUrl() . 'admin/auth/';
        error_log("authenticating...");
        $response = $this->makeApiCall( $url, null, 'POST', array(
            'company' => $this->get_option('company'),//rsptest1
            'login' => $this->get_option('login'),//rogier@really-simple-ssl.com
            'password' => 'h!cPOnq2cpPfPUPh$sMVdLB&8^MX$48V',
        ));
//        [token] => 069cdc05d7a9c4ae018dbc704a431051411dc43c8926ba790fddb6957274b540
//        [company] => rsptest1
//        [login] => rogier@really-simple-ssl.com
//        [refresh_token] => 1cda23311f155dd38f2e3c040abb8cc8ba81250dbd77280a60d42e71dfbd0539
//        [domain] => simplybook.me
//        [require2fa] =>
//    [allowed2fa_providers] => Array
//        (
//        )
//
//        [auth_session_id] =>
//    [id] =>
        if ( !$response ) {
            return false;
        }
        $token = $this->sanitize_token( $response['token'] ?? '' );
        $refresh_token = $this->sanitize_token( $response['refresh_token'] ?? '' );
		$this->update_token( $token );
		$this->update_token( $refresh_token, 'common', true );
		update_option('simplybook_refresh_token_expiration', time() + 3600);
    }


    public function isAuthorized(): bool
    {
        $authData = $this->getAuthData();
        $authDatetime = $this->get_option('auth_datetime');
        $isAuth = $this->get_option('is_auth');

        if ( $isAuth && $authDatetime ) {
            if ( $authData && !isset($authData['is_refreshed']) ) {
                return $this->refreshToken();
            }

            $authDatetime = (int)$authDatetime;
            $now = time();
            $diff = $now - $authDatetime;

            if ( $diff > 3.5 *  HOUR_IN_SECONDS ) { // 3.5 hours
                return $this->refreshToken();
            }

            return true;
        }
        return false;
    }

    public function getAuthHashData(){
        $url = $this->_getApiUrl() . '/admin/auth/create-login-hash';
        return $this->makeApiCall($url, null, 'POST');
    }

    public function getAuthData()
    {
        $authData = $this->get_api_data();
        if ( !empty($authData) ) {
            return $authData;
        } else if ( isset($_GET['token']) && isset($_GET['refresh_token']) ) {
            $this->update_token(  sanitize_text_field($_GET['token']) );
            $this->update_option( 'company', $this->sanitize_token($_GET['company']) );
            $this->update_token( $this->sanitize_token($_GET['refresh_token']), 'common', true );
            $this->update_option( 'domain', sanitize_text_field($_GET['domain']) );
            $this->update_option( 'auth_datetime', time() );
            $this->update_option( 'is_auth', 'refresh' );

            return $authData;
        } else {
            return false;
        }
    }

    protected function _getCallbackUrl()
    {
        return sanitize_url((empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
    }

    public function getMainSiteUrl()
    {
        $domain = $this->getDomain();
        $mainSite = 'https://' . $domain;

        if (strpos($domain, 'em.') !== false) {
            $mainSite = 'https://' . 'simplybook.' . $domain;
        }
        return $mainSite;
    }

    public function getCompanyUrl($admin = true){
        $login = $this->getAuthData()['company'];
        $domain = $this->getAuthData()['domain'];
        $isCustomDomain = false;

        //check if domain ends with .simplybook.(me|it|asia|net|org) its not custom domain
        if(!preg_match('/simplybook\.(me|it|asia|net|org|ovh)$/i', $domain)){
            $isCustomDomain = true;
        }

        if($admin){
            if($isCustomDomain) {
                $domain = 'simplybook.me';
            }
            return "https://{$login}.secure.{$domain}";
        } else {
            $publicUrl = $this->get_option('public_url');
            if($publicUrl){
                return 'https://' . $publicUrl;
            } else {
                return "https://{$login}.{$domain}";
            }
        }

    }

    public function getAuthUrl()
    {
        $mainSite = $this->getMainSiteUrl();

        $url = $mainSite . '/oauth/ologin/?' . http_build_query(array(
                'redirect_uri' => $this->_getCallbackUrl(),
            ));
        return $url;
    }

    public function getAdminUrl(){
        return $this->getCompanyUrl(true);
    }


    protected function _checkAddParamToUrl($url, $param, $value){
        if (strpos($url, $param . '=') === false) {
            $url .= '&' . $param . '=' . $value;
        } else {
            $url = preg_replace('/' . $param . '=[^&]+/', $param . '=' . $value, $url);
        }
        return $url;
    }

    public function getRegisterUrl(){
        $callbackUrl = $this->_getCallbackUrl();

        $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, 'sbpage', 'login');
        $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, 'm', 'confirm');
        $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, '_wpnonce', wp_create_nonce('simplybook_nonce'));

        $wpLanguage = get_locale();

        $simplybookAvailableLanguages = $this->_avLanguages;

        $iso2lang = substr($wpLanguage, 0, 2);
        if(!in_array($iso2lang, $simplybookAvailableLanguages)){
            $iso2lang = 'en';
        }

        $extendifyPartnerId = defined('EXTENDIFY_PARTNER_ID') ? EXTENDIFY_PARTNER_ID : null;

        $params = array(
            'redirect_uri' => get_site_url() . "/?p=-1&sbcburl=" . urlencode(base64_encode($callbackUrl)),
            'ref' => 'wpplugin',
        );

        if($extendifyPartnerId){
            $params['epid'] = $extendifyPartnerId;
        }

        $url = $this->getMainSiteUrl() . "/{$iso2lang}/default/registration/type/wordpress/?" . http_build_query($params);

        return $url;
    }

    public function getCallbackUrl()
    {
        return $this->_getCallbackUrl();
    }

    protected function _getApiUrl()
    {
        $domain = $this->getDomain();
		return $this->api_url;
        return 'https://user-api-v2.' . $domain . '/';
    }

    /**
     * @return array
     */
    protected function get_headers_old(): array
    {
        if ( !$this->isAuthorized() ) {
            return [];
        }

        return array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'X-Company-Login' => $this->get_option('company'),
                'X-Token' => $this->get_token(),
            ),
        );
    }

	/**
	 * Clear cache
	 *
	 * @return void
	 */
    protected function _clearCache(): void {
        $cachedKeys = get_option('simplybook_cache_keys', [] );
        foreach ($cachedKeys as $key => $time) {
            delete_transient($key);
        }
        update_option('simplybook_cache_keys', []);
    }


    //GET https://user-api-v2.simplybook.me/admin/providers?filter[search]=mike&filter[service_id]=1
    //Content-Type: application/json
    //X-Company-Login: <insert your company login>
    //X-Token: <insert your token from auth step>
    //Response in JSON format
    //With cache data on 30 minutes
    public function getProviders()
    {
        $cacheKey = 'sb_plugin_providers' . $this->_commonCacheKey;

        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }
        $url = $this->_getApiUrl() . 'admin/providers';
        return $this->makeApiCall($url, $cacheKey);
    }

    public function getServices()
    {
        $cacheKey = 'sb_plugin_services' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }
        $url = $this->_getApiUrl() . 'admin/services';
        return $this->makeApiCall($url, $cacheKey);
    }

    public function getCategories()
    {
        $cacheKey = 'sb_plugin_categories' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }
        $url = $this->_getApiUrl() . 'admin/categories';
        return $this->makeApiCall($url, $cacheKey);
    }

    public function getLocations()
    {
        $cacheKey = 'sb_plugin_locations' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }
        $url = $this->_getApiUrl() . 'admin/locations';
        return $this->makeApiCall($url, $cacheKey);
    }

    public function getPluginsList()
    {
        $cacheKey = 'sb_plugin_plugins' . $this->_commonCacheKey;
        if (($result = get_transient($cacheKey)) !== false) {
            return $result['data'];
        }
        $url = $this->_getApiUrl() . 'admin/plugins';
        return $this->makeApiCall($url, $cacheKey);
    }

    public function isPluginEnabled($pluginKey){
        $plugins = $this->getPluginsList();
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
     * @param $url
     * @param $cacheKey
     * @return array
     */
    protected function makeApiCall($url, $cacheKey = null, $type = "GET", $params = [] ): array
    {
        $apiStatus = get_option('api_status');
        if ( $apiStatus && $apiStatus['status'] === 'error' && $apiStatus['time'] > time() - 60 * HOUR_IN_SECONDS && $cacheKey) {
            $longCacheData = get_transient($cacheKey . '_long'); //return long cache
            return $longCacheData ? ($longCacheData['data'] ?? $longCacheData) : [];
        }

        if( !$params || !count($params) ){
            $params = array(
                'page' => 1,
                'on_page' => 100,
            );
        }

        $args = $this->get_headers_old();
        if ( empty($args) ) {
            return [];
        }

        $response = false;
        if( $type == "POST" ){
            $args['body'] = json_encode($params);
            $response = wp_remote_post($url, $args);
        } else if ( $type == "GET" ) {
            $url = add_query_arg($params, $url);
            $response = wp_remote_get($url, $args);
        }

        //check if response is 200 success
        $response_code = wp_remote_retrieve_response_code($response);
        $result = wp_remote_retrieve_body($response);
        $result = json_decode($result, true);

        if ( is_wp_error($response) || $response_code != 200 ) {
            $msg = $resultArr['message'] ?? $response['response']['message'];
            $errorMsg = 'Curl error: ' . $msg . ' Http code:' . $response_code . ' Response body: ' . $result;
            update_option('api_status', array(
                'status' => 'error',
                'error' => $errorMsg,
                'time' => time(),
            ));

            $this->_log($errorMsg);
            return [];
        }

        if( $cacheKey ) {
            //store used key for clearing purposes
            $stored_keys = get_option('simplybook_cache_keys', []);
            if ( !in_array($cacheKey, $stored_keys) ) {
                $stored_keys[] = $cacheKey;
                update_option('simplybook_cache_keys', $stored_keys );
            }
            set_transient($cacheKey, $result, 30 * HOUR_IN_SECONDS);
            //save current data to long cache
            set_transient($cacheKey . '_long', $result, 0); //never expire
        }

        update_option('api_status', array(
            'status' => 'success',
            'time' => time(),
        ));
        return $result['data'] ?? $result;
    }
}
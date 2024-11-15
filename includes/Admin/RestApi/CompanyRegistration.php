<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class CompanyRegistration extends RestApi {
	use Helper;
	use Save;

	/**
	 * Register the rest route
	 *
	 * @return void
	 */
	public function register_rest_route(): void
	{
		$callback_url = $this->get_callback_url();
		if ( empty( $callback_url ) ) {
			return;
		}

		register_rest_route(
			'simplybook/v1',
			'company_registration/'.$callback_url,
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'company_registration' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get the temporary callback URL. Return empty string if the URL is expired
	 *
	 * @return string
	 */
	protected function get_callback_url(): string {
		$callback_url = get_option('simplybook_callback_url', '' );
		$expires = get_option('simplybook_callback_url_expires' );
		if ( $expires > time() ) {
			return $callback_url;
		}

		//expired URL
		delete_option('simplybook_callback_url');
		return '';
	}

	/**
	 * Register a user with email addres with Simplybookme
	 *
	 * @param $request
	 * @return WP_Error|WP_REST_Response
	 */
	public function company_registration($request ): WP_Error|WP_REST_Response
	{
		$data = $request->get_json_params();

		$validated_response = $this->validate_request( $data );
		if ( is_wp_error( $validated_response ) ) {
			return $validated_response;
		}
//		success: true if the company was created successfully, false otherwise
//company_id: The ID of the company that was created
//company_login: The login of the company that was created
//error: object containing the error details if the company creation failed
//error[message] The error message if the company creation failed
		// get the nonce
		error_log("Company Registration API POST response");
		error_log(print_r($data,true));
		$nonce  = (bool) $data['success'];
		$company_id = $data['company_id'];
		$company_login = $data['company_login'];
		$error = $data['error'] ?? false;
		if ( $error && isset($error['message']) ){
			$this->log($error['message']);
		}



		if ( ob_get_length() ) {
			ob_clean();
		}

		return $this->response( $data );
	}


}

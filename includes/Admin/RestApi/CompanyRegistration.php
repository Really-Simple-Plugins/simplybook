<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class CompanyRegistration extends RestApi {
	use Helper;
	use Save;

	/**
	 * Register a dynamic rest route
	 * Publicly available, but the rest route itself is valid only 5 minutes.
	 *
	 * @return void
	 */
	public function register_rest_route(): void
	{
		$callback_url = $this->get_callback_url();
		if ( empty( $callback_url ) ) {
			return;
		}
		error_log("call back url: company_registration/".$callback_url);
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
			error_log("return callback url ".$callback_url);
			return $callback_url;
		}

		error_log("the callback url is expired, delete the option");
		//expired URL
		delete_option('simplybook_callback_url');
		return '';
	}

	/**
	 * Register a user with email addres with Simplybookme
	 *
	 * @param $request
	 * @return void
	 */
	public function company_registration($request ): void
	{
		$data = $request->get_json_params();
		error_log("Company Registration API POST response on the callback URL");
		error_log(print_r($data,true));
		$success = (bool) $data['success'];
		$token  = (bool) $data['token'];
		if ( $success ) {
			$this->update_option( 'company_token', $token );
		} else {
			$error = $data['error'] ?? false;
			if ( $error && isset($error['message']) ){
				$this->log($error['message']);
			}
		}
	}
}

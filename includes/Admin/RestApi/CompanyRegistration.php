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
		if ( $success ) {
			$this->api->update_token( sanitize_text_field($data['token']), 'company' );
			$this->api->update_token( sanitize_text_field($data['refresh_token']), 'company', true );
			$this->update_option('domain', sanitize_text_field($data['domain']));
			$this->update_option( 'company_id', (int) $data['company_id'] );

			$this->cleanup_callback_url();
		} else {
			$error = $data['error'] ?? false;
			if ( $error && isset($error['message']) ){
				$this->log($error['message']);
			}
		}
	}
}

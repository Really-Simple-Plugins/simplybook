<?php
namespace Simplybook\Admin\RestApi;

use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class WaitForRegistrationCallback extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'check_registration_callback_status',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'check_registration_callback_status' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	/**
	 * Check if the registration callback has been completed
	 *
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function check_registration_callback_status($request): WP_REST_Response {
		$completed  = (int) get_option('simplybook_refresh_company_token_expiration')>0;
		error_log("registration callback has been completed");
		return $this->response([
			'status' => $completed ? 'completed' : 'pending',
		]);
	}
}
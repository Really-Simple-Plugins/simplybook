<?php
namespace Simplybook_old\Admin\RestApi;
use WP_REST_Response;
use Simplybook_old\Traits\Save;
use Simplybook_old\Traits\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated 3.0.0 Use {@see \SimplyBook\App\Http\Endpoints\WaitForRegistrationEndpoint} instead
 */
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
		return $this->response([
			'status' => $completed ? 'completed' : 'pending',
		]);
	}
}
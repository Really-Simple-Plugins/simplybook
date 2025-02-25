<?php
namespace Simplybook_old\Admin\RestApi;

use Simplybook_old\Traits\Helper;
use Simplybook_old\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Providers extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'providers',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'providers' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	/**
	 * Get services
	 *
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function providers($request): WP_REST_Response {
		$providers = $this->api->get_providers();
		error_log(print_r("providers array in rest api",true));
		error_log(print_r($providers,true));
		return $this->response($providers);
	}
}
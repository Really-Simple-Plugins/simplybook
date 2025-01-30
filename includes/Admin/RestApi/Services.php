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

class Services extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'services',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'services' ),
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
	public function services($request): WP_REST_Response {
//		$services = [
//			['id'=>1,'name'=>'test'],
//			['id'=>2,'name'=>'Autobanden wissel'],
//		];
		$services = $this->api->get_services();
		error_log(print_r("services array in rest api",true));
		error_log(print_r($services,true));
		return $this->response($services);
	}
}






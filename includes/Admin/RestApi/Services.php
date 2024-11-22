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
		//call parent constructor
		parent::__construct();

		//instantiate of not already
		if ( !$this->api ) {
			$this->api = new Api();
		}
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

	public function services($request){
		if( !$this->api->is_authorized() ){
			return array();
		}
		$services = $this->api->auth->getServices();
		$services = array_values($services);
		return $services;
	}
}






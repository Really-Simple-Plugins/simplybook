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

class LoginUrl extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_login_url',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_login_url' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	public function get_login_url($request): WP_REST_Response {
		$url = $this->api->get_login_url();
		error_log(print_r("URL from rest api",true));
		error_log(print_r($url,true));
		$domain = $this->get_option('domain');
		return $this->response([
			'login_url' => $url,
			'url' => $domain,
		]);
	}
}






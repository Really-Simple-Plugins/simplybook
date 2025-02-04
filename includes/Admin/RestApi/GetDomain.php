<?php
namespace Simplybook\Admin\RestApi;

use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GetDomain extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_domain',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_domain' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	/**
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function get_domain($request): WP_REST_Response {
		error_log("retrieving domain");
		$domain = $this->get_option('domain');
		$company_login = $this->api->get_company_login();
		return $this->response([
			'domain' => "https://$company_login.secure.$domain/",
		]);
	}
}






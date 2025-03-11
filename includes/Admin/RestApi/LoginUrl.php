<?php
namespace Simplybook_old\Admin\RestApi;

use WP_REST_Response;
use Simplybook_old\Traits\Save;
use Simplybook_old\Traits\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated 3.0.0 Use SimplyBook\App\Endpoints\LoginUrlEndpoint instead:
 * {@see \SimplyBook\http\endpoints\LoginUrlEndpoint}
 */
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
		error_log("retrieving login URL");
		$login_url = $this->api->get_login_url();
		$domain = $this->get_option('domain');
		$company_login = $this->api->get_company_login();

		//if the login url returns empty, it's probably a too many attempts issue, we're probably already
		//logged in so we just return the url the user can use to go to the dashboard directly.
		if (empty($login_url)) {
			$login_url = "https://$company_login.secure.$domain";
		}
		return $this->response([
			'login_url' => $login_url,
			'url' => "https://$company_login.secure.$domain/v2",
		]);
	}
}
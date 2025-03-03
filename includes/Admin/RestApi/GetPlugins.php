<?php
/**
 * Note: these are not wordpress plugins, but simplybook plugins, with information if they're activated or not.
 *
 *
 */
namespace Simplybook_old\Admin\RestApi;
use Simplybook_old\Traits\Helper;
use Simplybook_old\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated 3.0.0 Use {@see \SimplyBook\App\Endpoints\RemotePluginsEndpoint} instead.
 */
class GetPlugins extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_plugins',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_plugins' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	/**
	 * Get a list of simplybook plugins
	 *
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function get_plugins($request): WP_REST_Response {
		$plugins = $this->api->get_plugins();
		return $this->response($plugins);
	}
}
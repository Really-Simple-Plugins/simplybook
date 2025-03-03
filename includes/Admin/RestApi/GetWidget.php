<?php
namespace Simplybook_old\Admin\RestApi;

use Simplybook_old\Frontend\Traits\Widget;
use Simplybook_old\Traits\Helper;
use Simplybook_old\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated 3.0.0 Use {@see \SimplyBook\App\Endpoints\WidgetEndpoint} instead
 */
class GetWidget extends RestApi {
	use Helper;
	use Save;
	use Widget;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_widget',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_widget_javascript' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	/**
	 * Get widget javascript
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function get_widget_javascript($request): WP_REST_Response {
		return $this->response([
			'widget' => $this->get_widget(),
		]);
	}
}
<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GetTasks extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_tasks',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_tasks' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	public function get_tasks($request): WP_REST_Response {
		return $this->response([
			'id' => 1,
			'text' => 'This is a task',
			'status' => 'open', // "open" | "urgent" | "premium" | "completed" | "dismissed"
			'type' => 'required', // "required" | "optional"
			'action' => [
				'text' => 'do something',
				'link' => 'settings/link',
			],
		]);
	}
}






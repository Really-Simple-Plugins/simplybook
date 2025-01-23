<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Admin\Tasks\Tasks;
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

		register_rest_route(
			'simplybook/v1',
			'dismiss_task',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'dismiss_task' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	public function get_tasks($request): WP_REST_Response {
		$tasks = new Tasks();
		return $this->response($tasks->get_tasks());
	}

	public function dismiss_task($request): WP_REST_Response {
		$data = $request->get_json_params();
		$tasks = new Tasks();
		error_log(print_r($data,true));
		$tasks->dismiss_task(sanitize_title($data['taskId']));
		return $this->response();
	}
}






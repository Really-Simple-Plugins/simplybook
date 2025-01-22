<?php
namespace Simplybook\Admin\Tasks;

use Simplybook\Traits\Helper;

defined( 'ABSPATH' ) or die( '' );

class Tasks {
	use Helper;
	public function __construct() {

	}

	/**
	 * Add initial tasks that are marked with is_initial_task by inserting an option
	 *
	 * @return void
	 */
	public function add_initial_tasks(): void {
		$tasks = $this->get_raw_tasks();
		foreach ( $tasks as $task ) {
			if ( isset($task['is_initial_task']) && $task['is_initial_task']) {
				update_option( 'simplybook_task_' . $task['id'], true, false );
			}
		}
	}

	/**
	 * Get raw tasks directly from the config
	 *
	 * @return array
	 */
	public function get_raw_tasks(): array {
		return require_once( SIMPLYBOOK_PATH . 'includes/Config/Tasks.php' );
	}

	/**
	 * Get tasks
	 *
	 * @return array
	 */
	public function get_tasks(): array {
		$tasks = $this->get_raw_tasks();

		foreach ($tasks as $key => $task) {
			if ( !get_option('simplybook_task_' . $task['id'], false)) {
				$task[$key]['status'] = 'completed';
			}
		}

		error_log(print_r($tasks, true));

		return $tasks;
	}
}

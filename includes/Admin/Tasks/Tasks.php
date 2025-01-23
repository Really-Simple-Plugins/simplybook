<?php
namespace Simplybook\Admin\Tasks;

use Simplybook\Traits\Helper;

defined( 'ABSPATH' ) or die( '' );
/**
 * Class Tasks
 * Task get added on activation, or on a server condition. If clientside condition is necessary is to be determined yet.
 *
 *
 * @package Simplybook\Admin\Tasks
 */

class Tasks {
	use Helper;
	public function __construct() {

	}

	/**
	 * Add initial tasks that are marked with ['condition']['type'] === activation by inserting an option
	 *
	 * @return void
	 */
	public function add_initial_tasks(): void {
		$tasks = $this->get_raw_tasks();
		foreach ( $tasks as $task ) {
			if ( isset($task['condition']['type']) && $task['condition']['type'] === 'activation' ) {
				update_option( 'simplybook_task_' . $task['id'], true, false );
			}
		}
	}

	public function validate_tasks(): void {
		$tasks = $this->get_raw_tasks();
		foreach ( $tasks as $task ) {
			if ( isset($task['condition']['type']) && $task['condition']['type'] === 'serverside' ) {
				if ( $this->validate_function( $task['condition']['function'] ) ) {
					$this->dismiss_task($task['id']);
				} else {
					$this->add_task($task['id']);
				}
			}
		}
	}

	/**
	 * Validate a function
	 *
	 * @param string $function
	 *
	 * @return bool
	 */
	private function validate_function( string $function ): bool {
		if ( !$this->user_can_manage() ) {
			return false;
		}

		if ( $function === '__true__' ) {
			return true;
		}

		if ( function_exists( $function )) {
			return $function();
		}

		//e.g. (new \Simplybook\Api\Api())->has_services()
		if ( preg_match('/\(new (.+)\)\-\>(.+)\(\)/', $function, $matches) ) {
			$class = $matches[1];
			$method = $matches[2];
			if ( class_exists($class) && method_exists($class, $method) ) {
				return (new $class)->$method();
			} else {
				$this->log( "Class or method does not exist: $class, $method" );
			}
		} else {
			$this->log( "Class or method does not exist: $function" );
		}
		return true;
	}
	/**
	 * Add a task
	 *
	 * @param string $id
	 *
	 * @return void
	 */
	public function add_task( string $id ): void {
		update_option( 'simplybook_task_' . sanitize_title($id), true, false );
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
	 * Dismiss a task
	 *
	 * @param string $id
	 *
	 * @return void
	 */
	public function dismiss_task( string $id ): void {

		delete_option( 'simplybook_task_' . sanitize_title($id) );
	}

	/**
	 * Get tasks
	 *
	 * @return array
	 */
	public function get_tasks(): array {
		$tasks = $this->get_raw_tasks();

		$completed_tasks = [];
		foreach ($tasks as $key => $task) {
			if ( !get_option('simplybook_task_' . $task['id'], false)) {
				//we want to have these completed ones at the end so remove them here, and store in separate aray
				unset($tasks[$key]);
				$task['status'] = 'completed';
				//as its completed, we can remove any action
				unset($task['action']);
				$completed_tasks[] = $task;
			}
		}

		//add completed tasks to end of array
		$tasks = array_merge($tasks, $completed_tasks);

		//move premium tasks to the end
		$premium_tasks = array_filter($tasks, function($task) {
			return $task['status'] === 'premium';
		});
		$tasks = array_filter($tasks, function($task) {
			return $task['status'] !== 'premium';
		});
		$tasks = array_merge($tasks, $premium_tasks);

		return $tasks;

	}
}

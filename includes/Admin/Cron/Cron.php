<?php
namespace Simplybook\Admin\Cron;

use Simplybook\Traits\Helper;

defined( 'ABSPATH' ) or die( '' );

class Cron {
	use Helper;
	public function __construct() {
		add_filter( 'cron_schedules', array($this, 'filter_cron_schedules') );
		add_action( 'plugins_loaded', array($this, 'schedule_cron' ) );

	}


	public function filter_cron_schedules( $schedules ) {
		$schedules['simplybook_daily']      = array(
			'interval' => DAY_IN_SECONDS,
			'display'  => __( 'Once every day' ),
		);
		return $schedules;
	}

	/**
	 * @return void
	 */
	public function schedule_cron(): void {
		if ( ! wp_next_scheduled( 'simplybook_daily' ) ) {
			wp_schedule_event( time(), 'simplybook_daily', 'simplybook_daily' );
		}
	}
}
















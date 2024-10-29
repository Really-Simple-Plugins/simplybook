<?php

namespace Simplybook\Admin;

use Simplybook\Admin\App\App;
use Simplybook\Admin\Capability\Capability;
use Simplybook\Traits\Admin\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Admin {
	use Helper;

	protected App $app;

	public function __construct() {
		// Instantiate the App class
		$this->app = new App();

		// Add action to register the admin menu
		add_action( 'admin_init', array( $this, 'maybe_run_activation' ) );

		$plugin = SIMPLYBOOK_PLUGIN;
		add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
	}

	/**
	 * Run activation hooks when on the settings page
	 * @hook admin_init
	 * @return void
	 */
	public function maybe_run_activation(): void {
		if ( ! get_option( 'simplybook_run_activation' ) ) {
			return;
		}

		Capability::add_capability( 'simplybook_manage' );
		delete_option( 'simplybook_run_activation' );
		do_action( 'simplybook_activation' );
	}

	/**
	 * Add settings and support link to the plugin page
	 *
	 * @param array $links
	 *
	 * @return array
	 */
	public function plugin_settings_link( array $links ): array {
		if ( ! $this->user_can_manage() ) {
			return $links;
		}

		$url           = $this->admin_url();
		$settings_link = '<a href="' . $url . '">' . __( 'Settings', 'simplybook' ) . '</a>';
		array_unshift( $links, $settings_link );

		//support
		$support = '<a rel="noopener noreferrer" target="_blank" href="https://wordpress.org/support/plugin/simplybook/">' . __( 'Support', 'simplybook' ) . '</a>';
		array_unshift( $links, $support );

		return $links;
	}
}

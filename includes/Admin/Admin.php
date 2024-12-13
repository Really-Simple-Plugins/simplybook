<?php

namespace Simplybook\Admin;

use Simplybook\Admin\App\App;
use Simplybook\Admin\Capability\Capability;
use Simplybook\Admin\RestApi\CompanyRegistration;
use Simplybook\Admin\RestApi\LoginUrl;
use Simplybook\Admin\RestApi\Onboarding;
use Simplybook\Admin\RestApi\Services;
use Simplybook\Admin\RestApi\Settings;
use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use Simplybook\Upgrades\Upgrades;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Admin {
	use Helper;

	protected App $app;

	public function __construct() {
        ( new Upgrades() );
        ( new Capability() );
        ( new Onboarding() );
        ( new LoginUrl() );
        ( new Services() );
        ( new Settings() );
		( new CompanyRegistration() );

        $this->app = new App();

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
		error_log("check activation option");
		if ( ! get_option( 'simplybook_run_activation' ) ) {
			return;
		}
		Capability::add_capability( 'simplybook_manage' );
		delete_option( 'simplybook_run_activation' );
		do_action( 'simplybook_activation' );

		// Flush rewrite rules to ensure the new routes are available
		add_action( 'shutdown', 'flush_rewrite_rules' );
		// Redirect to onboarding
		error_log("add onboarding hook");
	}

//  removing this, already handled in react
//	public function maybe_redirect_to_onboarding(): void {
//
//		if ( isset($_GET['page']) && $_GET['page'] === 'simplybook') {
//			return;
//		}
//
//		if (!get_transient('simplybook_onboarding_redirect')) {
//			return;
//		}
//
//		$api = new Api();
//		if ( $api->company_registration_complete() ) {
//			return;
//		}
//
//		//this is not the simplybook page, redirect.
//		error_log("do redirect");
//		delete_transient('simplybook_onboarding_redirect');
//		wp_safe_redirect( admin_url( 'admin.php?page=simplybook#onboarding/create-your-account' ) );
//		exit;
//	}

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

<?php

namespace Simplybook\Admin;

use Simplybook\Admin\App\App;
use Simplybook\Admin\Capability\Capability;
use Simplybook\Admin\RestApi\CompanyRegistration;
use Simplybook\Admin\RestApi\GetDomain;
use Simplybook\Admin\RestApi\GetTasks;
use Simplybook\Admin\RestApi\GetPlugins;
use Simplybook\Admin\RestApi\GetWidget;
use Simplybook\Admin\RestApi\LoginUrl;
use Simplybook\Admin\RestApi\Onboarding;
use Simplybook\Admin\RestApi\Services;
use Simplybook\Admin\RestApi\Providers;
use Simplybook\Admin\RestApi\Settings;
use Simplybook\Admin\RestApi\WaitForRegistrationCallback;
use Simplybook\Admin\RestApi\Dashboard;
use Simplybook\Admin\Tasks\Tasks;
use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use Simplybook\Upgrades\Upgrades;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Admin {
	use Helper;
	use Save;
	protected App $app;

	public function __construct() {
        ( new Upgrades() );
        ( new Capability() );
        ( new Onboarding() );
        ( new LoginUrl() );
        ( new Services() );
        ( new Providers() );
        ( new Settings() );
		( new CompanyRegistration() );
		( new WaitForRegistrationCallback() );
		( new GetWidget() );
		( new Dashboard() );
		( new GetTasks() );
		( new GetPlugins() );
		( new GetDomain() );

        $this->app = new App();

		add_action( 'admin_init', array( $this, 'maybe_run_activation' ) );
		add_action( 'admin_init', array( $this, 'maybe_redirect_to_dashboard' ) );
		$plugin = SIMPLYBOOK_PLUGIN;
		add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );

		add_action( 'simplybook_daily', array($this, 'update_tasks') );

		add_action('admin_init', array($this, 'maybe_reset_registration'));
	}

	/**
	 * Reset registration
	 */
	public function maybe_reset_registration(): void {
		if (isset($_GET['reset_registration']) && $_GET['reset_registration'] === 'true'){
			$api = new Api();
			$api->reset_registration();
		}
	}

	/**
	 * On a daily basis, update the task options
	 *
	 * @return void
	 */
	public function update_tasks() {
		$tasks = new Tasks();
		$tasks_data = $tasks->get_raw_tasks();


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

		$this->setup_defaults();

		// Flush rewrite rules to ensure the new routes are available
		add_action( 'shutdown', 'flush_rewrite_rules' );
		// Redirect to onboarding
		set_transient('simplybook_dashboard_redirect', true, 5 * MINUTE_IN_SECONDS );
	}

	/**
	 * Set up some defaults
	 * User does not have the capability yet, so bypass the default update_option method.
	 *
	 * @return void
	 */

	private function setup_defaults(): void {

		$user = wp_get_current_user();
		$options = get_option('simplybook_options', []);
		if ( empty($this->get_option('email') ) ) {
			$options['email'] = sanitize_email( $user->user_email );
		}
		if ( empty($this->get_option('company_name') ) ) {
			$options['company_name'] = get_bloginfo( 'name' );
		}
		if ( empty($this->get_option('country') ) ) {
			$options['country'] = $this->get_country_by_locale();
		}
		if ( empty($this->get_option('palette') ) ) {
			$options['palette'] = 'custom';
		}
		update_option('simplybook_options', $options);

		$tasks = new Tasks();
		$tasks->add_initial_tasks();
	}



	/**
	 * Get the country based on the locale
	 *
	 * @return string
	 */
	private function get_country_by_locale(): string {
		$locale = get_locale();
		$locale = explode('_', $locale);
		return strtoupper( $locale[1] );
	}

	/**
	 * Redirect to simplybook dashboard page on activation.
	 * React side will handle redirect to onboarding
	 *
	 * @return void
	 */
	public function maybe_redirect_to_dashboard(): void {

		if ( isset($_GET['page']) && $_GET['page'] === 'simplybook') {
			return;
		}

		if (!get_transient('simplybook_dashboard_redirect')) {
			return;
		}

		//this is not the simplybook page, redirect.
		error_log("do redirect");
		delete_transient('simplybook_dashboard_redirect');
		wp_safe_redirect( admin_url( 'admin.php?page=simplybook' ) );
		exit;
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

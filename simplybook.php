<?php
/**
    Plugin Name: Simplybook
    Plugin URI: https://help.simplybook.me/index.php/WordPress_plugn
    Description: SimplyBook.me plugin allows you to add the SimplyBook.me widget to your WordPress website.
    Tags: appointment, scheduling, booking, reservation system, meeting
    Author: SimplyBook Inc.
    Author URI: https://simplybook.me/
    Contributors: simplybook
    Requires at least: 6.0
    Tested up to: 6.6.2
    Version: 3.0.0
    Requires PHP: 7.4
    Text Domain: simplybook
    Domain Path: /languages
    License: GPLv2 or later
    License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

namespace Simplybook;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$cache = array();
define( 'SIMPLYBOOK_VERSION', '3.0.0' );
define( 'SIMPLYBOOK_PATH', plugin_dir_path( __FILE__ ) );
define( 'SIMPLYBOOK_URL', plugin_dir_url( __FILE__ ) );
define( 'SIMPLYBOOK_PLUGIN', plugin_basename( __FILE__ ) );

if ( !file_exists(__DIR__ . '/vendor/autoload.php')) {
    error_log("Simplybook plugin: Composer autoload file not found. Please run composer install in the plugin directory.");
    return;
}

// composer autoload
require_once __DIR__ . '/vendor/autoload.php';

use Simplybook\Frontend\Frontend;
use Simplybook\Admin\Admin;
$simplybook_cache = [];

if ( ! function_exists( 'simplybook_has_admin_access' ) ) {
    /**
     * Check if current request is authenticated, which is in case:
     * - user is logged in and has manage_options capability
     * - this is a REST API request and user is logged in
     * - this is a WPCLI request
     * - this is a cron request
     *
     * This ensures that auto updates can run, and cron jobs can complete.
     *
     * @return bool
     */
    function simplybook_has_admin_access(): bool
    {
	    //during activation, we need to allow access
	    if ( get_option('simplybook_run_activation') ) {
		    return true;
	    }
        $wpcli = defined( 'WP_CLI' ) && WP_CLI;
        return ( is_admin() && current_user_can('simplybook_manage') )
            || simplybook_is_logged_in_rest() || wp_doing_cron() || $wpcli;
    }
}

if ( ! function_exists( 'simplybook_is_logged_in_rest' ) ) {
    /**
     * Check if current request is authenticated, for a REST API request
     *
     * @return bool
     */
    function simplybook_is_logged_in_rest(): bool
    {
        $valid_request = isset( $_SERVER['REQUEST_URI'] ) && str_contains($_SERVER['REQUEST_URI'], '/simplybook/v');
        if ( ! $valid_request ) {
            return false;
        }

	    //if and the callback url is still active, we need to allow access so the simplybook callback can execute
	    $expires = get_option('simplybook_callback_url_expires' );
	    $callback_url = get_option('simplybook_callback_url', '' );
	    if ( $expires > time() && !empty( $callback_url ) && strpos( $_SERVER['REQUEST_URI'], 'company_registration/'.$callback_url ) !== false ) {
			return true;
	    }

        return is_user_logged_in() && current_user_can('simplybook_manage');
    }
}


if ( !function_exists( __NAMESPACE__ . '\simplybook_init' ) ) {
    /**
     * Plugin loader, runs on plugins_loaded to ensure we have access to all WP functions
     *
     * @return void
     */
    function simplybook_init(): void
    {
        if ( simplybook_has_admin_access() ){
			( new Admin() );
        }
        ( new Frontend() );
    }
    add_action( 'plugins_loaded', __NAMESPACE__ . '\simplybook_init', 9 );
}

if ( ! function_exists( __NAMESPACE__ . '\simplybook_activation' ) ) {
    /**
     * Run hooks on activation
     * @hook register_activation_hook
     * @return void
     */
    function simplybook_activation(): void
    {
		error_log("Add activation option and run hook");
        update_option( 'simplybook_run_activation', true, false );
        do_action( 'simplybook_activation' );
    }

    register_activation_hook( __FILE__, __NAMESPACE__ . '\simplybook_activation' );
}

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

// composer autoload
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/Traits/functions.php';

use Simplybook\Admin\Capability\Capability;
use Simplybook\Admin\RestApi\RestApi;
use Simplybook\Blocks\Blocks;
use Simplybook\Upgrades\Upgrades;
use Simplybook\Admin\Admin;

if ( !function_exists( __NAMESPACE__ . '\simplybook_init' ) ) {
    /**
     * Plugin loader, runs on plugins_loaded to ensure we have access to all WP functions
     *
     * @return void
     */
    function simplybook_init(): void
    {
        if ( simplybook_has_admin_access() ){
            ( new Upgrades() );
            ( new Admin() );
            ( new Capability() );
            ( new RestApi() );
        }
        ( new Blocks() );
    }
    add_action( 'plugins_loaded', __NAMESPACE__ . '\simplybook_init', 9 );
}

if ( ! function_exists( __NAMESPACE__ . '\burst_activation' ) ) {
    /**
     * Run hooks on activation
     * @hook register_activation_hook
     * @return void
     */
    function simplybook_activation(): void
    {
        update_option( 'simplybook_run_activation', true, false );
        do_action( 'burst_activation' );
    }

    register_activation_hook( __FILE__, __NAMESPACE__ . '\simplybook_activation' );
}

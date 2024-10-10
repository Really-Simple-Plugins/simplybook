<?php
/**
    Plugin Name: Simplybook
    Plugin URI: https://help.simplybook.me/index.php/WordPress_plugn
    Description: SimplyBook.me plugin allows you to add SimplyBook.me widget to your WordPress website.
    Tags: appointment, scheduling, booking, reservation system, meeting
    Author: SimplyBook Inc.
    Author URI: https://simplybook.me/
    Contributors: simplybook
    Requires at least: 6.0
    Tested up to: 6.6.2
    Stable tag: 2.1
    Version: 2.1
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

define( 'SIMPLYBOOK_VERSION', '2.1' );
define( 'SIMPLYBOOK_PATH', plugin_dir_path( __FILE__ ) );
define( 'SIMPLYBOOK_URL', plugin_dir_url( __FILE__ ) );
define( 'SIMPLYBOOK_PLUGIN', plugin_basename( __FILE__ ) );

$debug = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '#' . time() : '';
define( 'BURST_VERSION', '2.1' . $debug );

// composer autoload
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/Traits/functions.php';

use Simplybook\Upgrades\Upgrades;
use Simplybook\Admin\Admin;

if ( simplybook_has_admin_access() ){
    ( new Upgrades() );
    ( new Admin() );
}

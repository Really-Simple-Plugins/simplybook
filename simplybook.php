<?php
/**
 * @package SimplyBook.me - Booking and reservations calendar
 * @author Really Simple Plugins
 * @copyright 2025 Really Simple Plugins
 * @license GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name: SimplyBook.me - Booking and reservations calendar
 * Plugin URI: https://help.simplybook.me/index.php?title=WordPress_integration
 * Description: Simply add a booking calendar to your site to schedule bookings, reservations, appointments and to collect payments.
 * Version: 3.2.0
 * Requires at least: 6.6
 * Requires PHP: 7.4
 * Author: Really Simple Plugins
 * Author URI: https://really-simple-plugins.com
 * License: GPL v2 or later
 * Text Domain: simplybook
 * Domain Path: /assets/languages
 */

/**
 * Load the Jetpack packages autoloader.
 * @see https://packagist.org/packages/automattic/jetpack-autoloader
 */
require_once __DIR__ . '/vendor/autoload_packages.php';

// Boot the plugin.
$plugin = new \SimplyBook\Plugin();
$plugin->boot();
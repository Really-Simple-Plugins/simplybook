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
 * Version: 3.4.0
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
$plugin = new SimplyBook\Bootstrap\Plugin();
$plugin->boot();

// TEMPORARY: demo state for screenshots (NL14RSP2-422). Remove before release.
add_filter('simplybook_subscription_data', function (array $data): array {
    $data['subscription_name'] = 'Trial';
    $data['is_expired'] = true;
    $data['expire_in'] = -3;
    $data['limits'] = [
        ['key' => 'sheduler_limit', 'total' => 50, 'rest' => 0],
        ['key' => 'provider_limit', 'total' => 5, 'rest' => 0],
        ['key' => 'sms_limit', 'total' => 0, 'rest' => 0],
    ];
    return $data;
});

add_action('admin_init', function (): void {
    if (get_option('simplybook_demo_state_reset') === false) {
        delete_option('simplybook_subscription_data');
        update_option('simplybook_demo_state_reset', 1, false);
    }
});

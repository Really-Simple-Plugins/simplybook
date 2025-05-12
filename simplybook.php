<?php
/**
 * @package SimplyBook.me
 * @author Really Simple Plugins
 * @copyright 2025 Really Simple Plugins
 * @license GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name: SimplyBook.me
 * Plugin URI: https://help.simplybook.me/index.php/WordPress_plugn
 * Description: The SimplyBook.me plugin allows you to add the SimplyBook.me widget to your WordPress website.
 * Version: 3.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Really Simple Plugins
 * Author URI: https://really-simple-plugins.com
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
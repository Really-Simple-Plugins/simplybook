<?php

/*
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

/*
	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License
	as published by the Free Software Foundation; either version
	2 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	with this program. If not, visit: https://www.gnu.org/licenses/

	Copyright 2023 Monzilla Media. All rights reserved.
*/

if (!defined('ABSPATH')) die();

if (!defined('SimplybookMePl_PLUGIN_DIR'))    define('SimplybookMePl_PLUGIN_DIR', plugin_dir_path(__FILE__));
if (!defined('SimplybookMePl_PLUGIN_NAME'))    define('SimplybookMePl_PLUGIN_NAME', 'simplybook');
if (!defined('SimplybookMePl_CONTENT_DIR'))    define('SimplybookMePl_CONTENT_DIR', SimplybookMePl_PLUGIN_DIR . 'content/');
if (!defined('SimplybookMePl_TEMPLATE_DIR'))    define('SimplybookMePl_TEMPLATE_DIR', SimplybookMePl_CONTENT_DIR . 'templates/');
if (!defined('SimplybookMePl_GAP_FILE'))    define('SimplybookMePl_GAP_FILE',    plugin_basename(__FILE__));

include SimplybookMePl_PLUGIN_DIR . 'content/class/Exception.php';
require_once SimplybookMePl_CONTENT_DIR . 'widget.php';

if (!class_exists('SimplybookMePl_Main')) {
    class SimplybookMePl_Main {

        public function __construct()
        {
            $this->_initActions();
        }

        private function _initActions()
        {
            // Add admin menu
            add_action('admin_menu', array($this, 'adminMenu'));

            // Add settings links in plugin list
            add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'addPluginLink'));

            // Add shortcode for simplybook widget (only div without script)
            add_shortcode('simplybook_widget', array($this, 'addWidget'));

            // Add script to page
            //add_action('wp', array($this, 'widgetCode'));

            // AJAX action for previewing the widget
            add_action('wp_ajax_sb_preview_widget', array($this, 'previewWidget'));
            add_action('wp_ajax_nopriv_sb_preview_widget', array($this, 'previewWidget'));

            //add_action( 'admin_init', array($this, 'addHeader') );
            add_action('admin_head', array($this, 'onAdminHead'));
            add_action( 'init', array($this, 'onWpInit') );

            add_action( 'rest_api_init', array($this, 'registerApiRoutes') );

            add_action( 'enqueue_block_editor_assets', array($this, 'onBlockEditorAssets') );

            //$this->addHeader();

            // Load custom translation
            //add_action('plugins_loaded', array($this, 'simplybookLoadCustomTranslation'));

        }

        public function registerApiRoutes() {
            include_once SimplybookMePl_PLUGIN_DIR . 'vendor/autoload.php';
            include_once SimplybookMePl_PLUGIN_DIR . 'content/class/Exception.php';
            include_once SimplybookMePl_PLUGIN_DIR . 'content/class/Api.php';
            include_once SimplybookMePl_PLUGIN_DIR . 'content/class/InternalApi.php';

            $internalApi = new SimplybookMePl_InternalApi();

            register_rest_route( 'simplybook', '/is-authorized', array(
                'methods' => 'GET',
                'callback' => array($internalApi, 'isAuthorized'),
            ));

            register_rest_route( 'simplybook', '/locations', array(
                'methods' => 'GET',
                'callback' => array($internalApi, 'getLocations'),
            ));

            register_rest_route( 'simplybook', '/services', array(
                'methods' => 'GET',
                'callback' => array($internalApi, 'getServices'),
            ));

            register_rest_route( 'simplybook', '/categories', array(
                'methods' => 'GET',
                'callback' => array($internalApi, 'getCategories'),
            ));

            register_rest_route( 'simplybook', '/providers', array(
                'methods' => 'GET',
                'callback' => array($internalApi, 'getProviders'),
            ));
        }


        public function onWpInit(){
            $this->registerBlockType();
        }

        public function onAdminHead(){
//            wp_register_script('simplybookMePl_admin_editors', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/admin.editors.js'), array(), '1.0.0');
//            wp_enqueue_script('simplybookMePl_admin_editors');
//
//            wp_register_script('simplybookMePl_admin_editors', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/simplybook-widget/build/index.js'), array(), '1.0.0');
//            wp_enqueue_script('simplybookMePl_admin_editors');

//            wp_register_style('simplybookMePl_admin_editors', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/css/admin.editors.css'), array(), '1.0.0');
//            wp_enqueue_style('simplybookMePl_admin_editors');
        }


        public function onBlockEditorAssets()
        {
            $dir = dirname( __FILE__ );
            $script_asset_path = "$dir/content/js/simplybook-widget/build/index.asset.php";

            if ( ! file_exists( $script_asset_path ) ) {
                throw new Exception(
                    'You need to run `npm start` or `npm run build` for the block first.'
                );
            }
            $script_asset = require( $script_asset_path );

            wp_enqueue_script(
                'simplybook-widget-block-editor',
                plugins_url( 'content/js/simplybook-widget/build/index.js', __FILE__ ),
                $script_asset['dependencies'],
                filemtime( plugin_dir_path( __FILE__ ) . 'content/js/simplybook-widget/build/index.js' )
            );

            //add nonce param to script
            wp_localize_script( 'simplybook-widget-block-editor', 'simplybookData', array(
                'nonce' => SimplybookMePl_NonceProtect::getNonce(),
            ));

            //add widget.js script
            wp_register_script('simplybookMePl_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
            wp_enqueue_script('simplybookMePl_widget_scripts');

            wp_register_style('simplybookMePl_widget_styles', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/simplybook-widget/build/index.css'));
            wp_enqueue_style('simplybookMePl_widget_styles');
        }

//        public function addHeader(){
//           //header( "X-Test: test" );
//        }

        public function adminMenu()
        {
            wp_register_style('simplybookMePl_dashboard_icon', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/css/simplybook-fonts.css'));
            wp_enqueue_style('simplybookMePl_dashboard_icon');

            add_menu_page(
                'SimplyBook integration',
                'SimplyBook integration',
                'manage_options',
                'simplybook-integration',
                array($this, 'sbAdminPage'),
                'dashicons-simplybook',
                200
            );
        }

        public function sbAdminPage(){
            try {
                require_once SimplybookMePl_CONTENT_DIR . 'admin.php';
            } catch (SimplybookMePl_Exception $e) {
                echo wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
            }
        }

        public function addPluginLink($links)
        { // add settings links in plugin list
            $mylinks = array(
                '<a href="' . admin_url('admin.php?page=simplybook-integration') . '">' . __("Settings", 'simplybook') . '</a>'
            );
            return array_merge($links, $mylinks);
        }

        public function addWidget($atts = [], $content = null, $tag = '')
        {
            wp_register_script('simplybookMePl_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
            wp_enqueue_script('simplybookMePl_widget_scripts');

            // normalize attribute keys, lowercase
            $atts = array_change_key_case( (array) $atts, CASE_LOWER );

            $allowedAtts = array('location', 'category', 'provider', 'service');

            foreach ($atts as $key => $value) {
                if (!in_array($key, $allowedAtts)) {
                    unset($atts[$key]);
                }
            }
            $content = '<div id="sbw_z0hg2i"></div>';
            try {
                $script = simplybookMePl_Widget($atts);
            } catch (SimplybookMePl_Exception $e) {
                $content .= wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
                return $content;
            }
            $content .= sprintf('<script type="text/javascript">%s</script>', $script);
            return $content;
        }

//        public function widgetCode()
//        {
//            global $post;
//            if (is_singular() && has_shortcode($post->post_content, 'simplybook_widget')) {
//                try {
//                    $script = '';
//                    require_once SimplybookMePl_CONTENT_DIR . 'widget.php';
//                } catch (SimplybookMePl_Exception $e) {
//                    echo wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
//                }
//
//                wp_add_inline_script('jquery', $script);
//            }
//        }


        public function previewWidget()
        {
            try {
                $script = simplybookMePl_Widget();
            } catch (SimplybookMePl_Exception $e) {
                wp_send_json(array(
                    'html' => "<div class='error'><p>" . $e->getMessage() . "</p></div>",
                ));
                return;
            }

            //add script to page and div with widget
            $content = '<script>' . $script . '</script>';
            $content .= '<div id="sbw_z0hg2i"></div>';

            wp_send_json(array(
                'html' => $content,
            ));
            wp_die();
        }

        public function registerBlockType() {
            if ( ! function_exists( 'register_block_type' ) ) {
                // Block editor is not available.
                return;
            }

            register_block_type( 'simplybook/widget', array(
                'title' => 'Simplybook Widget',
                'icon' => 'simplybook',
                'category' => 'widgets',
                'render_callback' => array($this, 'addWidgetBlock'),
                'attributes' => array(
                    'location' => array(
                        'type' => 'integer',
                        'default' => 0
                    ),
                    'category' => array(
                        'type' => 'integer',
                        'default' => 0
                    ),
                    'provider' => array(
                        'type' => 'string', //any provide id = any
                        'default' => 0
                    ),
                    'service' => array(
                        'type' => 'integer',
                        'default' => 0
                    ),
                ),
            ));
        }

        public function addWidgetBlock($attributes)
        {
            $atts = array_change_key_case( (array) $attributes, CASE_LOWER );

            $allowedAtts = array('location', 'category', 'provider', 'service');

            foreach ($atts as $key => $value) {
                if (!in_array($key, $allowedAtts)) {
                    unset($atts[$key]);
                }
            }
            $content = '[simplybook_widget';

            foreach ($atts as $key => $value) {
                if($key == 'provider' && $value == 'any'){
                    $content .= ' ' . $key . '=any';
                } else {
                    $content .= ' ' . $key . '="' . intval($value) . '"';
                }
            }

            $content .= ']';

            return $content;
        }


//    public function simplybookLoadCustomTranslation() {
//        $currentLocale = get_locale();
//        $pluginLanguagesDir = SimplybookMePl_PLUGIN_DIR . 'languages/';
//        $moFile = $pluginLanguagesDir . 'simplybook-' . $currentLocale . '.mo';
//
//        if (file_exists($moFile)) {
//            load_textdomain('simplybook', $moFile);
//        } else {
//            //load_plugin_textdomain('simplybook', false, $pluginLanguagesDir);
//            $moFile = SimplybookMePl_PLUGIN_DIR . 'languages/simplybook-en_US.mo';
//            load_textdomain('simplybook', $moFile);
//
//        }
//    }

//        public function simplybookLoadCustomTranslation()
//        {
//            $locale = apply_filters('gap_locale', get_locale(), SimplybookMePl_PLUGIN_NAME);
//            $dir = trailingslashit(WP_LANG_DIR);
//            $file = SimplybookMePl_PLUGIN_NAME . '-' . $locale . '.mo';
//            $path1 = $dir . $file;
//            $path2 = $dir . SimplybookMePl_PLUGIN_NAME . '/' . $file;
//            $path3 = $dir . 'plugins/' . $file;
//            $path4 = $dir . 'plugins/' . SimplybookMePl_PLUGIN_NAME . '/' . $file;
//
//            $paths = array($path1, $path2, $path3, $path4);
//
//            foreach ($paths as $path) {
//                if ($loaded = load_textdomain(SimplybookMePl_PLUGIN_NAME, $path)) {
//                    return $loaded;
//                } else {
//                    return load_plugin_textdomain(SimplybookMePl_PLUGIN_NAME, false, dirname(SimplybookMePl_GAP_FILE) . '/languages/');
//                }
//            }
//        }
    }

    $GLOBALS['Simplybook'] = $simplybook = new SimplybookMePl_Main();
}
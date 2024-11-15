<?php
namespace Simplybook\Frontend\Blocks;
use Simplybook\Api\InternalApi;
use Simplybook\Frontend\Traits\Widget;
use Simplybook\Traits\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Blocks {
    use Helper;
    use Widget;
    public function __construct()
    {
        error_log("register block type");

        if ( ! function_exists( 'register_block_type' ) ) {
            // Block editor is not available.
            return;
        }
        add_action('enqueue_block_editor_assets', array( $this, 'editor_assets' ) );

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

        add_action( 'rest_api_init', array( $this, 'register_rest_route') );
    }

    /**
     * Register the REST route
     */

    public function register_rest_route(): void
    {
        $internalApi = new InternalApi();
        register_rest_route( 'simplybook', '/is-authorized', array(
            'methods' => 'GET',
            'callback' => array($internalApi, 'isAuthorized'),
            'permission_callback' => function () {
                return $this->user_can_manage();
            },
        ));

        register_rest_route( 'simplybook', '/locations', array(
            'methods' => 'GET',
            'callback' => array($internalApi, 'getLocations'),
            'permission_callback' => function () {
                return $this->user_can_manage();
            },
        ));

        register_rest_route( 'simplybook', '/services', array(
            'methods' => 'GET',
            'callback' => array($internalApi, 'getServices'),
            'permission_callback' => function () {
                return $this->user_can_manage();
            },
        ));

        register_rest_route( 'simplybook', '/categories', array(
            'methods' => 'GET',
            'callback' => array($internalApi, 'getCategories'),
            'permission_callback' => function () {
                return $this->user_can_manage();
            },
        ));

        register_rest_route( 'simplybook', '/providers', array(
            'methods' => 'GET',
            'callback' => array($internalApi, 'getProviders'),
            'permission_callback' => function () {
                return $this->user_can_manage();
            },
        ));
    }

    /**
     * Enqueue Gutenberg block assets for backend editor.
     *
     * @since 3.0.0
     */

    public function editor_assets(): void
    {
        $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
        wp_enqueue_script(
            'simplybook-block',
            plugins_url( 'build/index.js',  __FILE__ ),
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        wp_localize_script(
            'simplybook-block',
            'simplybook',
            array(
                'rest_url' => get_rest_url(),
                'preview' => plugins_url( 'img/preview.png',  __FILE__ ),
                'nonce' => wp_create_nonce( 'simplybook_nonce' ),
            )
        );

        //add widget.js script
        wp_register_script('simplybookMePl_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
        wp_enqueue_script('simplybookMePl_widget_scripts');

        wp_register_style('simplybookMePl_widget_styles', plugins_url( 'build/index.css',  __FILE__ ) );
        wp_enqueue_style('simplybookMePl_widget_styles');

        wp_set_script_translations( 'simplybook-block', 'simplybook' );
    }

    public function addWidget($atts = [], $content = null, $tag = '')
    {
        wp_register_script('simplybook_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
        wp_enqueue_script('simplybook_widget_scripts');

        // normalize attribute keys, lowercase
        $atts = array_change_key_case( (array) $atts, CASE_LOWER );

        $allowedAtts = array('location', 'category', 'provider', 'service');

        foreach ($atts as $key => $value) {
            if (!in_array($key, $allowedAtts)) {
                unset($atts[$key]);
            }
        }
        $content = '<div id="sbw_z0hg2i"></div>';
        $script = $this->load_widget($atts);

        $content .= sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }

}







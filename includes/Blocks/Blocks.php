<?php
namespace Simplybook\Blocks;
use Simplybook\Traits\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Blocks {
    use Helper;

    public function __construct()
    {
        add_action('enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
        register_block_type('simplybook/embed', array(
            'render_callback' => array( $this, 'render_document_block' ),
        ));
        add_action( 'rest_api_init', array( $this, 'register_rest_route') );
    }

    /**
     * Register the REST route
     */

    public function register_rest_route(): void
    {
        register_rest_route(
            'simplybook/v1',
            'embed',
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get_embed_data' ),
                'permission_callback' => function () {
                    return $this->user_can_manage();
                },
            )
        );
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
                'user_can_unfiltered_html' => current_user_can('unfiltered_html'),
            )
        );

        wp_set_script_translations( 'simplybook-block', 'simplybook' );


        //old code

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

    /**
     * Get the data for the embed
     *
     * @return array
     */
    public function get_embed_data(): array
    {
        $html = 'TEST';
        $data = [];
        $data['html'] = $html;
        return $data;
    }

    /**
     * Handles the front end rendering of the simplybook block
     *
     * @param $attributes
     * @param $content
     * @return string
     */
    public function render_document_block($attributes, $content): string {
        $data = $this->get_embed_data();
        return $data['html'];
    }
}







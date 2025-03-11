<?php namespace SimplyBook\Controllers;

use SimplyBook\App;
use Simplybook_old\Traits\Helper;
use Simplybook_old\Api\InternalApi;
use Simplybook_old\Frontend\Traits\Widget;
use SimplyBook\Interfaces\ControllerInterface;

// todo - START- registering block did not work if all the block files are not
// in the same folder. WHY?!
class BlockController implements ControllerInterface
{
    use Helper;
    use Widget;

    public function register()
    {
        if (!function_exists('register_block_type')) {
            // Block editor is not available.
            return;
        }

        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
        add_action('init', [$this, 'registerBlockType']);
    }

    /**
     * Register the SimplyBook Widget block
     */
    public function registerBlockType()
    {
        register_block_type('simplybook/widget', [
            'title' => 'SimplyBook Widget',
            'icon' => 'simplybook',
            'category' => 'widgets',
            'render_callback' => [$this, 'addWidgetBlock'],
            'attributes' => [
                'location' => [
                    'type' => 'integer',
                    'default' => 0
                ],
                'category' => [
                    'type' => 'integer',
                    'default' => 0
                ],
                'provider' => [
                    'type' => 'string', //any provide id = any
                    'default' => 'any'
                ],
                'service' => [
                    'type' => 'integer',
                    'default' => 0
                ],
            ],
        ]);
    }

    /**
     * Enqueue the block editor assets
     */
    public function enqueueBlockEditorAssets()
    {
        $assetsData = include(App::env('plugin.assets_path') . '/block/build/index.asset.php');
        $indexJs = App::env('plugin.assets_url') . 'block/build/index.js';
        $indexCss = App::env('plugin.assets_url') . 'block/build/index.css';
        $preview = App::env('plugin.assets_url') . '/img/preview.png';

        wp_enqueue_script(
            'simplybook-block',
            $indexJs,
            ($assetsData['dependencies'] ?? []),
            ($assetsData['version'] ?? ''),
            true
        );

        wp_localize_script(
            'simplybook-block',
            'simplybook',
            [
                'rest_url' => get_rest_url(),
                'preview' => $preview,
                'nonce' => wp_create_nonce('simplybook_nonce'),
            ]
        );

        //add widget.js script
        wp_enqueue_script('simplybookMePl_widget_scripts', App::env('simplybook.widget_script_url'), [], App::env('simplybook.widget_script_version'));
        wp_enqueue_script('simplybookMePl_widget_scripts');

        wp_register_style('simplybookMePl_widget_styles', $indexCss);
        wp_enqueue_style('simplybookMePl_widget_styles');

        wp_set_script_translations('simplybook-block', 'simplybook');
    }

    /**
     * Render the SimplyBook Widget block when the block is displayed on the
     * front-end
     */
    public function addWidgetBlock(array $attributes = []): string
    {
        return '[simplybook_widget' . $this->attributesToString($attributes) . ']';
    }

    /**
     * Convert the attributes array to a string to be used in a shortcode
     */
    private function attributesToString(array $attributes): string
    {
        $result = '';
        foreach ($attributes as $key => $value) {
            $result .= ' ' . sanitize_text_field($key) . '="' . sanitize_text_field($value) . '"';
        }
        return $result;
    }
}
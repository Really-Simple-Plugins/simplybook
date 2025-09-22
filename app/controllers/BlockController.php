<?php namespace SimplyBook\Controllers;

use Elementor\Widgets_Manager;
use SimplyBook\App;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Widgets\ElementorWidget;

class BlockController implements ControllerInterface
{
    public function register()
    {
        if (!function_exists('register_block_type')) {
            // Block editor is not available.
            return;
        }

        add_action('enqueue_block_editor_assets', [$this, 'enqueueGutenbergBlockEditorAssets']);
        add_action('init', [$this, 'registerGutenbergBlockType'], 20);
        add_action('simplybook_activation', [$this, 'registerGutenbergBlockType']); // For auto-installation purposes

        add_action('elementor/widgets/register', [$this, 'registerElementorWidget']);
    }

    /**
     * Configure Gutenberg block with attributes and render callback.
     * @since 3.3.0 Added usage of register_block_type_from_metadata for better
     * compatibility with auto-installation.
     */
    public function registerGutenbergBlockType(): void
    {
        // Check if the block is already registered to prevent duplicate registration
        if (class_exists('\WP_Block_Type_Registry') && \WP_Block_Type_Registry::get_instance()->is_registered('simplybook/widget')) {
			return;
        }

	    $blockMetaData = App::env('plugin.assets_path') . '/block/build/block.json';
	    if ( file_exists( $blockMetaData ) === false ) {
		    $this->registerGutenbergBlockTypeManually();
		    return;
	    }

        register_block_type_from_metadata($blockMetaData, [
            'render_callback' => [$this, 'renderGutenbergWidgetBlock'],
	        // Overwrite the .json entry to support translations.
            'description' => esc_html__('A widget for Simplybook.me', 'simplybook'),
        ]);
    }

    /**
     * Manually configure Gutenberg block without the use of the block.json file.
     * @since 3.3.0 added as a fallback method for {@see registerGutenbergBlockType}
     */
    private function registerGutenbergBlockTypeManually(): void
    {
        register_block_type('simplybook/widget', [
            'title' => 'SimplyBook.me Widget',
            'icon' => 'simplybook',
            'category' => 'widgets',
            'render_callback' => [$this, 'renderGutenbergWidgetBlock'],
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
                    'type' => 'string', // Provider ID can be a sting like "any"
                    'default' => '0'
                ],
                'service' => [
                    'type' => 'integer',
                    'default' => 0
                ],
            ],
        ]);
    }

    /**
     * Load scripts and styles for Gutenberg editor.
     */
    public function enqueueGutenbergBlockEditorAssets()
    {
        // Ensure the block is registered before enqueuing assets
        if (class_exists('\WP_Block_Type_Registry') && !\WP_Block_Type_Registry::get_instance()->is_registered('simplybook/widget')) {
            $this->registerGutenbergBlockType();
        }

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
                'ajax_url' => admin_url('admin-ajax.php'),
                'rest_url' => get_rest_url(),
                'preview' => $preview,
                'nonce' => wp_create_nonce('simplybook_nonce'),
                'x_wp_nonce' => wp_create_nonce('wp_rest'),
                'rest_namespace' => App::env('http.namespace'),
                'rest_version' => App::env('http.version'),
                'site_url' => site_url(),
                'dashboard_url' => App::env('plugin.dashboard_url'),
                'assets_url' => App::env('plugin.assets_url'),
                'debug' => defined( 'SIMPLYBOOK_DEBUG' ) && SIMPLYBOOK_DEBUG,
            ]
        );

        // Add widget.js script in the header of the page. We need it to be
        // Loaded as soon as possible, as our widgets are dependent on it.
        wp_enqueue_script('simplybookMePl_widget_scripts', App::env('simplybook.widget_script_url'), [], App::env('simplybook.widget_script_version'), false);

        wp_register_style('simplybookMePl_widget_styles', $indexCss, [], App::env('plugin.version'));
        wp_enqueue_style('simplybookMePl_widget_styles');

        wp_set_script_translations('simplybook-block', 'simplybook');
    }

    /**
     * Convert Gutenberg block to shortcode output. Filters empty values.
     *
     * @since 3.1.1 No longer filter out 'any', as this is a valid value for the
     * feature: "Any Employee selector" (/v2/management/#plugins/any_unit/)
     */
    public function renderGutenbergWidgetBlock(array $attributes = []): string
    {
        $attributes = array_filter($attributes, function ($value) {
            return !empty($value);
        });

        return '[simplybook_widget' . $this->attributesToString($attributes) . ']';
    }

    /**
     * Format attributes as shortcode parameters.
     */
    private function attributesToString(array $attributes): string
    {
        $result = '';
        foreach ($attributes as $key => $value) {
            $result .= ' ' . sanitize_text_field($key) . '="' . sanitize_text_field($value) . '"';
        }
        return $result;
    }

    /**
     * Add SimplyBook widget to Elementor if available.
     *
     * @param Widgets_Manager $widgetsManager Elementor widgets manager.
     */
    public function registerElementorWidget(Widgets_Manager $widgetsManager): void
    {
	    $widgetsManager->register(new ElementorWidget());
    }
}
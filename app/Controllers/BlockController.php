<?php

namespace SimplyBook\Controllers;

use Elementor\Widgets_Manager;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\ElementorWidget;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class BlockController implements ControllerInterface
{
    private const BLOCK_EDITOR_SCRIPT_HANDLE = 'simplybook-widget-editor-script';
    private const BLOCK_EDITOR_STYLE_HANDLE = 'simplybook-widget-editor-style';

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    public function register(): void
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

        $blockMetaData = $this->env->getString('plugin.assets_path') . '/block/build/block.json';
        if (file_exists($blockMetaData) === false) {
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
        $assetsDataPath = $this->env->getString('plugin.assets_path') . '/block/build/index.asset.php';
        $assetsData = file_exists($assetsDataPath) ? include($assetsDataPath) : [];

        wp_register_script(
            self::BLOCK_EDITOR_SCRIPT_HANDLE,
            $this->env->getUrl('plugin.assets_url') . 'block/build/index.js',
            ($assetsData['dependencies'] ?? []),
            ($assetsData['version'] ?? ''),
            true
        );

        wp_register_style(
            self::BLOCK_EDITOR_STYLE_HANDLE,
            $this->env->getUrl('plugin.assets_url') . 'block/build/index.css',
            [],
            $this->env->getString('plugin.version')
        );

        register_block_type('simplybook/widget', [
            'title' => 'SimplyBook.me Widget',
            'icon' => 'simplybook',
            'category' => 'widgets',
            'api_version' => '3',
            'editor_script' => self::BLOCK_EDITOR_SCRIPT_HANDLE,
            'editor_style' => self::BLOCK_EDITOR_STYLE_HANDLE,
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
     * Configure the Gutenberg block editor assets. If the widget is not yet
     * registered in the current context, register and enqueue it before adding
     * localized data and translations. This supports auto-installation.
     */
    public function enqueueGutenbergBlockEditorAssets(): void
    {
        $registeredLate = false;

        if (
            class_exists('\WP_Block_Type_Registry')
            && !\WP_Block_Type_Registry::get_instance()->is_registered('simplybook/widget')
        ) {
            $this->registerGutenbergBlockType();
            // WordPress already ran its registered block asset enqueue pass.
            $registeredLate = true;
        }

        wp_localize_script(
            self::BLOCK_EDITOR_SCRIPT_HANDLE,
            'simplybook',
            [
                'ajax_url' => admin_url('admin-ajax.php'),
                'rest_url' => get_rest_url(),
                'nonce' => wp_create_nonce('simplybook_nonce'),
                'x_wp_nonce' => wp_create_nonce('wp_rest'),
                'rest_namespace' => $this->env->getString('plugin.namespace'),
                'rest_version' => $this->env->getString('http.version'),
                'site_url' => site_url(),
                'dashboard_url' => $this->env->getUrl('plugin.dashboard_url'),
                'assets_url' => $this->env->getUrl('plugin.assets_url'),
                'debug' => defined('SIMPLYBOOK_DEBUG') && SIMPLYBOOK_DEBUG,
            ]
        );

        wp_set_script_translations(self::BLOCK_EDITOR_SCRIPT_HANDLE, 'simplybook');

        if ($registeredLate) {
            wp_enqueue_script(self::BLOCK_EDITOR_SCRIPT_HANDLE);
            wp_enqueue_style(self::BLOCK_EDITOR_STYLE_HANDLE);
        }
    }

    /**
     * Convert Gutenberg block to shortcode output. Filters empty values.
     *
     * @since 3.1.1 No longer filter out 'any', as this is a valid value for the
     * feature: "Any Employee selector" (/v2/management?hash=plugins/any_unit/)
     *
     * @since 3.2.3 Added do_shortcode for FSE compatibility. FSE requires
     * an explicit do_shortcode() call to render shortcode content.
     * In other contexts, this call isn’t necessary, but it’s harmless. Once a
     * shortcode is rendered, the resulting content no longer contains a "[", so
     * subsequent calls simply return the already-rendered output.
     */
    public function renderGutenbergWidgetBlock(array $attributes = []): string
    {
        $attributes = array_filter($attributes, function ($value) {
            return !empty($value);
        });

        $shortcode = '[simplybook_widget' . $this->attributesToString($attributes) . ']';

        // Process the shortcode explicitly for FSE compatibility
        return do_shortcode($shortcode);
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

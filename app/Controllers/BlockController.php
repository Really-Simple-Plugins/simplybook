<?php

namespace SimplyBook\Controllers;

use WP_Block_Type_Registry;
use Elementor\Widgets_Manager;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\ElementorWidget;
use SimplyBook\Support\Builders\WidgetShortcodeBuilder;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class BlockController implements ControllerInterface
{
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

        // For auto-installation purposes
        add_action('simplybook_activation', [$this, 'registerGutenbergBlockType']);

        add_action('elementor/widgets/register', [$this, 'registerElementorWidget']);
    }

    /**
     * Configure the Gutenberg block from its metadata.
     */
    public function registerGutenbergBlockType(): void
    {
        $registry = class_exists('WP_Block_Type_Registry') ? WP_Block_Type_Registry::get_instance() : null;
        if ($registry && $registry->is_registered('simplybook/widget')) {
            return;
        }

        $blockMetaData = $this->env->getString('plugin.assets_path') . '/block/build/block.json';
        if (file_exists($blockMetaData) === false) {
            return;
        }

        $blockType = register_block_type($blockMetaData, [
            'render_callback' => [$this, 'renderGutenbergWidgetBlock'],
            // Overwrite the .json entry to support translations.
            'description' => esc_html__('A widget for Simplybook.me', 'simplybook'),
        ]);

        if ($blockType) {
            $this->setEditorStyleVersion($blockType);
        }
    }

    /**
     * Use the generated build version to invalidate cached editor styles.
     */
    private function setEditorStyleVersion(\WP_Block_Type $blockType): void
    {
        $assetDataPath = $this->env->getString('plugin.assets_path') . '/block/build/index.asset.php';
        if (!file_exists($assetDataPath)) {
            return;
        }

        $assetData = (array) include $assetDataPath;
        $version = ($assetData['version'] ?? null);
        if (!is_string($version)) {
            return;
        }

        foreach ($blockType->editor_style_handles as $styleHandle) {
            $style = (wp_styles()->registered[$styleHandle] ?? null);
            if ($style) {
                $style->ver = $version;
            }
        }
    }

    /**
     * Configure the Gutenberg block editor assets.
     */
    public function enqueueGutenbergBlockEditorAssets(): void
    {
        $blockType = \WP_Block_Type_Registry::get_instance()->get_registered('simplybook/widget');
        $registeredLate = false;

        if (!$blockType) {
            $this->registerGutenbergBlockType();
            $blockType = \WP_Block_Type_Registry::get_instance()->get_registered('simplybook/widget');
            $registeredLate = true;
        }

        if (!$blockType || empty($blockType->editor_script_handles)) {
            return;
        }

        $editorScriptHandle = $blockType->editor_script_handles[0];

        wp_localize_script(
            $editorScriptHandle,
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
                'preview_url' => add_query_arg(
                    [
                        'action' => BlockPreviewController::ACTION,
                        '_wpnonce' => wp_create_nonce(BlockPreviewController::ACTION),
                    ],
                    admin_url('admin-post.php')
                ),
                'debug' => defined('SIMPLYBOOK_DEBUG') && SIMPLYBOOK_DEBUG,
            ]
        );

        wp_set_script_translations($editorScriptHandle, 'simplybook');

        if ($registeredLate) {
            foreach ($blockType->editor_script_handles as $scriptHandle) {
                wp_enqueue_script($scriptHandle);
            }

            foreach ($blockType->editor_style_handles as $styleHandle) {
                wp_enqueue_style($styleHandle);
            }
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
        // Process the shortcode explicitly for FSE compatibility
        return do_shortcode((new WidgetShortcodeBuilder($attributes))->build());
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

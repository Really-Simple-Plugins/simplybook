<?php

namespace SimplyBook\Controllers\Gutenberg;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;
use SimplyBook\Support\Widgets\GutenbergWidget;
use WP_Block_Type;
use WP_Block_Type_Registry;

class GutenbergController implements ControllerInterface
{
    private EnvironmentConfig $env;
    private GutenbergWidget $widget;

    public function __construct(EnvironmentConfig $env, GutenbergWidget $widget)
    {
        $this->env = $env;
        $this->widget = $widget;
    }

    public function register(): void
    {
        if (!function_exists('register_block_type')) {
            // Block editor is not available.
            return;
        }

        add_action('enqueue_block_editor_assets', [$this, 'enqueueEditorAssets']);
        // Register after WordPress has initialized its block types.
        add_action('init', [$this, 'registerBlockType'], 20);

        // For auto-installation purposes.
        add_action('simplybook_activation', [$this, 'registerBlockType']);
    }

    /**
     * Configure the Gutenberg block from its metadata.
     */
    public function registerBlockType(): void
    {
        $registry = class_exists(WP_Block_Type_Registry::class) ? WP_Block_Type_Registry::get_instance() : null;
        if ($registry && $registry->is_registered(GutenbergWidget::BLOCK_NAME)) {
            return;
        }

        $blockMetaData = $this->env->getString('plugin.assets_path') . '/block/build/block.json';
        if (file_exists($blockMetaData) === false) {
            return;
        }

        $blockType = register_block_type($blockMetaData, [
            'render_callback' => [$this->widget, 'render'],
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
    private function setEditorStyleVersion(WP_Block_Type $blockType): void
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
    public function enqueueEditorAssets(): void
    {
        $blockType = WP_Block_Type_Registry::get_instance()->get_registered(GutenbergWidget::BLOCK_NAME);
        $registeredLate = false;

        if (!$blockType) {
            $this->registerBlockType();
            $blockType = WP_Block_Type_Registry::get_instance()->get_registered(GutenbergWidget::BLOCK_NAME);
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
                'preview_url' => BlockPreviewController::previewUrl(),
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
}

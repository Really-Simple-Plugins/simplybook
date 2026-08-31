<?php

namespace SimplyBook\Support\Widgets;

use WP_Block_Type;
use WP_Block_Type_Registry;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class GutenbergWidget
{
    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * The name is used as an identifier in the {@see WP_Block_Type_Registry}
     */
    public function getName(): string
    {
        return 'simplybook/widget';
    }

    /**
     * The description is localized and used to overwrite the .json entry to
     * support translations.
     */
    public function getDescription(): string
    {
        return esc_html__('A widget for Simplybook.me', 'simplybook');
    }

    /**
     * Register the widget via {@see register_block_type}
     */
    public function register(): void
    {
        $blockMetaData = $this->env->getString('plugin.assets_path') . '/block/build/block.json';
        if (file_exists($blockMetaData) === false) {
            return;
        }

        $block = register_block_type($blockMetaData, [
            'render_callback' => [$this, 'render'],
            'description' => $this->getDescription(),
        ]);

        if (!$block) {
            return;
        }

        $this->setEditorStyleVersion($block);
    }

    /**
     * Return the widget as a {@see WP_Block_Type} when already registered.
     */
    public function get(): ?WP_Block_Type
    {
        return WP_Block_Type_Registry::get_instance()->get_registered(
            $this->getName()
        );
    }

    /**
     * Convert Gutenberg block attributes to shortcode output.
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
    public function render(array $attributes = []): string
    {
        return (new ShortcodeWidget($attributes))->render();
    }

    /**
     * Convert Gutenberg block attributes to shortcode and print the output.
     */
    public function print(array $attributes = []): void
    {
        (new ShortcodeWidget($attributes))->print();
    }

    /**
     * Use the generated build version to invalidate cached editor styles.
     */
    private function setEditorStyleVersion(WP_Block_Type $block): void
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

        foreach ($block->editor_style_handles as $styleHandle) {
            $style = (wp_styles()->registered[$styleHandle] ?? null);
            if ($style) {
                $style->ver = $version;
            }
        }
    }
}

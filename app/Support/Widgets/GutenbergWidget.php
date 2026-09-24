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
     * and includes the plugin namespace.
     */
    public function getName(): string
    {
        return 'simplybook/widget';
    }

    /**
     * Register the widget via {@see register_block_type}
     */
    public function register(): void
    {
        if (!function_exists('register_block_type')) {
            return;
        }

        $blockMetaData = $this->env->getString('plugin.assets_path') . '/block/build/block.json';
        if (file_exists($blockMetaData) === false) {
            return;
        }

        add_filter('block_type_metadata', [$this, 'setEditorStyleVersion']);

        register_block_type($blockMetaData, [
            'render_callback' => [$this, 'render'],
        ]);

        remove_filter('block_type_metadata', [$this, 'setEditorStyleVersion']);
    }

    /**
     * Return the widget as a {@see WP_Block_Type} when already registered.
     */
    public function get(): ?WP_Block_Type
    {
        if (!class_exists('WP_Block_Type_Registry')) {
            return null;
        }

        return WP_Block_Type_Registry::get_instance()->get_registered(
            $this->getName()
        );
    }

    /**
     * Use the {@see WP_Block_Type_Registry} to determine if the widget has
     * been registered.
     */
    public function isRegistered(): bool
    {
        if (!class_exists('WP_Block_Type_Registry')) {
            return false;
        }

        return WP_Block_Type_Registry::get_instance()->is_registered(
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
     * Use the plugin version to invalidate cached editor styles.
     */
    public function setEditorStyleVersion(array $metaData): array
    {
        if ($metaData['name'] !== $this->getName()) {
            return $metaData;
        }

        $metaData['version'] = $this->env->getString('plugin.version');
        return $metaData;
    }
}

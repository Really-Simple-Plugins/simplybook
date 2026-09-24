<?php

namespace SimplyBook\Controllers\Gutenberg;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\GutenbergWidget;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;
use SimplyBook\Support\Widgets\ShortcodeWidget;

class GutenbergController implements ControllerInterface
{
    private const PREVIEW_ACTION = 'simplybook_block_preview';

    private EnvironmentConfig $env;
    private GutenbergWidget $widget;

    public function __construct(EnvironmentConfig $env, GutenbergWidget $widget)
    {
        $this->env = $env;
        $this->widget = $widget;
    }

    public function register(): void
    {
        // Abort if the block editor is not available
        if (!function_exists('register_block_type')) {
            return;
        }

        add_action('init', [$this, 'registerWidget'], 20);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueEditorAssets']);
        add_action('admin_post_' . self::PREVIEW_ACTION, [$this, 'renderBlockPreview']);

        // For auto-installation purposes.
        add_action('simplybook_activation', [$this, 'registerWidget']);
    }

    /**
     * Register the Gutenberg widget.
     * @internal Call this method on `init` so WordPress s has initialized its
     *      block types.
     */
    public function registerWidget(): void
    {
        if ($this->widget->isRegistered()) {
            return;
        }

        $this->widget->register();
    }

    /**
     * Configure the Gutenberg block editor assets.
     */
    public function enqueueEditorAssets(): void
    {
        $block = $this->widget->get();
        $registeredLate = false;

        if (!$block) {
            $this->registerWidget();
            $block = $this->widget->get();
            $registeredLate = true;
        }

        if (!$block || empty($block->editor_script_handles)) {
            return;
        }

        $editorScriptHandle = $block->editor_script_handles[0];

        wp_localize_script(
            $editorScriptHandle,
            'simplybook',
            [
                'rest_namespace' => $this->env->getString('plugin.namespace'),
                'rest_version' => $this->env->getString('http.version'),
                'dashboard_url' => $this->env->getUrl('plugin.dashboard_url'),
                'preview_url' => $this->getPreviewUrl(),
            ]
        );

        wp_set_script_translations($editorScriptHandle, 'simplybook');

        if ($registeredLate) {
            foreach ($block->editor_script_handles as $scriptHandle) {
                wp_enqueue_script($scriptHandle);
            }

            foreach ($block->editor_style_handles as $styleHandle) {
                wp_enqueue_style($styleHandle);
            }
        }
    }

    /**
     * Build the nonce-protected URL consumed by the editor preview iframe.
     */
    private function getPreviewUrl(): string
    {
        return add_query_arg(
            [
                'action' => self::PREVIEW_ACTION,
                '_wpnonce' => wp_create_nonce(self::PREVIEW_ACTION),
            ],
            admin_url('admin-post.php')
        );
    }
    /**
     * Render a self-contained widget preview for the block editor iframe.
     */
    public function renderBlockPreview(): void
    {
        if (!current_user_can('simplybook_manage')) {
            wp_die(esc_html__('You are not allowed to preview this widget.', 'simplybook'), '', ['response' => 403]);
        }

        check_admin_referer(self::PREVIEW_ACTION);

        nocache_headers();
        send_nosniff_header();
        send_frame_options_header();
        header('Content-Type: text/html; charset=' . get_option('blog_charset'));
        header('Referrer-Policy: no-referrer');
        header('X-Robots-Tag: noindex, nofollow');

        $this->widget->print(
            $this->getBlockPreviewAttributes()
        );

        wp_print_scripts();
    }

    /**
     * Accept only supported block attributes from the preview URL.
     */
    private function getBlockPreviewAttributes(): array
    {
        $attributes = [];

        foreach (ShortcodeWidget::ATTRIBUTES as $attribute) {
            if (!isset($_GET[$attribute])) {
                continue;
            }

            $value = sanitize_text_field(wp_unslash($_GET[$attribute]));
            if ($attribute === 'provider' && $value === 'any') {
                $attributes[$attribute] = $value;
                continue;
            }

            $value = absint($value);
            if ($value > 0) {
                $attributes[$attribute] = $value;
            }
        }

        return $attributes;
    }
}

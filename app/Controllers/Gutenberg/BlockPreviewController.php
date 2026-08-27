<?php

namespace SimplyBook\Controllers\Gutenberg;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\GutenbergWidget;
use SimplyBook\Traits\HasViews;

class BlockPreviewController implements ControllerInterface
{
    use HasViews;

    private const PREVIEW_ACTION = 'simplybook_block_preview';

    private GutenbergWidget $widget;

    public function __construct(GutenbergWidget $widget)
    {
        $this->widget = $widget;
    }

    public function register(): void
    {
        add_action('admin_post_' . self::PREVIEW_ACTION, [$this, 'renderBlockPreview']);
    }

    /**
     * Build the nonce-protected URL consumed by the editor preview iframe.
     */
    public static function previewUrl(): string
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

        $widgetContent = $this->widget->render($this->getPreviewAttributes());
        if (empty($widgetContent)) {
            wp_die(esc_html__('The widget preview could not be loaded.', 'simplybook'), '', ['response' => 500]);
        }

        $this->render('admin/block-preview', ['widgetContent' => $widgetContent]);
    }

    /**
     * Accept only supported block attributes from the preview URL.
     */
    private function getPreviewAttributes(): array
    {
        $attributes = [];

        foreach (['location', 'category', 'service', 'provider'] as $attribute) {
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

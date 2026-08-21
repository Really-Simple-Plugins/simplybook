<?php

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Builders\WidgetShortcodeBuilder;
use SimplyBook\Traits\HasViews;

class BlockPreviewController implements ControllerInterface
{
    use HasViews;

    public const ACTION = 'simplybook_block_preview';

    public function register(): void
    {
        add_action('admin_post_' . self::ACTION, [$this, 'renderBlockPreview']);
    }

    /**
     * Render a self-contained widget preview for the block editor iframe.
     */
    public function renderBlockPreview(): void
    {
        if (!current_user_can('simplybook_manage')) {
            wp_die(esc_html__('You are not allowed to preview this widget.', 'simplybook'), '', ['response' => 403]);
        }

        check_admin_referer(self::ACTION);

        nocache_headers();
        send_nosniff_header();
        send_frame_options_header();
        header('Content-Type: text/html; charset=' . get_option('blog_charset'));
        header('Referrer-Policy: no-referrer');
        header('X-Robots-Tag: noindex, nofollow');

        $shortcode = (new WidgetShortcodeBuilder($this->getAttributes()))->build();
        $widgetContent = do_shortcode($shortcode);
        if (empty($widgetContent)) {
            wp_die(esc_html__('The widget preview could not be loaded.', 'simplybook'), '', ['response' => 500]);
        }

        $this->render('admin/block-preview', ['widgetContent' => $widgetContent]);
    }

    /**
     * Retrieve supported widget attributes from the preview URL.
     */
    private function getAttributes(): array
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

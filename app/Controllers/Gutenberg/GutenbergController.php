<?php

namespace SimplyBook\Controllers\Gutenberg;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\GutenbergWidget;

class GutenbergController implements ControllerInterface
{
    private GutenbergWidget $widget;

    public function __construct(GutenbergWidget $widget)
    {
        $this->widget = $widget;
    }

    public function register(): void
    {
        if (!function_exists('register_block_type')) {
            // Block editor is not available.
            return;
        }

        add_action('enqueue_block_editor_assets', [$this->widget, 'enqueueEditorAssets']);
        add_action('init', [$this->widget, 'register'], 20);

        // For auto-installation purposes.
        add_action('simplybook_activation', [$this->widget, 'register']);
    }
}

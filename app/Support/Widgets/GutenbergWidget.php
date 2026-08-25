<?php

namespace SimplyBook\Support\Widgets;

class GutenbergWidget
{
    public const BLOCK_NAME = 'simplybook/widget';

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
}

<?php

namespace SimplyBook\Support\Widgets;

class ShortcodeWidget
{
    private const NAME = 'simplybook_widget';

    public const ATTRIBUTES = [
        'location',
        'category',
        'service',
        'provider',
    ];

    private array $attributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    /**
     * Render the widget through its shortcode.
     */
    public function render(): string
    {
        return do_shortcode($this->buildShortcode());
    }

    /**
     * Render the widget through its shortcode and print the result.
     * @internal ignore phpcs: attributes are escaped in {@see buildShortcode}
     */
    public function print(): void
    {
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        echo $this->render();
    }

    /**
     * Build a SimplyBook widget shortcode from supported attributes.
     */
    private function buildShortcode(): string
    {
        $attributePairs = [];

        foreach (self::ATTRIBUTES as $attribute) {
            $value = $this->attributes[$attribute] ?? null;
            if (!is_scalar($value) || empty($value)) {
                continue;
            }

            $attributePairs[] = sprintf(
                '%s="%s"',
                $attribute,
                esc_attr((string) $value)
            );
        }

        return sprintf(
            '[%s%s]',
            self::NAME,
            empty($attributePairs) ? '' : ' ' . implode(' ', $attributePairs)
        );
    }
}

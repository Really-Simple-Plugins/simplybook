<?php

namespace SimplyBook\Services;

class ThemeColorService
{
    /**
     * Fallback colors when theme colors cannot be retrieved
     */
    private const FALLBACK_COLORS = [
        'primary' => '#FF3259',
        'secondary' => '#000000',
        'active' => '#055B78',
        'background' => '#f7f7f7',
        'foreground' => '#494949',
        'text' => '#ffffff',
    ];

    /**
     * WordPress color preset mappings
     */
    private const WP_COLOR_MAPPINGS = [
        'primary' => ['primary', 'accent', 'main'],
        'secondary' => ['secondary', 'foreground', 'text'],
        'active' => ['tertiary', 'link', 'highlight'],
        'background' => ['background', 'base'],
        'foreground' => ['foreground', 'text'],
        'text' => ['base', 'contrast'],
    ];

    /**
     * Get theme colors using WordPress theme API
     */
    public function getThemeColors(): array
    {
        // Try to get colors from global styles first
        $colors = $this->getColorsFromGlobalStyles();
        
        if (empty($colors)) {
            // Fall back to theme JSON resolver
            $colors = $this->getColorsFromThemeJson();
        }
        
        if (empty($colors)) {
            // Final fallback to hardcoded defaults
            $colors = self::FALLBACK_COLORS;
        }
        
        return $this->normalizeColors($colors);
    }

    /**
     * Get colors from WordPress global styles
     */
    private function getColorsFromGlobalStyles(): array
    {
        if (!function_exists('wp_get_global_styles')) {
            return [];
        }

        $globalStyles = wp_get_global_styles();
        $colors = [];

        // Extract colors from global styles
        if (isset($globalStyles['color']['palette'])) {
            $palette = $globalStyles['color']['palette'];
            $colors = $this->extractColorsFromPalette($palette);
        }

        // Try to get button colors specifically
        if (isset($globalStyles['elements']['button']['color'])) {
            $buttonColors = $globalStyles['elements']['button']['color'];
            if (isset($buttonColors['background'])) {
                $colors['primary'] = $this->parseColorValue($buttonColors['background']);
            }
            if (isset($buttonColors['text'])) {
                $colors['text'] = $this->parseColorValue($buttonColors['text']);
            }
        }

        return $colors;
    }

    /**
     * Get colors from theme JSON resolver
     */
    private function getColorsFromThemeJson(): array
    {
        if (!class_exists('WP_Theme_JSON_Resolver')) {
            return [];
        }

        try {
            $theme = wp_get_theme()->get_stylesheet();
            $settings = \WP_Theme_JSON_Resolver::get_merged_data($theme)->get_settings();
            $themeColors = ($settings['color']['palette']['theme'] ?? []);
            
            return $this->extractColorsFromPalette($themeColors);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Extract colors from WordPress color palette
     */
    private function extractColorsFromPalette(array $palette): array
    {
        $colors = [];
        
        foreach ($palette as $color) {
            if (!isset($color['slug']) || !isset($color['color'])) {
                continue;
            }
            
            $slug = $color['slug'];
            $colorValue = $color['color'];
            
            // Map WordPress color slugs to our color types
            foreach (self::WP_COLOR_MAPPINGS as $ourType => $wpSlugs) {
                if (in_array($slug, $wpSlugs, true)) {
                    $colors[$ourType] = $colorValue;
                    break;
                }
            }
        }
        
        return $colors;
    }

    /**
     * Parse color value from WordPress CSS variable format
     */
    private function parseColorValue(string $value): string
    {
        // Handle CSS variables like var(--wp--preset--color--primary)
        if (strpos($value, 'var(--wp--preset--color--') === 0) {
            $colorSlug = str_replace(['var(--wp--preset--color--', ')'], '', $value);
            
            // Try to get the actual color value from global styles
            $globalStyles = wp_get_global_styles();
            if (isset($globalStyles['color']['palette'])) {
                foreach ($globalStyles['color']['palette'] as $color) {
                    if (isset($color['slug']) && $color['slug'] === $colorSlug && isset($color['color'])) {
                        return $color['color'];
                    }
                }
            }
            
            // Try to get from theme JSON if global styles failed
            if (class_exists('WP_Theme_JSON_Resolver')) {
                try {
                    $theme = wp_get_theme()->get_stylesheet();
                    $settings = \WP_Theme_JSON_Resolver::get_merged_data($theme)->get_settings();
                    $allPalettes = array_merge(
                        $settings['color']['palette']['theme'] ?? [],
                        $settings['color']['palette']['default'] ?? [],
                        $settings['color']['palette']['custom'] ?? []
                    );
                    
                    foreach ($allPalettes as $color) {
                        if (isset($color['slug']) && $color['slug'] === $colorSlug && isset($color['color'])) {
                            return $color['color'];
                        }
                    }
                } catch (\Exception $e) {
                    // Fall through to return original value
                }
            }
        }
        
        return $value;
    }

    /**
     * Normalize colors to ensure we have all required colors
     */
    private function normalizeColors(array $colors): array
    {
        $normalized = [];
        
        foreach (self::FALLBACK_COLORS as $type => $fallback) {
            $colorValue = $colors[$type] ?? $fallback;
            
            // Parse CSS variables to actual color values
            $normalized[$type] = $this->parseColorValue($colorValue);
        }
        
        return $normalized;
    }

    /**
     * Check if the current theme is Extendify
     */
    public function isExtendifyTheme(): bool
    {
        $theme = wp_get_theme();
        return in_array($theme->get('TextDomain'), ['extendify', 'extendable'], true);
    }

    /**
     * Get Extendify-specific colors if available
     */
    public function getExtendifyColors(): array
    {
        if (!$this->isExtendifyTheme()) {
            return [];
        }

        return [
            'primary' => 'var(--wp--preset--color--primary)',
            'secondary' => 'var(--wp--preset--color--secondary)',
            'active' => 'var(--wp--preset--color--tertiary)',
            'background' => 'var(--wp--preset--color--background)',
            'foreground' => 'var(--wp--preset--color--foreground)',
            'text' => 'var(--wp--preset--color--foreground-alt)',
        ];
    }

    /**
     * Get theme colors formatted for SimplyBook widget
     */
    public function getWidgetColors(): array
    {
        $colors = $this->getThemeColors();
        
        return [
            'primary' => $colors['primary'],
            'secondary' => $colors['secondary'],
            'active' => $colors['active'],
            'booking_nav_bg_color' => $colors['primary'],
            'sb_base_color' => $colors['secondary'],
            'sb_available' => $colors['active'],
            'body_bg_color' => $colors['background'],
            'dark_font_color' => $colors['foreground'],
            'light_font_color' => $colors['text'],
            'btn_color_1' => $colors['primary'],
            'sb_company_label_color' => $colors['primary'],
            'sb_busy' => $colors['secondary'],
            'link_color' => $colors['active'],
        ];
    }
}
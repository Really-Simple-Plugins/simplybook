<?php

namespace SimplyBook\Services;

use SimplyBook\Utility\ColorUtility;
use SimplyBook\App;

class ThemeColorService
{

    /**
     * Maps WordPress theme color names to standardized keys.
     * 
     * Different themes use different names (primary vs accent vs main), 
     * this ensures consistent color extraction across themes.
     * 
     * @var array<string, string[]>
     */
    private array $wpColorMappings = [
        'primary' => ['primary', 'accent', 'main'],
        'secondary' => ['secondary', 'foreground', 'text'],
        'active' => ['tertiary', 'link', 'highlight'],
        'background' => ['background', 'base'],
        'foreground' => ['foreground', 'text'],
        'text' => ['base', 'contrast'],
    ];

    /**
     * Get normalized theme colors from the active WordPress theme.
     * 
     * Uses fallback chain: Extendify → Global Styles → Theme JSON → defaults.
     * 
     * @return array<string, string> Color array with keys: primary, secondary, active, background, foreground, text
     */
    public function getThemeColors(): array
    {
        if ($this->isExtendifyTheme()) {
            $colors = $this->getExtendifyColors();
            if (!empty($colors)) {
                return $this->normalizeColors($colors);
            }
        }
        
        $colors = $this->getColorsFromGlobalStyles();
        
        if (empty($colors)) {
            $colors = $this->getColorsFromThemeJson();
        }
        
        if (empty($colors)) {
            return $this->getFallbackColors();
        }
        
        return $this->normalizeColors($colors);
    }

    /**
     * Extract colors from WordPress Global Styles API (WordPress 5.9+).
     * 
     * Checks color palette and element-specific colors (buttons) from Global Styles.
     * Includes theme colors and Site Editor customizations.
     * 
     * @return array<string, string> Extracted colors, empty if unavailable
     */
    public function getColorsFromGlobalStyles(): array
    {
        if (!function_exists('wp_get_global_styles')) {
            return [];
        }

        $globalStyles = wp_get_global_styles();

        if (isset($globalStyles['color']['palette'])) {
            $palette = $globalStyles['color']['palette'];
            return $this->extractColorsFromPalette($palette);
        }

        return $this->extractColorsFromButtonElements($globalStyles);
    }

    /**
     * Extract colors from WordPress Theme JSON resolver.
     * 
     * Reads colors from theme.json files before user customizations.
     * Fallback when Global Styles unavailable.
     * 
     * @return array<string, string> Extracted colors, empty if unavailable
     */
    public function getColorsFromThemeJson(): array
    {
        if (!class_exists('WP_Theme_JSON_Resolver')
            || !function_exists('wp_get_theme') ) {
            return [];
        }

        try {
            $theme = wp_get_theme()->get_stylesheet();
            $settings = \WP_Theme_JSON_Resolver::get_merged_data($theme)->get_settings();
            $themeColors = ($settings['color']['palette']['theme'] ?? []);
        } catch (\Exception $e) {
            return [];
        }
        
        return $this->extractColorsFromPalette($themeColors);
    }

    /**
     * Extract colors from palette and map to standardized keys.
     * 
     * Uses wpColorMappings to handle different theme naming conventions
     * (e.g., 'accent' vs 'primary' both map to 'primary').
     * 
     * @param array $palette WordPress color palette with 'slug' and 'color' keys
     * @return array<string, string> Mapped colors
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
            
            foreach ($this->wpColorMappings as $ourType => $wpSlugs) {
                if (in_array($slug, $wpSlugs, true)) {
                    $colors[$ourType] = $colorValue;
                    break;
                }
            }
        }
        
        return $colors;
    }

    /**
     * Extract colors from Global Styles button elements.
     * 
     * Fallback when no color palette available. Maps button background 
     * to 'primary' and button text to 'text'.
     * 
     * @param array $globalStyles Global styles array from wp_get_global_styles()
     * @return array<string, string> Extracted button colors
     */
    private function extractColorsFromButtonElements(array $globalStyles): array
    {
        $colors = [];

        if (isset($globalStyles['elements']['button']['color'])) {
            $buttonColors = $globalStyles['elements']['button']['color'];
            if (isset($buttonColors['background'])) {
                $colors['primary'] = ColorUtility::parseColorValue($buttonColors['background']);
            }
            if (isset($buttonColors['text'])) {
                $colors['text'] = ColorUtility::parseColorValue($buttonColors['text']);
            }
        }

        return $colors;
    }


    /**
     * Normalize colors to ensure we have all required colors
     */
    private function normalizeColors(array $colors): array
    {
        $normalized = [];
        
        $fallbackColors = $this->getFallbackColors();
        foreach ($fallbackColors as $type => $fallback) {
            $colorValue = $colors[$type] ?? $fallback;
            
            $normalized[$type] = ColorUtility::parseColorValue($colorValue);
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

        $rawColors = [
            'primary' => 'var(--wp--preset--color--primary)',
            'secondary' => 'var(--wp--preset--color--secondary)',
            'active' => 'var(--wp--preset--color--tertiary)',
            'background' => 'var(--wp--preset--color--background)',
            'foreground' => 'var(--wp--preset--color--foreground)',
            'text' => 'var(--wp--preset--color--foreground-alt)',
        ];

        $colors = [];
        foreach ($rawColors as $type => $cssVar) {
            $colors[$type] = ColorUtility::parseColorValue($cssVar);
        }

        return $colors;
    }

    /**
     * Get fallback colors from config.
     * 
     * @return array<string, string> Fallback color array
     */
    private function getFallbackColors(): array
    {
        return App::env('colors.fallback_colors', []);
    }
}
<?php

namespace SimplyBook\Services;

use SimplyBook\Utility\ColorUtility;
use SimplyBook\App;

class ThemeColorService
{
    private ColorUtility $colorUtility;

    public function __construct()
    {
        $this->colorUtility = new ColorUtility();
    }

    /**
     * Maps WordPress theme color names to standardized keys.
     */
    private array $wpColorMappings = [
        'primary' => ['primary', 'accent', 'main'],
        'secondary' => ['secondary', 'accent-2', 'tertiary'], // Hover style
        'active' => ['tertiary', 'link', 'highlight', 'accent'], // Button-like elements
        'background' => ['background', 'base'],
        'foreground' => ['foreground', 'text'],
        'text' => ['base', 'contrast'],
    ];

    /**
     * Fallback chain: Global Styles → Theme JSON → CSS Variables → config defaults
     */
    public function getThemeColors(): array
    {
        $colors = $this->getColorsFromGlobalStyles();
        
        if (empty($colors)) {
            $colors = $this->getColorsFromThemeJson();
        }
        
        if (empty($colors)) {
            $colors = $this->getColorsFromCssVariables();
        }
        
        if (empty($colors)) {
            return $this->getFallbackColors();
        }

        return $this->ensureCompleteColors($colors);
    }

    /**
     * WordPress 5.9+ Global Styles API - includes user customizations
     */
    public function getColorsFromGlobalStyles(): array
    {
        if (!function_exists('wp_get_global_styles')) {
            return [];
        }

        $globalStyles = wp_get_global_styles();

        if (isset($globalStyles['color']['palette'])) {
            $palette = $globalStyles['color']['palette'];
            return $this->mapPaletteToStandardColors($palette);
        }

        return $this->getButtonColorsFromGlobalStyles($globalStyles);
    }

    /**
     * Theme JSON resolver - theme defaults before user customizations
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
        
        return $this->mapPaletteToStandardColors($themeColors);
    }

    /**
     * Maps various theme color names (accent, main, etc.) to standard keys
     */
    private function mapPaletteToStandardColors(array $palette): array
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
     * Extracts button and link colors from Global Styles elements
     */
    private function getButtonColorsFromGlobalStyles(array $globalStyles): array
    {
        $colors = [];

        // Extract button colors
        if (isset($globalStyles['elements']['button']['color'])) {
            $buttonColors = $globalStyles['elements']['button']['color'];
            if (isset($buttonColors['background'])) {
                $colors['primary'] = $this->colorUtility->resolveColorToHex($buttonColors['background']);
                // Use button background for active state too (button-like elements)
                $colors['active'] = $this->colorUtility->resolveColorToHex($buttonColors['background']);
            }
            if (isset($buttonColors['text'])) {
                $colors['text'] = $this->colorUtility->resolveColorToHex($buttonColors['text']);
            }
        }

        // Extract button hover colors for secondary (hover style)
        if (isset($globalStyles['elements']['button'][':hover']['color'])) {
            $hoverColors = $globalStyles['elements']['button'][':hover']['color'];
            if (isset($hoverColors['background'])) {
                $colors['secondary'] = $this->colorUtility->resolveColorToHex($hoverColors['background']);
            }
        }

        // Extract link colors as fallback for active state
        if (isset($globalStyles['elements']['link']['color']['text']) && !isset($colors['active'])) {
            $colors['active'] = $this->colorUtility->resolveColorToHex($globalStyles['elements']['link']['color']['text']);
        }

        return $colors;
    }

    /**
     * Fills missing colors with fallbacks and resolves CSS variables
     */
    private function ensureCompleteColors(array $colors): array
    {
        $normalized = [];
        
        $fallbackColors = $this->getFallbackColors();
        if (empty($fallbackColors)) {
            return [];
        }
        
        foreach ($fallbackColors as $type => $fallback) {
            $colorValue = $colors[$type] ?? $fallback;
            $normalized[$type] = $this->colorUtility->resolveColorToHex($colorValue);
        }
        
        return $normalized;
    }

    /**
     * Standard WordPress CSS variables - works with any modern block theme
     */
    public function getColorsFromCssVariables(): array
    {
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
            $colors[$type] = $this->colorUtility->resolveColorToHex($cssVar);
        }

        return $colors;
    }

    private function getFallbackColors(): array
    {
        return App::env('colors.fallback_colors');
    }
}
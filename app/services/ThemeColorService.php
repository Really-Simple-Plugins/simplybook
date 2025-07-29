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
     * For widget: primary=background, secondary=text, active=button
     */
    private array $wpColorMappings = [
        'primary' => ['background', 'base'],
        'secondary' => ['contrast', 'foreground'],
        'active' => ['accent-1', 'accent', 'tertiary'],
        'background' => ['background', 'base'],
        'foreground' => ['foreground', 'text'],
        'text' => ['contrast', 'foreground'],
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
     * For widget: primary=background, secondary=text, active=accent-1
     */
    private function getButtonColorsFromGlobalStyles(array $globalStyles): array
    {
        $colors = [];

        // Extract theme background for primary
        if (isset($globalStyles['color']['background'])) {
            $colors['primary'] = $this->colorUtility->resolveColorToHex($globalStyles['color']['background']);
        }

        // Extract theme text for secondary
        if (isset($globalStyles['color']['text'])) {
            $colors['secondary'] = $this->colorUtility->resolveColorToHex($globalStyles['color']['text']);
        }

        // For active color, prioritize accent-1 over button background
        // This ensures we get the theme's primary accent color
        $colors['active'] = $this->colorUtility->resolveColorToHex('var(--wp--preset--color--accent-1)');

        // Extract button text color if available
        if (isset($globalStyles['elements']['button']['color']['text'])) {
            $colors['text'] = $this->colorUtility->resolveColorToHex($globalStyles['elements']['button']['color']['text']);
        }

        // If accent-1 couldn't be resolved, fall back to a button background
        if ($colors['active'] === 'var(--wp--preset--color--accent-1)') {
            if (isset($globalStyles['elements']['button']['color']['background'])) {
                $colors['active'] = $this->colorUtility->resolveColorToHex($globalStyles['elements']['button']['color']['background']);
            } elseif (isset($globalStyles['elements']['link']['color']['text'])) {
                $colors['active'] = $this->colorUtility->resolveColorToHex($globalStyles['elements']['link']['color']['text']);
            }
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
     * For widget: primary=background, secondary=text, active=button
     */
    public function getColorsFromCssVariables(): array
    {
        $rawColors = [
            'primary' => 'var(--wp--preset--color--background)',
            'secondary' => 'var(--wp--preset--color--contrast)',
            'active' => 'var(--wp--preset--color--accent-1)',
            'background' => 'var(--wp--preset--color--background)',
            'foreground' => 'var(--wp--preset--color--foreground)',
            'text' => 'var(--wp--preset--color--contrast)',
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
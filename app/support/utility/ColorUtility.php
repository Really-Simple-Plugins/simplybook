<?php

namespace SimplyBook\Utility;

/**
 * Utility for parsing WordPress color formats.
 * 
 * Converts CSS variables to hex colors via Global Styles and Theme JSON.
 */
class ColorUtility
{
    /**
     * Parse WordPress color values to hex format.
     * 
     * Resolves CSS variables via Global Styles and Theme JSON.
     * 
     * @param string $value Color value to parse
     * @return string Hex color or original value if resolution fails
     */
    public static function parseColorValue(string $value): string
    {
        if (self::isCssVariable($value)) {
            return self::resolveCssVariable($value);
        }
        
        return $value;
    }
    
    /**
     * Check if value is a WordPress CSS variable.
     */
    private static function isCssVariable(string $value): bool
    {
        return strpos($value, 'var(--wp--preset--color--') === 0;
    }
    
    /**
     * Resolve CSS variable to hex color via Global Styles and Theme JSON.
     */
    private static function resolveCssVariable(string $cssVar): string
    {
        $colorSlug = self::extractColorSlugFromCssVar($cssVar);
        
        $resolvedColor = self::resolveFromGlobalStyles($colorSlug);
        if ($resolvedColor !== null) {
            return $resolvedColor;
        }
        
        $resolvedColor = self::resolveFromThemeJson($colorSlug);
        if ($resolvedColor !== null) {
            return $resolvedColor;
        }
        
        return $cssVar;
    }
    
    /**
     * Extract color slug from CSS variable (e.g., "primary" from var(--wp--preset--color--primary)).
     */
    private static function extractColorSlugFromCssVar(string $cssVar): string
    {
        return str_replace(['var(--wp--preset--color--', ')'], '', $cssVar);
    }
    
    /**
     * Resolve color slug via Global Styles palette.
     */
    private static function resolveFromGlobalStyles(string $colorSlug): ?string
    {
        if (!function_exists('wp_get_global_styles')) {
            return null;
        }
        
        $globalStyles = wp_get_global_styles();
        if (!isset($globalStyles['color']['palette'])) {
            return null;
        }
        
        foreach ($globalStyles['color']['palette'] as $color) {
            if (isset($color['slug'], $color['color']) && $color['slug'] === $colorSlug) {
                return $color['color'];
            }
        }
        
        return null;
    }
    
    /**
     * Resolve color slug via Theme JSON system.
     */
    private static function resolveFromThemeJson(string $colorSlug): ?string
    {
        if (!class_exists('WP_Theme_JSON_Resolver')
            || !function_exists('wp_get_theme')) {
            return null;
        }
        
        try {
            $theme = wp_get_theme()->get_stylesheet();
            $settings = \WP_Theme_JSON_Resolver::get_merged_data($theme)->get_settings();
            
            $allPalettes = array_merge(
                $settings['color']['palette']['theme'] ?? [],
                $settings['color']['palette']['default'] ?? [],
                $settings['color']['palette']['custom'] ?? []
            );
            
            foreach ($allPalettes as $color) {
                if (isset($color['slug'], $color['color']) && $color['slug'] === $colorSlug) {
                    return $color['color'];
                }
            }
        } catch (\Exception $e) {
            // Fall through to return null
        }
        
        return null;
    }
}
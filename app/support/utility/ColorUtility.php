<?php

namespace SimplyBook\Utility;

/**
 * Utility for parsing WordPress color formats.
 */
class ColorUtility
{
    /**
     * Resolves CSS variables to hex, passes through regular colors
     */
    public function resolveColorToHex(string $value): string
    {
        // Handle color-mix() functions by extracting the base color
        if (strpos($value, 'color-mix(') === 0) {
            return $this->resolveColorMix($value);
        }
        
        if ($this->isCssVariable($value)) {
            return $this->resolveCssVariable($value);
        }
        
        return $value;
    }
    
    private function isCssVariable(string $value): bool
    {
        return strpos($value, 'var(--wp--preset--color--') === 0;
    }
    
    /**
     * Tries Global Styles first, then Theme JSON as fallback
     */
    private function resolveCssVariable(string $cssVar): string
    {
        $colorSlug = $this->getCssVariableSlug($cssVar);
        
        $resolvedColor = $this->findColorInGlobalStyles($colorSlug);
        if ($resolvedColor !== null) {
            return $resolvedColor;
        }
        
        $resolvedColor = $this->findColorInThemeJson($colorSlug);
        if ($resolvedColor !== null) {
            return $resolvedColor;
        }
        
        return $cssVar;
    }
    
    private function getCssVariableSlug(string $cssVar): string
    {
        return str_replace(['var(--wp--preset--color--', ')'], '', $cssVar);
    }
    
    /**
     * Searches Global Styles color palette for matching slug
     */
    private function findColorInGlobalStyles(string $colorSlug): ?string
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
     * Searches Theme JSON palettes (theme, default, custom) for matching slug
     */
    private function findColorInThemeJson(string $colorSlug): ?string
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
    
    /**
     * Extracts base color from color-mix() functions
     */
    private function resolveColorMix(string $colorMix): string
    {
        // Extract CSS variable from color-mix function
        if (preg_match('/var\(--wp--preset--color--([\w-]+)\)/', $colorMix, $matches)) {
            $cssVar = 'var(--wp--preset--color--' . $matches[1] . ')';
            $resolvedColor = $this->resolveCssVariable($cssVar);
            
            // If successfully resolved, return the base color
            if ($resolvedColor !== $cssVar) {
                return $resolvedColor;
            }
        }
        
        // Return original value if we can't parse - let fallback system handle it
        return $colorMix;
    }
}
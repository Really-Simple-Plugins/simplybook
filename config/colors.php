<?php if (!defined('ABSPATH')) {
    exit;
}

/**
 * Default color configuration for SimplyBook widget.
 * 
 * These colors serve as absolute fallbacks when:
 * - WordPress theme colors cannot be retrieved
 * - Global Styles API fails
 * - Theme JSON parsing fails
 * - Extendify detection fails
 * - Network requests fail
 * 
 * Used by both server-side (ThemeColorService) and client-side (React components).
 */
return [
    'fallback_colors' => [
        'primary' => '#FF3259',
        'secondary' => '#000000',
        'active' => '#055B78',
        'background' => '#f7f7f7',
        'foreground' => '#494949',
        'text' => '#ffffff',
    ],
];
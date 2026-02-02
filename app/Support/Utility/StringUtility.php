<?php

namespace SimplyBook\Support\Utility;

/**
 * Utility class for String manipulation.
 */
class StringUtility
{
    /**
     * Convert a URL to a title.
     *
     * Strips the site URL from the given URL, replaces dashes with spaces,
     * and capitalizes the first letter.
     */
    public static function convertUrlToTitle(string $url): string
    {
        // Strip off the page url from the page name
        $site_url = trailingslashit(get_site_url());
        $title = str_replace($site_url, '', $url);
        $title = str_replace('-', ' ', $title);

        // Enforce first letter uppercase
        return ucfirst($title);
    }

    /**
     * Convert a string from snake_case to UpperCamelCase.
     */
    public static function snakeToPascalCase(string $string): string
    {
        return str_replace('_', '', ucwords($string, '_'));
    }

    /**
     * Convert a string to snake_case. Capital letters are replaced with
     * underscores followed by the lowercase letter. Hyphens and spaces are also
     * replaced with underscores. Multiple underscores are reduced to a single
     * underscore. Leading and trailing underscores are trimmed.
     */
    public static function toSnakeCase(string $string): string
    {
        $string = preg_replace('/[ -]+/', '_', $string);
        $string = preg_replace('/([a-z])([A-Z])/', '$1_$2', $string);
        $string = preg_replace('/_+/', '_', $string);
        return trim(strtolower($string), '_');
    }

    /**
     * Convert either snake_case, camelCase or PascalCase to camelCase
     */
    public static function toCamelCase(string $string): string
    {
        $string = self::toPascalCase($string);
        return lcfirst($string);
    }

    /**
     * Convert either snake_case, camelCase or PascalCase to PascalCase
     */
    public static function toPascalCase(string $string): string
    {
        $string = str_replace('_', ' ', $string);
        $string = ucwords($string);
        return str_replace(' ', '', $string);
    }
}

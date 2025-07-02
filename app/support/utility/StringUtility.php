<?php

namespace SimplyBook\Utility;

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
    public static function snakeToUpperCamelCase(string $string): string
    {
        return str_replace('_', '', ucwords($string, '_'));
    }

}
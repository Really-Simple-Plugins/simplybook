<?php

namespace SimplyBook\Traits;

trait HasLogging
{
    /**
     * Log a message if WP_DEBUG is enabled
     *
     * @param string | object | array $message
     * @return void
     */
    public function log($message): void
    {
        if ((defined('WP_DEBUG') && WP_DEBUG) === false) {
            return;
        }

        $prepend = 'SimplyBook.me: ';

        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }

        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
        error_log($prepend . $message);
    }
}

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
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $prepend = 'SimplyBook.me: ';
            if (is_array($message) || is_object($message)) {
                // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log, WordPress.PHP.DevelopmentFunctions.error_log_print_r
                error_log($prepend . print_r($message, true));
            } else {
                // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                error_log($prepend . $message);
            }
        }
    }
}

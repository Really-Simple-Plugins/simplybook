<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasAllowlistControl;

class CallbackUrlService
{
    use HasAllowlistControl;

    private const CALLBACK_URL_OPTION = 'simplybook_callback_url';
    private const CALLBACK_URL_EXPIRES_OPTION = 'simplybook_callback_url_expires';

    /**
     * Retrieves the temporary callback URL if it hasn't expired.
     * Automatically cleans up expired URLs.
     */
    public function getCallbackUrl(): string
    {
        $callbackUrl = get_option(self::CALLBACK_URL_OPTION, '');
        $expires = get_option(self::CALLBACK_URL_EXPIRES_OPTION, 0);

        if ($expires > time()) {
            return $callbackUrl;
        }

        // Expired URL - clean it up
        if (!empty($callbackUrl)) {
            delete_option(self::CALLBACK_URL_OPTION);
        }

        return '';
    }

    /**
     * Removes the callback URL and its expiration time from the database.
     */
    public function cleanupCallbackUrl(): void
    {
        delete_option(self::CALLBACK_URL_OPTION);
        delete_option(self::CALLBACK_URL_EXPIRES_OPTION);
    }
}
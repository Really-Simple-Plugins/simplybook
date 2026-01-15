<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasAllowlistControl;

class CallbackUrlService
{
    use HasAllowlistControl;

    private const CALLBACK_URL_OPTION = 'simplybook_callback_url';
    private const CALLBACK_URL_EXPIRES_OPTION = 'simplybook_callback_url_expires';
    private const CALLBACK_LIFETIME_SECONDS = 600; // 10 minutes
    private const CALLBACK_ROUTE = 'onboarding/registration_callback';

    /**
     * Get the full callback URL for registration.
     * Creates a new callback URL if one doesn't exist or has expired.
     * Works similar to ApiClient::get_company_login().
     */
    public function getFullCallbackUrl(): string
    {
        if (!$this->adminAccessAllowed()) {
            return '';
        }

        $callbackToken = $this->getCallbackUrl();

        // Create new callback URL if needed
        if (empty($callbackToken)) {
            $callbackToken = $this->generateCallbackUrl();
        }

        return get_rest_url(
            get_current_blog_id(),
            'simplybook/v1/' . self::CALLBACK_ROUTE . '/' . $callbackToken
        );
    }

    /**
     * Retrieves the temporary callback URL token if it hasn't expired.
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
            $this->cleanupCallbackUrl();
        }

        return '';
    }

    /**
     * Generates a new temporary callback URL token with expiration.
     */
    private function generateCallbackUrl(): string
    {
        $randomString = wp_generate_password(32, false);
        update_option(self::CALLBACK_URL_OPTION, $randomString, false);
        update_option(self::CALLBACK_URL_EXPIRES_OPTION, time() + self::CALLBACK_LIFETIME_SECONDS, false);

        return $randomString;
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

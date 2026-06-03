<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SimplyBook\Support\Helpers\Storage;

/**
 * General config helper used in DI container.
 */
final class RequestStorage extends Storage
{
    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;

        parent::__construct([
            'global' => $_REQUEST,
            'files' => $_FILES,
        ]);
    }

    /**
     * Check if the current request is a WP JSON request. This is better than
     * the WordPress native function `wp_is_json_request()`, because that
     * returns false when visiting /wp-json/ or ?rest_route= (for plain
     * permalinks) endpoint. We need a true value there to activate
     * features that register REST routes. For example
     * {@see \SimplyBook\Features\Onboarding\OnboardingController}
     *
     * @internal Ignore the phpcs errors for this method, as they are false
     * positives. We do not actually use the $_GET or $_SERVER variables
     * directly, but we need to check if they are set and contain the
     * expected values.
     */
    public function isRestRequest(): bool
    {
        $pluginHttpNamespace = $this->env->getString('http.namespace');
        $restUrlPrefix = trailingslashit(rest_get_url_prefix());

        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        $currentRequestUri = ($_SERVER['REQUEST_URI'] ?? '');
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.NonceVerification.Recommended
        $isPlainPermalink = (
            isset($_GET['rest_route'])
            && (strpos($_GET['rest_route'], $pluginHttpNamespace) !== false)
        );

        return (strpos($currentRequestUri, $restUrlPrefix) !== false) || $isPlainPermalink;
    }
}

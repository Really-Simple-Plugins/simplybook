<?php

namespace SimplyBook\Helpers;

use SimplyBook\App;
use SimplyBook\Utility\StringUtility;

/**
 * Helper class to check if a feature should be loaded.
 */
class FeatureHelper
{
    /**
     * Method is used to check if a feature is enabled. It will process the
     * feature name and searches for a method that check if the feature is
     * enabled. It used format: is{FeatureName}Enabled. Where FeatureName is
     * the name of the feature in snake_case.
     */
    public static function isEnabled(string $feature): bool
    {
        $method = 'is' . StringUtility::snakeToUpperCamelCase($feature) . 'Enabled';
        if (method_exists(__CLASS__, $method)) {
            return self::$method();
        }
        return false;
    }

    /**
     * Method is used to check if a feature is in scope. It will process the
     * feature name and searches for a method that checks if the feature is in
     * scope. It uses format: is{FeatureName}InScope. Where FeatureName is the
     * name of the feature in snake_case.
     */
    public static function inScope(string $feature): bool
    {
        $method = 'is' . StringUtility::snakeToUpperCamelCase($feature) . 'InScope';
        if (method_exists(__CLASS__, $method)) {
            return self::$method();
        }
        return false;
    }

    /**
     * Onboarding feature is enabled when a company has NOT been registered yet.
     */
    private static function isOnboardingEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false) === false;
    }

    /**
     * Onboarding feature should only be loaded when a user is on the dashboard
     * page or when the current request is a WP REST API request.
     */
    private static function isOnboardingInScope(): bool
    {
        return (is_admin() && self::userIsOnDashboard()) || self::requestIsRestRequest();
    }

    /**
     * TaskManagement feature is enabled when the onboarding is completed.
     */
    private static function isTaskManagementEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false);
    }

    /**
     * TaskManagement feature is always in scope because it should be able to
     * listen to events everywhere.
     */
    private static function isTaskManagementInScope(): bool
    {
        return true;
    }

    /**
     * Notifications feature is enabled when the onboarding is completed.
     */
    private static function isNotificationsEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false);
    }

    /**
     * Notifications feature is always in scope because it should be able to
     * listen to events everywhere.
     */
    private static function isNotificationsInScope(): bool
    {
        return true;
    }

    /**
     * Check if the current user is on the SimplyBook Dashboard page.
     */
    private static function userIsOnDashboard(): bool
    {
        $pageVisitedByUser = App::provide('request')->getString('page');

        $simplybookPageComponents = wp_parse_url(App::env('plugin.dashboard_url'), PHP_URL_QUERY);
        parse_str($simplybookPageComponents, $parsedQuery);
        $simplybookDashboardPage = ($parsedQuery['page'] ?? '');

        return $pageVisitedByUser === $simplybookDashboardPage;
    }

    /**
     * Check if the current request is a WP JSON request. This is better than
     * the WordPress native function `wp_is_json_request()`, because that
     * returns false when visiting /wp-json/ or ?rest_route= (for plain
     * permalinks) endpoint. We need a rue value there to activate features that
     * register REST routes. For example
     * {@see \SimplyBook\Features\Onboarding\OnboardingController}
     *
     * @internal Ignore the phpcs errors for this method, as they are false
     * positives. We do not actually use the $_GET or $_SERVER variables
     * directly, but we need to check if they are set and contain the
     * expected values.
     */
    private static function requestIsRestRequest(): bool
    {
        $restUrlPrefix = trailingslashit(rest_get_url_prefix());
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        $currentRequestUri = ($_SERVER['REQUEST_URI'] ?? '');
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.NonceVerification.Recommended
        $isPlainPermalink = isset($_GET['rest_route']) && strpos($_GET['rest_route'], 'simplybook/v') !== false;

        return (strpos($currentRequestUri, $restUrlPrefix) !== false) || $isPlainPermalink;
    }

}
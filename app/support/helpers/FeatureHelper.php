<?php

namespace SimplyBook\Helpers;

use SimplyBook\App;
use SimplyBook\Utility\StringUtility;

/**
 * Helper class to check if a feature is enabled.
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
     * Onboarding feature is enabled when a company has NOT been registered yet.
     */
    private static function isOnboardingEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false) === false;
    }

    /**
     * TaskManagement feature is enabled when the onboarding is completed.
     */
    private static function isTaskManagementEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false);
    }
}
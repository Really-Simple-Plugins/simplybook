<?php

namespace SimplyBook\Helpers;

use SimplyBook\App;

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
        $method = 'is' . ucwords($feature, '_') . 'Enabled';
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
        return App::provide('client')->company_registration_complete() === false;
    }
}
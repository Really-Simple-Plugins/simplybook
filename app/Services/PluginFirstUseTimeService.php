<?php

declare(strict_types=1);

namespace SimplyBook\Services;

class PluginFirstUseTimeService
{
    private const PRIVATE_PLUGIN_FIRST_USE_TIME_OPTION = '_simplybook_plugin_first_use_time';
    private const LEGACY_REGISTRATION_START_TIME_OPTION = 'simplybook_company_registration_start_time';
    private const ONBOARDING_COMPLETED_OPTION = 'simplybook_onboarding_completed';

    /**
     * Persist the current time as the plugin first-use time when it is not
     * known yet.
     */
    public function saveCurrentPluginFirstUseTimeIfMissing(): void
    {
        if ($this->hasPluginFirstUseTime() === true) {
            return;
        }

        update_option(self::PRIVATE_PLUGIN_FIRST_USE_TIME_OPTION, time(), false);
    }

    /**
     * Preserve the existing wait time for installs that already used the
     * plugin before the private plugin first-use option existed by reusing the
     * legacy registration start time.
     */
    public function migratePluginFirstUseTimeIfMissing(): void
    {
        if ($this->hasPluginFirstUseTime() === true) {
            return;
        }

        if ($this->onboardingCompleted() === false) {
            return;
        }

        $legacyRegistrationStartTime = $this->getLegacyRegistrationStartTime();
        if (empty($legacyRegistrationStartTime)) {
            return;
        }

        update_option(self::PRIVATE_PLUGIN_FIRST_USE_TIME_OPTION, $legacyRegistrationStartTime, false);
    }

    /**
     * Return the persisted plugin first-use timestamp, or 0 when unknown.
     */
    public function getPluginFirstUseTime(): int
    {
        return (int) get_option(self::PRIVATE_PLUGIN_FIRST_USE_TIME_OPTION, 0);
    }

    private function hasPluginFirstUseTime(): bool
    {
        return !empty($this->getPluginFirstUseTime());
    }

    private function getLegacyRegistrationStartTime(): int
    {
        return (int) get_option(self::LEGACY_REGISTRATION_START_TIME_OPTION, 0);
    }

    private function onboardingCompleted(): bool
    {
        return get_option(self::ONBOARDING_COMPLETED_OPTION, false) !== false;
    }
}

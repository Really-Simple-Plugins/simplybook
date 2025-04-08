<?php

namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\DesignSettingsService;

class DesignSettingsController implements ControllerInterface
{
    protected DesignSettingsService $service;

    public function __construct(DesignSettingsService $service) {
        $this->service = $service;
    }

    public function register()
    {
        add_action('simplybook_plugin_version_upgrade', [$this, 'handlePluginUpgrade'], 10, 2);
        add_action('simplybook_save_design_settings', [$this, 'saveSettings']);
        add_filter('simplybook_public_theme_list', [$this, 'insertDesignThemeSettings']);
        add_filter('simplybook_field', [$this, 'insertDesignSettings'], 10, 3);
    }

    /**
     * Handle plugin upgrades
     */
    public function handlePluginUpgrade(string $previousVersion, string $newVersion): void
    {
        if ($previousVersion && version_compare($previousVersion, '3.0', '<')) {
            $this->service->handleLegacyDesignUpgrade();
        }
    }

    /**
     * Process the save action for the design settings. Save the design fields
     * in the simplybook_design_settings option.
     * @throws \Exception
     */
    public function saveSettings(array $savedSettings): bool
    {
        $this->service->validateSettings($savedSettings);

        $designSettings = $this->service->getDesignOptions();
        if (empty($designSettings)) {
            return $this->service->saveAsDesignOptions($savedSettings);
        }

        $designSettings = $this->service->updateOrRetainDesignSettings($savedSettings, $designSettings);
        return $this->service->saveAsDesignOptions($designSettings);
    }

    /**
     * Insert the design settings into the theme list. The theme list is
     * retrieved from the SimplyBook API and contains a list of theme objects
     * with their own respective configs. The design settings from our database
     * are inserted into these configs based on the key of the config.
     */
    public function insertDesignThemeSettings(array $themeList): array
    {
        $designSettings = $this->service->getDesignOptions();

        // Only continue if these values exist
        if (empty($designSettings)
            || empty($designSettings['theme_settings'])
            || empty($themeList['themes'])
        ) {
            return $themeList;
        }

        foreach ($designSettings['theme_settings'] as $settingKey => $settingValue) {
            foreach ($themeList['themes'] as $theme) {
                if (empty($theme->config) || empty($theme->config->{$settingKey})) {
                    continue;
                }
                $theme->config->{$settingKey}->value = $settingValue;
            }
        }

        return $themeList;
    }

    /**
     * Each field id will be saved as a key->value pair in the settings. Which
     * means we can set the value of the field accordingly. Fields that pass
     * this method can be found in config/fields
     * @internal This does NOT work for dynamic theme_settings. Those are added
     * by {@see insertDesignThemeSettings}
     */
    public function insertDesignSettings(array $field, string $id, string $group): array
    {
        if ($group !== 'design') {
            return $field;
        }

        $designSettings = $this->service->getDesignOptions();
        if (empty($designSettings[$id])) {
            return $field;
        }

        $field['value'] = $designSettings[$id];
        return $field;
    }

}
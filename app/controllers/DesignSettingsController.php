<?php

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;

class DesignSettingsController implements ControllerInterface
{
    /**
     * Never save these setting keys.
     */
    protected array $blockList = [
        'withValues',
    ];

    public function register()
    {
        add_action('simplybook_save_design_settings', [$this, 'saveSettings']);
        add_filter('simplybook_public_theme_list', [$this, 'insertDesignThemeSettings']);
        add_filter('simplybook_field', [$this, 'insertDesignSettings'], 10, 3);
    }

    /**
     * Process the save action for the design settings. Save the design fields
     * in the simplybook_design_settings option.
     */
    public function saveSettings(array $savedSettings): bool
    {
        $designSettings = get_option('simplybook_design_settings', []);
        if (empty($designSettings)) {
            return update_option('simplybook_design_settings', $savedSettings);
        }

        $designSettings = $this->getDesignSettings($savedSettings, $designSettings);
        return update_option('simplybook_design_settings', $designSettings);
    }

    /**
     * Insert the design settings into the theme list. The theme list is
     * retrieved from the SimplyBook API and contains a list of theme objects
     * with their own respective configs. The design settings from our database
     * are inserted into these configs based on the key of the config.
     */
    public function insertDesignThemeSettings(array $themeList): array
    {
        $designSettings = get_option('simplybook_design_settings', []);

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

        $designSettings = get_option('simplybook_design_settings', []);
        if (empty($designSettings[$id])) {
            return $field;
        }

        $field['value'] = $designSettings[$id];
        return $field;
    }

    /**
     * Recursively merge the saved settings with the existing design settings.
     * This method ensures that existing values, that are not present in the
     * saved settings, are kept. Otherwise, the saved settings will override the
     * existing values. Missing keys in the savedSettings can occur for
     * design settings because not all theme settings apply for each theme.
     */
    protected function getDesignSettings(array $savedSettings, array $designSettings): array
    {
        foreach ($savedSettings as $key => $value) {

            if (in_array($key, $this->blockList, true)) {
                continue;
            }

            if (is_array($value)) {
                if (!isset($designSettings[$key]) || !is_array($designSettings[$key])) {
                    $designSettings[$key] = [];
                }
                $designSettings[$key] = $this->getDesignSettings($value, $designSettings[$key]);
                continue;
            }

            $designSettings[$key] = sanitize_text_field($value) ?: '0';
        }

        return $designSettings;
    }

}
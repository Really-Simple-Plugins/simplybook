<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\LegacySave;

class DesignSettingsService
{
    use LegacySave;

    /**
     * The key for the design settings in the WordPress options table.
     * This is used to store and retrieve the design settings.
     */
    private string $designOptionsKey = 'simplybook_design_settings';

    /**
     * The key map for legacy design settings. Used for upgrading legacy
     * design settings.
     */
    protected array $legacyKeyMap = [
        'template' => 'theme',
        'themeparams' => 'theme_settings',
    ];

    /**
     * Never save these setting keys.
     */
    protected array $blockList = [
        'withValues',
    ];

    /**
     * Get the design settings from the WordPress options table.
     * @uses wp_cache_get
     * @uses wp_cache_set Set the cache for 60 seconds.
     */
    public function getDesignOptions()
    {
        if ($cache = wp_cache_get('design_settings', 'simplybook')) {
            return $cache;
        }

        $designOptions = get_option($this->designOptionsKey);

        wp_cache_set('design_settings', $designOptions, 'simplybook', 60);
        return $designOptions;
    }

    /**
     * Saves the given array as the design settings in the WordPress options
     * table. This method will overwrite any existing design settings, it does
     * not do any checks.
     */
    public function saveAsDesignOptions(array $designSettings): bool
    {
        if (empty($designSettings)) {
            return false;
        }

        return update_option($this->designOptionsKey, $designSettings);
    }

    /**
     * Handle the legacy design upgrade. This method will take the legacy
     * design settings and convert them to the new format. It does not retain
     * the 'predefined' key, as it is not used in the new format. This method
     * will also remove the obsolete theme settings with key:
     * simplybookMePl_widget_settings
     */
    public function handleLegacyDesignUpgrade()
    {
        $legacyDesignSettings = $this->get_config_obsolete('widget_settings');

        foreach ($this->legacyKeyMap as $legacyKey => $currentKey) {
            if (empty($legacyDesignSettings[$legacyKey])) {
                continue;
            }
            $legacyDesignSettings[$currentKey] = $legacyDesignSettings[$legacyKey];
            unset($legacyDesignSettings[$legacyKey]);
        }

        // todo - "server" is also a legacy key, do we want to keep it?
        unset($legacyDesignSettings['predefined']);

        update_option($this->designOptionsKey, $legacyDesignSettings);
        delete_option('simplybookMePl_widget_settings');
    }

    /**
     * Recursively merge the saved settings with the existing design settings.
     * This method ensures that existing values, that are not present in the
     * saved settings, are kept. Otherwise, the saved settings will override the
     * existing values. Missing keys in the savedSettings can occur for
     * design settings because not all theme settings apply for each theme.
     */
    public function updateOrRetainDesignSettings(array $saveAsDesignSettings, array $designSettings = []): array
    {
        $currentSettings = ($designSettings ?: $this->getDesignOptions());
        if (empty($currentSettings)) {
            return $saveAsDesignSettings;
        }

        foreach ($saveAsDesignSettings as $key => $value) {

            if (in_array($key, $this->blockList, true)) {
                continue;
            }

            if (is_array($value)) {
                if (!isset($currentSettings[$key]) || !is_array($currentSettings[$key])) {
                    $currentSettings[$key] = [];
                }
                $currentSettings[$key] = $this->updateOrRetainDesignSettings($value, $currentSettings[$key]);
                continue;
            }

            $currentSettings[$key] = sanitize_text_field($value) ?: '0';
        }

        return $currentSettings;
    }

}
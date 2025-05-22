<?php

namespace SimplyBook\Controllers;

use SimplyBook\Helpers\Storage;
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
        add_action('simplybook_save_onboarding_widget_style', [$this, 'saveOnboardingWidgetStyle']);
        add_action('simplybook_save_design_settings', [$this, 'saveSettings']);
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
     * Process the save action for the widget style. Save the widget style
     * fields in the simplybook_design_settings option.
     * @hooked \SimplyBook\Features\Onboarding\OnboardingController::saveColorsToDesignSettings
     * @throws \Exception
     */
    public function saveOnboardingWidgetStyle(Storage $colorStorage): bool
    {
        $widgetStyleSettings = [
            'theme_settings' => array_filter([ // Remove empty values, defaults will then be used from design.php config
                'booking_nav_bg_color' => $colorStorage->getString('primary_color'),
                'sb_company_label_color' => $colorStorage->getString('primary_color'),
                'btn_color_1' => $colorStorage->getString('primary_color'),
                'sb_base_color' => $colorStorage->getString('secondary_color'),
                'sb_busy' => $colorStorage->getString('secondary_color'),
                'sb_available' => $colorStorage->getString('active_color'),
            ])
        ];

        return $this->saveSettings($widgetStyleSettings);
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
     * Each field id will be saved as a key->value pair in the settings. Which
     * means we can set the value of the field accordingly. Fields that pass
     * this method can be found in config/fields
     */
    public function insertDesignSettings(array $field, string $id, string $group): array
    {
        if ($group !== 'design') {
            return $field;
        }

        $designSettings = $this->service->getDesignOptions();

        if (!isset($designSettings[$id])) {
            return $field;
        }

        // If sub_settings are set we will add the value of this sub_setting
        // instead of adding a value to the parent field. See theme_settings
        // in design.php for an example.
        if (!empty($field['sub_settings'])) {
            $field['sub_settings'] = array_map(function ($subField) use ($designSettings, $id) {
                if (isset($designSettings[$id][$subField['id']])) {
                    $subField['value'] = $designSettings[$id][$subField['id']];
                }
                return $subField;
            }, $field['sub_settings']);

            return $field;
        }

        $field['value'] = $designSettings[$id];
        return $field;
    }

}
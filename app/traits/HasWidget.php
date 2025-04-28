<?php

namespace SimplyBook\Traits;

use SimplyBook\App;
use SimplyBook\Http\Endpoints\WidgetEndpoint;

trait HasWidget
{
    use LegacyLoad;

    /**
     * Get the widget settings. These contain the preferences set by the user in
     * the widget settings page.
     */
    protected function getWidgetSettings(): array
    {
        $designSettings = get_option('simplybook_design_settings', []);
        $designSettings['server'] = $this->getServerURL();

        $configCanBeLoaded = (doing_action('init') || did_action('init'));
        if ($configCanBeLoaded === false) {
            return $designSettings; // Prevents translation issues
        }

        // Add default values from the design config
        $designConfig = App::fields()->get('design');
        foreach ($designConfig as $setting => $config) {
            if (!isset($designSettings[$setting]) && isset($config['default']) && !isset($config['sub_settings'])) {
                $designSettings[$setting] = $config['default'];
            }

            if (!empty($config['sub_settings'])) {
                foreach ($config['sub_settings'] as $subSetting) {

                    if (isset($designSettings[$setting][$subSetting['id']]) || empty($subSetting['default'])) {
                        continue;
                    }

                    $designSettings[$setting][$subSetting['id']] = $subSetting['default'];
                }
            }
        }

        return $designSettings;
    }

    /**
     * Get fallback settings for the widget. These are based on the default
     * values from the design.php config file. Colors can be set when the widget
     * is loaded in the onboarding {@see WidgetEndpoint::getPreviewWidget}
     *
     * @internal ONLY use this method if the user has not set any preferences
     * yet. This can be the case in the onboarding process.
     */
    protected function getFallbackSettings(string $primary = '', string $secondary = '', string $active = ''): array
    {
        $defaultDesignSettings = $this->getDefaultDesignSettings($primary, $secondary, $active);
        return array_merge($defaultDesignSettings, [
            'server' => $this->getServerURL(),
            'theme' => 'default',
            'predefined' => [],
        ]);
    }

    protected function getDefaultDesignSettings(string $primary = '', string $secondary = '', string $active = ''): array
    {
        $designConfig = App::fields()->get('design');
        $defaultDesignSettings = [];
        foreach ($designConfig as $setting => $config) {

            if (isset($config['default'])) {
                $defaultDesignSettings[$setting] = $config['default'];
            }

            // This could be the theme_settings config for example
            if (isset($config['sub_settings'])) {
                foreach ($config['sub_settings'] as $subSetting) {
                    if (empty($subSetting['id'])) {
                        continue;
                    }

                    $subSettingID = $subSetting['id'];

                    // First set the default value from the config
                    if (isset($subSetting['default'])) {
                        $defaultDesignSettings[$setting][$subSettingID] = $subSetting['default'];
                    }

                    // Override sub setting value when marked as primary and
                    // primary color is set
                    if (isset($subSetting['is_primary']) && $subSetting['is_primary'] && !empty($primary)) {
                        $defaultDesignSettings[$setting][$subSettingID] = $primary;
                    }

                    // Override sub setting value when marked as secondary and
                    // secondary color is set
                    if (isset($subSetting['is_secondary']) && $subSetting['is_secondary'] && !empty($secondary)) {
                        $defaultDesignSettings[$setting][$subSettingID] = $secondary;
                    }

                    // Override sub setting value when marked as active and
                    // active color is set
                    if (isset($subSetting['is_active']) && $subSetting['is_active'] && !empty($active)) {
                        $defaultDesignSettings[$setting][$subSettingID] = $active;
                    }
                }
            }
        }

        return $defaultDesignSettings;
    }

    /**
     * Get the server URL
     */
    protected function getServerURL(): string {
        $domain = $this->get_domain();
        $login = get_option('simplybook_company_login', '');
        return "https://$login.$domain";
    }

}
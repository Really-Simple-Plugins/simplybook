<?php

namespace SimplyBook\Services;

use SimplyBook\App;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Exceptions\FormException;

class DesignSettingsService
{
    use LegacySave;

    /**
     * Lazy-loaded theme color service for WordPress color palette extraction.
     * Provides default colors when users haven't set preferences.
     * 
     */
    private ?ThemeColorService $themeColorService = null;

    /**
     * Property to cache the configuration for the design settings. Do not use
     * this property directly, instead us the method
     * {@see getDesignConfiguration} to be sure you get the latest
     * configuration.
     */
    protected array $config = [];

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
     * Get the configuration for the design settings. This is used to validate
     * the settings.
     */
    public function getDesignConfiguration()
    {
        if (empty($this->config)) {
            $this->config = App::fields()->get('design');
            return $this->config;
        }

        return $this->config;
    }

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

        $designOptions = get_option($this->designOptionsKey, []);
        if (!is_array($designOptions)) {
            $designOptions = [];
        }

        $designOptions['server'] = $this->getServerURL();

        $configCanBeLoaded = (doing_action('init') || did_action('init'));
        if ($configCanBeLoaded === false) {
            return $designOptions; // Prevents translation issues, dont cache
        }

        // Append default values from the design config, prioritize saved values
        $designOptions = array_merge($this->getDefaultDesignSettings(), $designOptions);

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

            $currentSettings[$key] = (is_bool($value) ? $value : sanitize_text_field($value));
        }

        return $currentSettings;
    }

    /**
     * Validate the settings based on the config. This method will throw an
     * exception if the settings do not match the config.
     * @throws \Exception
     */
    public function validateSettings(array $settings): bool
    {
        $errors = [];

        $designConfiguration = $this->getDesignConfiguration();

        foreach ($settings as $key => $value) {
            if (empty($designConfiguration[$key])) {
                continue; // No config so no validating. We manage the config so this is safe enough.
            }

            $config = $designConfiguration[$key];

            // No type so no validating. We manage the config so this is safe enough.
            if (empty($config['type'])) {
                continue;
            }

            // No validation callback so no validating. We manage the config so this is safe enough.
            if (!empty($config['validate']) && !is_callable($config['validate'])) {
                continue;
            }

            $invalid = false;
            $errorMessage = esc_html__('Invalid value for setting', 'simplybook') . ': ' . ($config['label'] ?? $config['id']);

            // Saved value does not match regex
            if (!empty($config['regex']) && (preg_match($config['regex'], $value) !== 1)) {
                $invalid = true;
            }

            // Saved value is not one of our options
            if (($config['type'] === 'select') && !isset($config['options'][$value])) {
                $invalid = true;
            }

            // No hex color received from colorpicker
            if (($config['type'] === 'colorpicker') && empty(sanitize_hex_color($value))) {
                $invalid = true;
            }

            // If email is not empty, but not a valid email
            if (($config['type'] === 'email') && !empty($value) && !is_email($value)) {
                $invalid = true;
            }

            // If url is not empty, but not a valid url
            if (($config['type'] === 'url') && !empty($value) && !filter_var($value, FILTER_VALIDATE_URL)) {
                $invalid = true;
            }

            // If number is not empty, but not a valid number
            if (($config['type'] === 'number') && !empty($value) && !is_numeric($value)) {
                $invalid = true;
            }

            // If text is not empty, but not a valid string
            if (($config['type'] === 'text') && (empty(sanitize_text_field($value)) || !is_string($value))) {
                $invalid = true;
            }

            // Validate via the callable function
            if (!empty($config['validate']) && is_callable($config['validate'])) {
                $result = call_user_func($config['validate'], $value);
                if ($result !== true) {
                    $invalid = true;
                }
            }

            if ($invalid) {
                $errors[] = [
                    'key' => $key,
                    'message' => $errorMessage,
                ];
            }

        }

        if (!empty($errors)) {
            throw (new FormException())->setErrors($errors);
        }

        return true;
    }

    /**
     * Get fallback settings for the widget. These are based on the default
     * values from the design.php config file. Colors can be set when the widget
     * is loaded in the onboarding {@see WidgetEndpoint::getPreviewWidget}
     *
     * @internal ONLY use this method if the user has not set any preferences
     * yet. This can be the case in the onboarding process.
     */
    public function getFallbackSettings(string $primary = '', string $secondary = '', string $active = ''): array
    {
        $defaultDesignSettings = $this->getDefaultDesignSettings($primary, $secondary, $active);
        return array_merge($defaultDesignSettings, [
            'server' => $this->getServerURL(),
            'theme' => 'default',
            'predefined' => [],
        ]);
    }

    /**
     * Get theme color service with lazy initialization.
     * 
     * Creates instance only when needed for efficient resource usage.
     * 
     */
    public function getThemeColorService(): ThemeColorService
    {
	    if ($this->themeColorService instanceof ThemeColorService === false) {
            $this->themeColorService = new ThemeColorService();
        }
        
        return $this->themeColorService;
    }

    /**
     * Get the default design settings from the design.php config file. The
     * color parameters can be used to override the default values for primary,
     * secondary and active colors. This is used in the onboarding process when
     * the user sets colors for the widget.
     *
     * @internal Do NOT use this method before the `init` hook.
     */
    private function getDefaultDesignSettings(string $primary = '', string $secondary = '', string $active = ''): array
    {
        $designConfig = App::fields()->get('design');
        $defaultDesignSettings = [];
        
        // Get theme colors if no specific colors are provided
        if (empty($primary) && empty($secondary) && empty($active)) {
            $themeColors = $this->getThemeColorService()->getThemeColors();
            $primary = $themeColors['primary'];
            $secondary = $themeColors['secondary'];
            $active = $themeColors['active'];
        }
        
        foreach ($designConfig as $settingID => $config) {

            if (isset($config['default'])) {
                $defaultDesignSettings[$settingID] = $config['default'];
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
                        $defaultDesignSettings[$settingID][$subSettingID] = $subSetting['default'];
                    }

                    // Override sub setting value when marked as primary and
                    // primary color is set
                    if (isset($subSetting['is_primary']) && $subSetting['is_primary'] && !empty($primary)) {
                        $defaultDesignSettings[$settingID][$subSettingID] = $primary;
                    }

                    // Override sub setting value when marked as secondary and
                    // secondary color is set
                    if (isset($subSetting['is_secondary']) && $subSetting['is_secondary'] && !empty($secondary)) {
                        $defaultDesignSettings[$settingID][$subSettingID] = $secondary;
                    }

                    // Override sub setting value when marked as active and
                    // active color is set
                    if (isset($subSetting['is_active']) && $subSetting['is_active'] && !empty($active)) {
                        $defaultDesignSettings[$settingID][$subSettingID] = $active;
                    }
                }
            }
        }

        return $defaultDesignSettings;
    }

    /**
     * Get the server URL
     */
    public function getServerURL(): string
    {
        // Setting the validation to false prevents exceeding the maximum
        // execution time when the server URL is not set.
        $domain = $this->get_domain(false);
        $login = get_option('simplybook_company_login', '');

        if (empty($login)) {
            return '';
        }

        return "https://$login.$domain";
    }

}
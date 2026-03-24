<?php

namespace SimplyBook\Services;

use SimplyBook\Bootstrap\App;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Exceptions\FormException;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;

/**
 * @SuppressWarnings("PHPMD.ExcessiveClassComplexity")
 */
class DesignSettingsService
{
    use LegacySave;

    protected GeneralConfig $config;

    public function __construct(GeneralConfig $config)
    {
        $this->config = $config;
    }

    /**
     * Lazy-loaded theme color service for WordPress color palette extraction.
     * Provides default colors when users haven't set preferences.
     *
     */
    private ?ThemeColorService $themeColorService = null;

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
    public function getDesignOptions(): array
    {
        $found = false;
        $cacheName = 'design_settings';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
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

        wp_cache_set($cacheName, $designOptions, 'simplybook', 60);
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
    public function handleLegacyDesignUpgrade(): void
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

        $designConfiguration = $this->config->get('fields.design');

        foreach ($settings as $key => $value) {
            if (empty($designConfiguration[$key])) {
                continue; // No config so no validating. We manage the config so this is safe enough.
            }

            $error = $this->validateField($key, $value, $designConfiguration[$key]);
            if ($error !== null) {
                $errors[] = $error;
            }
        }

        if (!empty($errors)) {
            throw (new FormException())->setErrors($errors);
        }

        return true;
    }

    /**
     * Validate a single field against its configuration. Returns an error
     * array or null when the value is valid.
     *
     * @param mixed $value
     */
    private function validateField(string $key, $value, array $config): ?array
    {
        // No type so no validating. We manage the config so this is safe enough.
        if (empty($config['type'])) {
            return null;
        }

        // No validation callback so no validating. We manage the config so this is safe enough.
        if (!empty($config['validate']) && !is_callable($config['validate'])) {
            return null;
        }

        $isInvalid = $this->isFieldValueInvalid($value, $config);

        if ($isInvalid) {
            $errorMessage = __('Invalid value for setting', 'simplybook') . ': ' . ($config['label'] ?? $config['id']);
            return ['key' => $key, 'message' => $errorMessage];
        }

        return null;
    }

    /**
     * Check if a field value is invalid based on regex, type, and callable
     * validation rules.
     *
     * @param mixed $value
     */
    private function isFieldValueInvalid($value, array $config): bool
    {
        // Saved value does not match regex
        if (!empty($config['regex']) && (preg_match($config['regex'], $value) !== 1)) {
            return true;
        }

        $typeValidators = $this->getTypeValidators();
        if (isset($typeValidators[$config['type']])) {
            $isValid = $typeValidators[$config['type']]($value, $config);
            if (!$isValid) {
                return true;
            }
        }

        // Validate via the callable function
        if (!empty($config['validate']) && is_callable($config['validate'])) {
            $result = call_user_func($config['validate'], $value);
            if ($result !== true) {
                return true;
            }
        }

        return false;
    }

    /**
     * Map of type => validator callable for design setting field types.
     */
    private function getTypeValidators(): array
    {
        return [
            'select' => fn($value, $config) => isset($config['options'][$value]),
            'colorpicker' => fn($value, $config) => !empty(sanitize_hex_color($value)),
            'email' => fn($value, $config) => empty($value) || is_email($value),
            'url' => fn($value, $config) => empty($value) || filter_var($value, FILTER_VALIDATE_URL),
            'number' => fn($value, $config) => empty($value) || is_numeric($value),
            'text' => fn($value, $config) => !empty(sanitize_text_field($value)) && is_string($value),
        ];
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
     * Get theme color service with lazy initialization. Creates instance only
     * when needed for efficient resource usage.
     */
    public function getThemeColorService(): ThemeColorService
    {
        if ($this->themeColorService instanceof ThemeColorService === false) {
            $this->themeColorService = App::getInstance()->get(ThemeColorService::class);
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
        $designConfig = $this->config->get('fields.design');
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
                $defaultDesignSettings[$settingID] = $this->processSubSettings(
                    $config['sub_settings'],
                    $primary,
                    $secondary,
                    $active,
                    ($defaultDesignSettings[$settingID] ?? [])
                );
            }
        }

        return $defaultDesignSettings;
    }

    /**
     * Process sub_settings for a design config entry, applying defaults and
     * color overrides.
     *
     * @param mixed $existingValues
     */
    private function processSubSettings(array $subSettings, string $primary, string $secondary, string $active, $existingValues = []): array
    {
        $result = is_array($existingValues) ? $existingValues : [];

        foreach ($subSettings as $subSetting) {
            if (empty($subSetting['id'])) {
                continue;
            }

            $subSettingID = $subSetting['id'];

            // First set the default value from the config
            if (isset($subSetting['default'])) {
                $result[$subSettingID] = $subSetting['default'];
            }

            $colorOverride = $this->getColorOverride($subSetting, $primary, $secondary, $active);
            if ($colorOverride !== null) {
                $result[$subSettingID] = $colorOverride;
            }
        }

        return $result;
    }

    /**
     * Check if a sub setting should be overridden with a color value.
     * Returns the color string or null when no override applies.
     */
    private function getColorOverride(array $subSetting, string $primary, string $secondary, string $active): ?string
    {
        $colorMap = [
            'is_primary' => $primary,
            'is_secondary' => $secondary,
            'is_active' => $active,
        ];

        foreach ($colorMap as $flag => $color) {
            if (!empty($color) && !empty($subSetting[$flag])) {
                return $color;
            }
        }

        return null;
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

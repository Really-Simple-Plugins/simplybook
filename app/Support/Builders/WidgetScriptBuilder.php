<?php

namespace SimplyBook\Support\Builders;

use SimplyBook\Bootstrap\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;

class WidgetScriptBuilder
{
    use HasViews;
    use HasAllowlistControl;

    protected EnvironmentConfig $env;
    protected GeneralConfig $config;

    protected string $widgetType = '';
    protected string $wrapperID = '';
    protected array $attributes = [];
    protected array $widgetSettings = [];
    protected bool $isAuthenticated = true;

    protected array $acceptedWidgetTypes = [
        'calendar',
        'reviews',
        'booking-button'
    ];

    protected array $acceptedAttributes = [
        'location',
        'category',
        'provider',
        'service'
    ];

    /**
     * Bind the environment dependency without asking for it as parameter
     */
    public function __construct()
    {
        $this->env = App::getInstance()->get(EnvironmentConfig::class);
        $this->config = App::getInstance()->get(GeneralConfig::class);
    }

    /**
     * Build the widget HTML based on the given type, settings and attributes.
     * The HTML is a container element that carries the widget configuration
     * as JSON in a data attribute. A separate script reads the configuration
     * and starts the widget.
     *
     * @throws BuilderException
     */
    public function build(): string
    {
        $config = wp_json_encode(
            $this->buildConfig(),
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT | JSON_HEX_APOS
        );

        if ($config === false) {
            throw new BuilderException('Failed to encode widget configuration');
        }

        $html = $this->view('public/widget', [
            'wrapperID' => $this->wrapperID,
            'config' => $config,
        ]);

        if ($this->showDemoWidget()) {
            return $this->getDemoWidgetAlert() . $html;
        }

        return $html;
    }

    /**
     * Build a widget configuration based on the given settings.
     * The configuration is used to initialize the widget.
     * @throws BuilderException
     */
    public function buildConfig(): array
    {
        if (empty($this->widgetType) || empty($this->widgetSettings)) {
            throw new BuilderException('Widget not set up correctly');
        }

        $widgetConfig = $this->config->get('widgets.' . $this->widgetType, []);

        if (empty($widgetConfig) || !isset($widgetConfig['settings'])) {
            throw new BuilderException('Widget configuration not found');
        }

        $settings = $this->getWidgetSettings();

        // Set static config first: are set as is since it's not a user setting
        $staticConfig = $widgetConfig['static'] ?? [];

        $config = array_merge(
            $staticConfig,
            $this->mapSettings($widgetConfig['settings'], $settings)
        );

        return $this->escapeSettings($config);
    }

    /**
     * Map the widget settings to the widget configuration. The mapping is
     * defined in the widget configuration file. The mapping can be nested.
     */
    private function mapSettings(array $mapping, array $settings): array
    {
        return array_map(function ($settingName) use ($settings) {
            return is_array($settingName)
                ? $this->mapSettings($settingName, $settings)
                : ($settings[$settingName] ?? '');
        }, $mapping);
    }

    /**
     * Set the widget type
     * @throws BuilderException
     */
    public function setWidgetType(string $widgetType): WidgetScriptBuilder
    {
        if (!in_array($widgetType, $this->acceptedWidgetTypes)) {
            throw new BuilderException('Invalid widget type');
        }

        $this->widgetType = $widgetType;
        return $this;
    }

    /**
     * Set the ID of the element that holds the widget
     */
    public function setWrapperID(string $wrapperID): WidgetScriptBuilder
    {
        $this->wrapperID = $wrapperID;
        return $this;
    }

    /**
     * Set the widget settings
     */
    public function setWidgetSettings(array $widgetSettings): WidgetScriptBuilder
    {
        $this->widgetSettings = $widgetSettings;
        return $this;
    }

    /**
     * Set and sanitize the attributes
     */
    public function setAttributes(array $attributes): WidgetScriptBuilder
    {
        $this->attributes = $this->sanitizeAttributes($attributes, true);
        return $this;
    }

    /**
     * Set the authenticated flag. If set to false, the widget will be
     * displayed as a demo widget.
     */
    public function isAuthenticated(bool $authenticated): WidgetScriptBuilder
    {
        $this->isAuthenticated = $authenticated;
        return $this;
    }

    /**
     * Sanitize an array of attributes by removing all attributes that are
     * not in the accepted attributes list and sanitizing the keys and values.
     *
     * @since 3.1.1 Removed array_unique() on the return value to prevent
     * removing an attribute, like "provider", with the same ID as another
     * attribute, like "service".
     */
    private function sanitizeAttributes(array $attributes, bool $lowercase = false): array
    {
        if ($lowercase) {
            $attributes = array_change_key_case($attributes, CASE_LOWER);
        }

        $sanitizedAttributes = [];
        foreach ($attributes as $attribute => $value) {
            if (!in_array($attribute, $this->acceptedAttributes)) {
                continue;
            }

            $sanitizedAttributes[sanitize_text_field($attribute)] = sanitize_text_field($value);
        }
        return $sanitizedAttributes;
    }

    /**
     * Escape a setting value for the HTML sinks in the remote widget script.
     * The widget decodes the JSON and writes the values into an iframe
     * attribute with innerHTML. Arrays are escaped recursively. Empty values
     * become an empty string.
     *
     * @internal The entities must survive the HTML attribute in the view.
     * The browser decodes entities in the attribute once, so build() encodes
     * the JSON with JSON_HEX_* flags to keep these entities out of the HTML.
     *
     * @param mixed $setting
     * @return array|string
     */
    private function escapeSettings($setting)
    {
        if (is_array($setting)) {
            return array_map([$this, 'escapeSettings'], $setting);
        }

        $decoded = json_decode((string) $setting, true);
        if (is_array($decoded)) {
            return (string) wp_json_encode(
                array_map([$this, 'escapeSettings'], $decoded),
            );
        }

        return esc_attr((string) $setting);
    }

    /**
     * Get the widget settings. Method adds the given attributes by the plugin
     * user as predefined settings.
     */
    private function getWidgetSettings(): array
    {
        $widgetSettings = $this->widgetSettings;
        $widgetSettings['predefined'] = [];

        foreach ($this->acceptedAttributes as $attribute) {
            if (isset($this->attributes[$attribute])) {
                $widgetSettings['predefined'][$attribute] = $this->attributes[$attribute];
            }
        }

        if ($this->showDemoWidget($widgetSettings)) {
            $widgetSettings['server'] = $this->getDemoWidgetServerUrl();
        }

        return $widgetSettings;
    }

    /**
     * Get the demo widget server URL
     */
    private function getDemoWidgetServerUrl(): string
    {
        return $this->env->getUrl('simplybook.demo_widget_server_url');
    }

    /**
     * Get the demo widget alert HTML
     */
    private function getDemoWidgetAlert(): string
    {
        $message = esc_html__('This is a demo SimplyBook.me widget.', 'simplybook');

        if ($this->userCanManage()) {
            $message .= ' ' . sprintf(
                /* translators: %1$s is the opening HTML tag, %2$s is the closing HTML tag */
                esc_html__('You can configure the plugin settings to display your customized widget %1$shere%2$s.', 'simplybook'),
                '<a href="' . $this->env->getUrl('plugin.dashboard_url') . '">',
                '</a>'
            );
        }

        return $this->view('public/demo-alert', [
            'title' => esc_html__('Notice', 'simplybook'),
            'message' => $message,
        ]);
    }

    /**
     * The demo widget should be shown if the server URL is not set in the
     * widget settings. This is used to display a demo widget when the
     * plugin is not configured yet.
     *
     * @internal The widget works even when the plugin lost connection to the
     * SimplyBook account of the user so that is not a condition to show the
     * demo widget.
     */
    public function showDemoWidget(?array $widgetSettings = null): bool
    {
        $widgetSettings = $widgetSettings ?? $this->widgetSettings;
        return empty($widgetSettings['server']);
    }
}

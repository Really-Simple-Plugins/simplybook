<?php

namespace SimplyBook\Builders;

use SimplyBook\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\BuilderException;

class WidgetScriptBuilder
{
    use HasViews;
    use HasAllowlistControl;

    protected bool $withHTML = false;
    protected string $widgetType = '';
    protected string $widgetTemplate = '';
    protected array $attributes = [];
    protected string $wrapperID = '';
    protected bool $hasWrapper = false;
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
     * Build the widget based on the given type, settings and attributes
     * @throws BuilderException
     */
    public function build(): string
    {
        if (empty($this->widgetType) || empty($this->widgetSettings)) {
            throw new BuilderException('Widget not set up correctly');
        }

        $script = $this->getWidgetScript();

        if ($this->withHTML) {
            return $this->getWrappedScriptHTML($script);
        }

        if ($this->showDemoWidget()) {
            return $this->getDemoWidgetAlert() . $script;
        }

        return $script;
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

        $this->setWidgetTemplate($widgetType);
        $this->widgetType = $widgetType;
        return $this;
    }

    /**
     * Set the wrapper ID. If this method is not used the {@see build} method
     * will not create HTML for the wrapper.
     */
    public function setWrapperID(string $wrapperID): WidgetScriptBuilder
    {
        $this->wrapperID = sanitize_text_field($wrapperID);
        $this->hasWrapper = true;
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
     * Set with HTML flag.
     */
    public function withHTML(): WidgetScriptBuilder
    {
        $this->withHTML = true;
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
     * Set the widget template
     * @throws BuilderException
     */
    private function setWidgetTemplate(string $widgetType): void
    {
        $widgetTypeTemplate = App::env('plugin.assets_path') . 'js/widgets/' . $widgetType . '.js';
        if (!file_exists($widgetTypeTemplate)) {
            throw new BuilderException('Widget template not found');
        }

        ob_start();
        include $widgetTypeTemplate;
        $script = ob_get_clean();

        $this->widgetTemplate = $script;
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
     * Create the widget script based on the widget template and settings. All
     * settings are searched by the setting key and replaced with the value in
     * the template.
     */
    private function getWidgetScript(): string
    {
        $content = $this->widgetTemplate;
        foreach ($this->getWidgetSettings() as $key => $setting) {
            $searchable = '{{ ' . $key . ' }}';

            if (is_array($setting)) {
                $setting = json_encode($setting);
                $searchable = '"{{ ' . $key . ' }}"'; // Also replace the quotes
            }

            // This will work the same as a false value. Therefor it is not an
            // issue that the empty check triggers for these false(y) values.
            if (empty($setting)) {
                $setting = '';
            }

            $content = str_replace($searchable, $setting, $content);
        }

        return $content;
    }

    /**
     * Create HTML for the widget script given via the parameter
     */
    private function getWrappedScriptHTML(string $script): string
    {
        $content = '';

        if ($this->showDemoWidget()) {
            $content = $this->getDemoWidgetAlert();
        }

        if ($this->hasWrapper) {
            $content .= sprintf('<div id="%s"></div>', $this->wrapperID);
        }

        $content .= sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
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
        return App::env('simplybook.demo_widget_server_url');
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
                '<a href="' . esc_url(App::env('plugin.dashboard_url')) . '">',
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
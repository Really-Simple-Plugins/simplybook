<?php

namespace SimplyBook\Builders;

use SimplyBook\App;
use SimplyBook\Exceptions\BuilderException;

class WidgetScriptBuilder
{
    protected bool $withHTML = false;
    protected string $widgetType = '';
    protected string $widgetTemplate = '';
    protected array $attributes = [];
    protected string $wrapperID = '';
    protected bool $hasWrapper = false;
    protected array $widgetSettings = [];

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

    protected string $fallbackAttribute = 'location';

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

    public function withHTML(): WidgetScriptBuilder
    {
        $this->withHTML = true;
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
     * Sanitize an array of attributes
     */
    private function sanitizeAttributes(array $attributes, bool $lowercase = false): array
    {
        if ($lowercase) {
            $attributes = array_change_key_case($attributes, CASE_LOWER);
        }

        $sanitized_attributes = [];
        foreach ($attributes as $attribute) {
            $sanitized_attributes[] = $this->sanitizeAttribute($attribute);
        }
        return array_unique( $sanitized_attributes );
    }

    /**
     * Sanitize the attribute
     */
    private function sanitizeAttribute(string $attribute ): string
    {
        return in_array($attribute, $this->acceptedAttributes) ? sanitize_text_field($attribute) : $this->fallbackAttribute;
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
            if (empty($setting) && ($setting != '0')) {
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
        if ($this->hasWrapper) {
            $content = sprintf('<div id="%s"></div>', $this->wrapperID);
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

        foreach ($this->acceptedAttributes as $attribute) {
            if (isset($this->attributes[$attribute])) {
                $widgetSettings['predefined'][$attribute] = $this->attributes[$attribute];
            }
        }

        return $widgetSettings;
    }

}
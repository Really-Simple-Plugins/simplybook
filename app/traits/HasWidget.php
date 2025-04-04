<?php

namespace SimplyBook\Traits;

trait HasWidget
{
    use LegacyLoad;

    /**
     * Get the widget settings. These contain the preferences set by the user in
     * the widget settings page.
     */
    protected function getWidgetSettings(): array
    {
        $fields = $this->get_fields_by_attribute('widget_field', true);
        $widget_fields = [];
        foreach ($fields as $field) {
            if ($field['widget_field'] === '/') {
                $widget_fields[$field['id']] = $this->get_option($field['id']);
            } else {
                $widget_fields[$field['widget_field']][$field['id']] = $this->get_option($field['id']);
            }
        }

        if (isset($widget_fields['predefined']) && !is_array($widget_fields['predefined']) ) {
            $widget_fields['predefined'] = [];
        }

        $widget_fields['server'] = $this->getServerURL();
        return $widget_fields;
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
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
        $designSettings = get_option('simplybook_design_settings', []);
        $designSettings['server'] = $this->getServerURL();
        return $designSettings;
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
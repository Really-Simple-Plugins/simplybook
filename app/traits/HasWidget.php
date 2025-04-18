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
     * Get fallback settings for the widget. These are used if the user has not
     * set any preferences in the widget settings page.
     */
    protected function getFallbackSettings(string $primary = '#33bb60', string $secondary = '#d1e9c6', string $active = '#d3e0f1'): array
    {
        return [
            'server' => $this->getServerURL(),
            'theme' => 'default',
            'timeline_type' => 'modern',
            'datepicker' => 'top_calendar',
            'is_rtl' => is_rtl(),
            'clear_session' => '1',
            'allow_switch_to_ada' => '0',
            'predefined' => [],
            'theme_settings' => [
                'timeline_show_end_time' => '0',
                'timeline_hide_unavailable' => '1',
                'hide_past_days' => '0',
                'hide_img_mode' => '1',
                'show_sidebar' => '1',
                'timeline_modern_display' => 'as_slots',
                'display_item_mode' => 'block',
                'sb_base_color' => $secondary,
                'booking_nav_bg_color' => $primary,
                'body_bg_color' => '#f7f7f7',
                'dark_font_color' => '#494949',
                'light_font_color' => '#ffffff',
                'btn_color_1' => $primary,
                'sb_company_label_color' => $primary,
                'sb_busy' => $secondary,
                'sb_available' => $active,
                'sb_review_image' => '',
                'hide_company_label' => '0',
                'link_color' => '#e49092',
            ]
        ];
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
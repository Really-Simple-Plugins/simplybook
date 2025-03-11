<?php
namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Builders\WidgetScriptBuilder;
use SimplyBook\Interfaces\ControllerInterface;

class WidgetController implements ControllerInterface
{
    use LegacyLoad;

    public function register()
    {
        add_shortcode('simplybook_widget', [$this, 'renderCalendarWidget']);
        add_shortcode('simplybook_reviews', [$this, 'renderReviewsWidget']);
        add_shortcode('simplybook_booking_button', [$this, 'renderBookingButton']);
    }

    /**
     * Process the calendar widget shortcode
     */
    public function renderCalendarWidget(array $attributes = []): string
    {
        return $this->loadWidgetScriptTemplate('calendar', $attributes, 'sbw_z0hg2i');
    }

    /**
     * Process the reviews widget shortcode
     */
    public function renderReviewsWidget(array $attributes = []): string
    {
        return $this->loadWidgetScriptTemplate('reviews', $attributes);
    }

    /**
     * Process the booking button shortcode
     */
    public function renderBookingButton(array $attributes = []): string
    {
        return $this->loadWidgetScriptTemplate('booking-button', $attributes);
    }

    /**
     * Load the widget script template dynamically
     * @uses \SimplyBook\Builders\WidgetScriptBuilder
     */
    private function loadWidgetScriptTemplate(string $widgetType, array $attributes, string $wrapperID = ''): string
    {
        try {
            $builder = new WidgetScriptBuilder();
            $builder->setWidgetType($widgetType)
                ->setAttributes($attributes)
                ->setWidgetSettings($this->getWidgetSettings());

            if (!empty($wrapperID)) {
                $builder->setWrapperID($wrapperID);
            }

            $content = $builder->build();
        } catch (BuilderException $e) {
            return '';
        }

        $this->enqueueRemoteWidgetScript();
        return $content;
    }

    /**
     * Get the widget settings. These contain the preferences set by the user in
     * the widget settings page.
     */
    private function getWidgetSettings(): array
    {
        $fields = $this->get_fields_by_attribute( 'widget_field', true );
        $widget_fields = [];
        foreach ( $fields as $field ) {
            if ( $field['widget_field'] === '/') {
                $widget_fields[ $field['id'] ] = $this->get_option( $field['id'] );
            } else {
                $widget_fields[ $field['widget_field'] ][ $field['id'] ] = $this->get_option( $field['id'] );
            }
        }
        $widget_fields['is_rtl'] = (int) is_rtl();

        if (isset($widget_fields['predefined']) && !is_array($widget_fields['predefined']) ) {
            $widget_fields['predefined'] = [];
        }

        $widget_fields['server'] = $this->getServerURL();
        return $widget_fields;
    }

    /**
     * Get the server URL
     */
    private function getServerURL(): string {
        $domain = $this->get_option('domain');
        $login = get_option('simplybook_company_login', '');
        return "https://$login.$domain";
    }

    /**
     * Enqueue the remote widget script
     */
    private function enqueueRemoteWidgetScript(): void
    {
        wp_enqueue_script('simplybook_widget_scripts', App::env('simplybook.widget_script_url'), [], App::env('simplybook.widget_script_version'));
        wp_enqueue_script('simplybook_widget_scripts');
    }
}
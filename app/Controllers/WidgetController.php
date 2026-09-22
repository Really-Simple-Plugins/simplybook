<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\DesignSettingsService;
use SimplyBook\Support\Builders\WidgetScriptBuilder;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class WidgetController implements ControllerInterface
{
    use LegacyLoad;

    private EnvironmentConfig $env;
    protected DesignSettingsService $service;

    public function __construct(EnvironmentConfig $env, DesignSettingsService $service)
    {
        $this->env = $env;
        $this->service = $service;
    }

    public function register(): void
    {
        add_shortcode('simplybook_widget', [$this, 'renderCalendarWidget']);

        // Removed since: NL14RSP2-219 - kept for reference
        // add_shortcode('simplybook_reviews', [$this, 'renderReviewsWidget']);

        // Removed since: NL14RSP2-220 - kept for reference
        // add_shortcode('simplybook_booking_button', [$this, 'renderBookingButton']);
    }

    /**
     * Process the calendar widget shortcode
     */
    public function renderCalendarWidget(array $attributes = []): string
    {
        if (!is_admin()) {
            Event::dispatch(Event::CALENDAR_PUBLISHED);
        }

        return $this->loadWidgetScriptTemplate('calendar', $attributes, 'sbw_z0hg2i_calendar');
    }

    /**
     * Process the reviews widget shortcode
     */
    public function renderReviewsWidget(array $attributes = []): string
    {
        return $this->loadWidgetScriptTemplate('reviews', $attributes, 'sbw_z0hg2i_reviews');
    }

    /**
     * Process the booking button shortcode
     */
    public function renderBookingButton(array $attributes = []): string
    {
        return $this->loadWidgetScriptTemplate('booking-button', $attributes);
    }

    /**
     * Load the widget HTML and enqueue the scripts that start the widget.
     * @uses \SimplyBook\Support\Builders\WidgetScriptBuilder
     */
    private function loadWidgetScriptTemplate(string $widgetType, array $attributes, string $id = ''): string
    {
        try {
            $content = (new WidgetScriptBuilder())
                ->setWidgetType($widgetType)
                ->setId($id)
                ->setAttributes($attributes)
                ->setWidgetSettings($this->service->getDesignOptions())
                ->build();
        } catch (BuilderException $e) {
            return '';
        }

        $this->enqueueWidgetScripts();
        return $content;
    }

    /**
     * Enqueue the remote widget script and the local loader script. The
     * remote script goes in the header. The widgets depend on it, so the
     * page needs it as soon as possible. The local loader script goes in the
     * footer and depends on the remote script.
     */
    private function enqueueWidgetScripts(): void
    {
        wp_enqueue_script(
            'simplybook_widget_scripts',
            $this->env->getUrl('simplybook.widget_script_url'),
            [],
            $this->env->getString('simplybook.widget_script_version'),
            false
        );

        wp_enqueue_script(
            'simplybook_widget_loader',
            $this->env->getUrl('plugin.assets_url') . 'js/widget/simplybook-widget.js',
            ['simplybook_widget_scripts'],
            $this->env->getString('plugin.version'),
            true
        );
    }
}

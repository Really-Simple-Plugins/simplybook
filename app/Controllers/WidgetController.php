<?php

namespace SimplyBook\Controllers;

use SimplyBook\Http\ApiClient;
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

    private ApiClient $client;
    private EnvironmentConfig $env;
    protected DesignSettingsService $service;

    public function __construct(ApiClient $client, EnvironmentConfig $env, DesignSettingsService $service)
    {
        $this->client = $client;
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
     * Load the widget script template dynamically
     * @uses \SimplyBook\Builders\WidgetScriptBuilder
     */
    private function loadWidgetScriptTemplate(string $widgetType, array $attributes, string $wrapperID = ''): string
    {
        try {
            $builder = new WidgetScriptBuilder();
            $builder->setWidgetType($widgetType)
                ->setAttributes($attributes)
                ->setWidgetSettings($this->service->getDesignOptions())
                ->isAuthenticated(
                    $this->client->isAuthenticated()
                )
                ->withHTML();

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
     * Enqueue the remote widget script in the header. Its needed as soon as
     * possible as the widgets are dependent on it.
     */
    private function enqueueRemoteWidgetScript(): void
    {
        wp_enqueue_script('simplybook_widget_scripts', $this->env->getUrl('simplybook.widget_script_url'), [], $this->env->getString('simplybook.widget_script_version'), false);
    }
}

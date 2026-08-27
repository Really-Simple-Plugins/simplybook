<?php

namespace SimplyBook\Controllers;

use SimplyBook\Http\ApiClient;
use SimplyBook\Controllers\Gutenberg\BlockPreviewController;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\DesignSettingsService;
use SimplyBook\Support\Builders\WidgetScriptBuilder;

class WidgetController implements ControllerInterface
{
    use LegacyLoad;

    private ApiClient $client;
    protected DesignSettingsService $service;

    public function __construct(ApiClient $client, DesignSettingsService $service)
    {
        $this->client = $client;
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

        return $this->renderWidget('calendar', $attributes, 'sbw_z0hg2i_calendar');
    }

    /**
     * Process the reviews widget shortcode
     */
    public function renderReviewsWidget(array $attributes = []): string
    {
        return $this->renderWidget('reviews', $attributes, 'sbw_z0hg2i_reviews');
    }

    /**
     * Process the booking button shortcode
     */
    public function renderBookingButton(array $attributes = []): string
    {
        return $this->renderWidget('booking-button', $attributes);
    }

    /**
     * Render a widget for shortcode output and enqueue its remote dependency.
     *
     * @uses \SimplyBook\Support\Builders\WidgetScriptBuilder
     */
    private function renderWidget(string $widgetType, array $attributes, string $wrapperID = ''): string
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
        wp_enqueue_script(BlockPreviewController::WIDGET_SCRIPT_HANDLE);
    }
}

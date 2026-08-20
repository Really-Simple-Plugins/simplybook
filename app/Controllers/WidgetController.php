<?php

namespace SimplyBook\Controllers;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasViews;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\DesignSettingsService;
use SimplyBook\Support\Builders\WidgetScriptBuilder;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class WidgetController implements ControllerInterface
{
    use LegacyLoad;
    use HasViews;

    public const BLOCK_PREVIEW_ACTION = 'simplybook_block_preview';

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
        add_action('admin_post_' . self::BLOCK_PREVIEW_ACTION, [$this, 'renderBlockPreview']);

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
     * Render a self-contained widget preview for the block editor iframe.
     */
    public function renderBlockPreview(): void
    {
        if (!current_user_can('simplybook_manage')) {
            wp_die(esc_html__('You are not allowed to preview this widget.', 'simplybook'), '', ['response' => 403]);
        }

        check_admin_referer(self::BLOCK_PREVIEW_ACTION);

        $widgetContent = $this->buildWidgetScriptTemplate(
            'calendar',
            $this->getBlockPreviewAttributes(),
            'sbw_z0hg2i_calendar'
        );

        if (empty($widgetContent)) {
            wp_die(esc_html__('The widget preview could not be loaded.', 'simplybook'), '', ['response' => 500]);
        }

        nocache_headers();
        send_nosniff_header();
        send_frame_options_header();
        header('Content-Type: text/html; charset=' . get_option('blog_charset'));
        header('Referrer-Policy: no-referrer');
        header('X-Robots-Tag: noindex, nofollow');

        $this->render('admin/block-preview', [
            'widgetContent' => $widgetContent,
            'widgetScriptUrl' => $this->env->getUrl('simplybook.widget_script_url'),
        ]);
        exit;
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
        $content = $this->buildWidgetScriptTemplate($widgetType, $attributes, $wrapperID);
        if (empty($content)) {
            return '';
        }

        $this->enqueueRemoteWidgetScript();
        return $content;
    }

    /**
     * Build the widget markup without enqueuing it in the current document.
     */
    private function buildWidgetScriptTemplate(string $widgetType, array $attributes, string $wrapperID = ''): string
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

        return $content;
    }

    /**
     * Retrieve and sanitize supported widget attributes from the preview URL.
     */
    private function getBlockPreviewAttributes(): array
    {
        $attributes = [];

        foreach (['location', 'category', 'service', 'provider'] as $attribute) {
            if (!isset($_GET[$attribute])) {
                continue;
            }

            $value = sanitize_text_field(wp_unslash($_GET[$attribute]));
            if (empty($value)) {
                continue;
            }

            if ($attribute === 'provider' && $value === 'any') {
                $attributes[$attribute] = $value;
                continue;
            }

            $value = absint($value);
            if ($value > 0) {
                $attributes[$attribute] = $value;
            }
        }

        return $attributes;
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

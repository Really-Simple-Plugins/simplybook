<?php

namespace SimplyBook\Features\Onboarding\Endpoints;

use Throwable;
use WP_REST_Request;
use WP_REST_Response;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\BookingPageService;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Features\Onboarding\OnboardingService;

class ActionEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private OnboardingService $service;
    private BookingPageService $pages;

    public function __construct(OnboardingService $service, BookingPageService $pages)
    {
        $this->service = $service;
        $this->pages = $pages;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            'onboarding/save_widget_style' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'saveColorsToDesignSettings'],
            ],
            'onboarding/generate_pages' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'generateDefaultPages'],
            ],
            'onboarding/finish_onboarding' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'finishOnboarding'],
            ],
            'onboarding/retry_onboarding' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'retryOnboarding'],
            ],
        ];
    }

    /**
     * Collect saved widget style settings, format them as design settings and
     * pass them to the DesignSettingsController by calling the
     * simplybook_save_onboarding_widget_style action.
     */
    public function saveColorsToDesignSettings(WP_REST_Request $request): WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        /**
         * This action is used to save the widget style settings in the
         * simplybook_design_settings option.
         * @hooked SimplyBook\Features\DesignSettings\DesignSettingsController::saveWidgetStyle
         */
        try {
            do_action('simplybook_save_onboarding_widget_style', $storage);
        } catch (Throwable $e) {
            $message = __('Something went wrong while saving the widget style settings. Please try again.', 'simplybook');
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, $message, 500);
        }

        $message = __('Successfully saved widget style settings', 'simplybook');
        return $this->service->sendHttpResponse([], true, $message);
    }

    /**
     * Generate the booking page with the SimplyBook widget shortcode.
     * Uses a translatable slug and title. WordPress handles slug uniqueness.
     *
     * If page creation fails, this is NOT a blocker for onboarding.
     * The client should show PublishWidgetTask instead of BookingWidgetLiveTask.
     */
    public function generateDefaultPages(): WP_REST_Response
    {
        $pageResult = $this->pages->generateBookingPage();

        return $this->service->sendHttpResponse([
            'page_id' => $pageResult['page_id'],
            'page_url' => $pageResult['page_url'],
        ], $pageResult['success'], $pageResult['message'], ($pageResult['success'] ? 200 : 500));
    }

    /**
     * Method is used to finish the onboarding process. It is called when the
     * user has completed the onboarding process and wants to finish it.
     *
     * @param WP_REST_Request $request Contains enitre onboarding data
     */
    public function finishOnboarding(WP_REST_Request $request): WP_REST_Response
    {
        $code = 200;
        $message = __('Successfully finished onboarding!', 'simplybook');

        $success = $this->service->setOnboardingCompleted();
        if (!$success) {
            $message = __('An error occurred while finishing the onboarding process', 'simplybook');
            $code = 400;
        }

        return $this->service->sendHttpResponse([], $success, $message, $code);
    }

    /**
     * Method is used to retry the onboarding process. It is called when the
     * user has completed the onboarding process and wants to retry it.
     */
    public function retryOnboarding(WP_REST_Request $request): WP_REST_Response
    {
        $success = $this->service->delete_all_options();
        $message = __('Successfully removed all previous data.', 'simplybook');

        if (!$success) {
            $message = __('An error occurred while trying to remove previous data.', 'simplybook');
        }

        return $this->service->sendHttpResponse([], $success, $message, ($success ? 200 : 500));
    }
}

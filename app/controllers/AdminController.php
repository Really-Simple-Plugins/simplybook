<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;

class AdminController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;

    private string $restApiAction = 'resp_rest_api_notice_form_submit';
    private string $restApiNonceName = 'resp_rest_api_notice_nonce';
    private string $restApiAccessibleOptionName = 'simplybook_rest_api_accessible';
    private string $restApiValidationTimeOptionName = 'simplybook_rest_api_validation_time';

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_filter('plugin_action_links_' . App::env('plugin.base_file'), [$this, 'addPluginSettingsAction']);
        add_action('admin_notices', [$this, 'showRestApiNotice']);
        add_action('admin_init', [$this, 'processRestApiNoticeFormSubmit']);
    }

    /**
     * Add settings and support link to the plugin page
     */
    public function addPluginSettingsAction(array $links): array
    {
        if ($this->userCanManage() === false) {
            return $links;
        }

        $settings_link = '<a href="' . App::env('plugin.dashboard_url') . '">' . esc_html__('Settings', 'simplybook') . '</a>';
        array_unshift($links, $settings_link);

        //support
        $support = '<a rel="noopener noreferrer" target="_blank" href="' . esc_attr(App::env('simplybook.support_url')) . '">' . esc_html__('Support', 'simplybook') . '</a>';
        array_unshift($links, $support);

        return $links;
    }

    /**
     * Show notice about the disabled REST API for logged-out users.
     */
    public function showRestApiNotice(): void
    {
        if ($this->shouldRenderRestApiNotice() === false) {
            return;
        }

        $notice = sprintf(
        // translators: %1$s and %2$s are replaced with opening and closing tags to bold the text
            __('The %1$sSimplyBook.me%2$s plugin relies on the %1$sWordPress REST API%2$s to register new accounts. However, the REST API is currently inaccessible to logged-out users. Please ensure that the REST API is enabled and publicly accessible.', 'simplybook'),
            '<strong>',
            '</strong>'
        );

        $this->render('admin/rest-api-notice', [
            'restApiMessage' => $notice,
            'restApiAction' => $this->restApiAction,
            'restApiNonceName' => $this->restApiNonceName,
        ]);
    }

    /**
     * Process the dismissal of the REST API notice form submit.
     */
    public function processRestApiNoticeFormSubmit(): void
    {
        $request = App::provide('request')->fromGlobal();
        if ($request->isEmpty('simplybook_rest_api_notice_form')) {
            return;
        }

        $nonce = $request->get($this->restApiNonceName);
        if (wp_verify_nonce($nonce, $this->restApiAction) === false) {
            return; // Invalid nonce
        }

        update_option('simplybook_rest_api_notice_dismissed', '1', false);
    }

    /**
     * Method determines if the REST API notice should be rendered. The REST API
     * is needed to be able to receive the webhook callbacks from SimplyBook.me
     * while creating a new account.
     *
     * Returns false when:
     * - The user has dismissed the notice
     * - The onboarding is already completed (account created)
     *
     * Returns true when:
     * - The REST API is inaccessible (not 200 response code)
     */
    private function shouldRenderRestApiNotice(): bool
    {
        $cacheName = 'rsp_simplybook_rest_api_inaccessible';
        if ($cache = wp_cache_get($cacheName, 'simplybook')) {
            return (bool) $cache;
        }

        // Dismissed notice or completed onboarding? No notice.
        // Accessible and cached? No notice.
        if (
            $this->isRestApiNoticeDismissed()
            || $this->isOnboardingCompleted()
            || $this->restApiIsAccessibleAndCachedForOneDay()
        ) {
            wp_cache_set($cacheName, false, 'simplybook', 50);
            return false;
        }

        // Validate again after one day, or each admin_init when inaccessible
        $restApiAccessible = $this->validateRestApi();
        update_option($this->restApiAccessibleOptionName, $restApiAccessible);
        update_option($this->restApiValidationTimeOptionName, time(), false);

        wp_cache_set($cacheName, $restApiAccessible, 'simplybook', 50);
        return $restApiAccessible === false;
    }

    /**
     * Check if the REST API is accessible by making a request to the REST API
     * endpoint and checking the response code to be 200.
     */
    private function validateRestApi(): bool
    {
        $response = wp_remote_get(rest_url(), ['sslverify' => false]);

        return is_wp_error($response) ||
            wp_remote_retrieve_response_code($response) === 200;
    }

    /**
     * Check if the one-day cached REST API accessibility is still valid. We
     * only check if we've actually assessed that the REST API is accessible
     * previously. This method makes sure we don't make unnecessary requests
     * to the REST API endpoint if we already know it's accessible.
     */
    private function restApiIsAccessibleAndCachedForOneDay(): bool
    {
        $restApiAccessibleCached = get_option($this->restApiAccessibleOptionName, false);
        if ($restApiAccessibleCached === false) {
            // Don't use cache if not set OR if the REST API is not accessible
            return false;
        }

        $validationTime = Carbon::createFromTimestamp(
            get_option($this->restApiValidationTimeOptionName, time())
        );
        $oneDayAgo = Carbon::now()->subDay();

        return $validationTime->isAfter($oneDayAgo);
    }

    /**
     * Check if the REST API notice is dismissed. This is used to determine if
     * the notice should be shown or not.
     */
    private function isRestApiNoticeDismissed(): bool
    {
        return (bool) get_option('simplybook_rest_api_notice_dismissed', false);
    }

    /**
     * Check if the onboarding is completed.
     * @todo This should be moved to a trait or a service, as it is used in
     * multiple places.
     */
    private function isOnboardingCompleted(): bool
    {
        return (bool) get_option('simplybook_onboarding_completed', false);
    }
}
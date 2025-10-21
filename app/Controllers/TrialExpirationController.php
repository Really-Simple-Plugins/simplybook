<?php

namespace SimplyBook\Controllers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\NoticeDismissalService;
use SimplyBook\Http\Endpoints\LoginUrlEndpoint;
use SimplyBook\Services\SubscriptionDataService;

class TrialExpirationController implements ControllerInterface
{
    use HasViews;
    use HasAllowlistControl;
    use LegacyLoad;

    private App $app;
    private SubscriptionDataService $subscriptionService;
    private NoticeDismissalService $noticeDismissalService;

    public function __construct(App $app, SubscriptionDataService $subscriptionService, NoticeDismissalService $noticeDismissalService)
    {
        $this->app = $app;
        $this->subscriptionService = $subscriptionService;
        $this->noticeDismissalService = $noticeDismissalService;
    }

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('admin_notices', [$this, 'showTrialExpirationNotice']);
    }

    public function showTrialExpirationNotice(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $trialInfo = $this->getTrialInfo();
        $daysRemaining = $trialInfo['days_remaining'];
        $isExpired = $trialInfo['is_expired'];

        $message = esc_html__('Your free SimplyBook.me trial period has expired. Discover which plans best suit your site to continue gathering bookings!', 'simplybook');

        if (($isExpired === false) && ($daysRemaining > 0)) {
            $message = sprintf(
                // translators: %d is replaced by the number of days remaining
                __('Your free SimplyBook.me trial period will expire in %d days. Discover which plans best suit your site to continue gathering bookings!', 'simplybook'),
                $daysRemaining
            );
        }

        $this->render('admin/trial-notice', [
            'logoUrl' => $this->app->env->getUrl('plugin.assets_url') . 'img/simplybook-S-logo.png',
            'message' => $message,
        ]);
    }

    public function enqueueScripts(): void
    {
        if ($this->canRenderTrialNotice() === false) {
            return;
        }

        $this->noticeDismissalService->enqueue();

        wp_enqueue_script(
            'simplybook-admin-sso',
            $this->app->env->getUrl('plugin.assets_url') . 'js/sso/admin-sso-links.js',
            [],
            $this->app->env->getString('plugin.version'),
            false
        );

        wp_add_inline_script(
            'simplybook-admin-sso',
            sprintf(
                'const simplebookSSOConfig = { restUrl: %s, nonce: %s };',
                wp_json_encode(esc_url_raw(rest_url(
                    $this->app->env->getString('http.namespace') . '/' . $this->app->env->getString('http.version') . '/' . LoginUrlEndpoint::ROUTE
                ))),
                wp_json_encode(wp_create_nonce('wp_rest'))
            ),
            'before'
        );

    }

    private function canRenderTrialNotice(): bool
    {
        $cacheName = 'can_render_trial_expiration_notice';
        if ($cache = wp_cache_get($cacheName, 'simplybook')) {
            return $cache;
        }

        $screen = get_current_screen();
        if ($screen && (('post' === $screen->base) || (str_contains($screen->base, 'simplybook')))) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS * 10);
            return false;
        }

        if ($this->noticeDismissalService->isNoticeDismissed(get_current_user_id(), 'trial')) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS * 10);
            return false;
        }

        // User who did not complete the onboarding shouldn't see this notice
        if (get_option('simplybook_onboarding_completed', false) === false) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS * 10);
            return false;
        }

        $trialInfo = $this->getTrialInfo();
        if ($trialInfo === null) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS * 10);
            return false;
        }

        if ($trialInfo['is_expired'] && $trialInfo['days_since_expiration'] > 30) {
            wp_cache_set($cacheName, false, 'simplybook', MINUTE_IN_SECONDS * 10);
            return false;
        }

        return $trialInfo['is_expired'] || $trialInfo['days_remaining'] <= 2;
    }

    private function getTrialInfo(): ?array
    {
        $cacheKey = 'simplybook_trial_info';
        $cacheGroup = 'simplybook';
        $cachedInfo = wp_cache_get($cacheKey, $cacheGroup);
        $cacheDuration = (5 * MINUTE_IN_SECONDS);

        if ($cachedInfo !== false) {
            return $cachedInfo;
        }

        $subscriptionData = $this->subscriptionService->all(true);

        if (empty($subscriptionData)) {
            $subscriptionData = $this->subscriptionService->restore();
        }

        if (empty($subscriptionData)) {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        $subscriptionName = ($subscriptionData['subscription_name'] ?? '');
        if ($subscriptionName !== 'Trial') {
            wp_cache_set($cacheKey, null, $cacheGroup, $cacheDuration);
            return null;
        }

        $isExpired = ($subscriptionData['is_expired'] ?? false);
        $expireIn = ($subscriptionData['expire_in'] ?? 0);

        $trialInfo = [
            'is_expired' => $isExpired,
            'days_remaining' => $isExpired ? 0 : max(0, (int) $expireIn),
            'days_since_expiration' => $isExpired ? abs((int) $expireIn) : 0,
        ];

        wp_cache_set($cacheKey, $trialInfo, $cacheGroup, $cacheDuration);

        return $trialInfo;
    }
}

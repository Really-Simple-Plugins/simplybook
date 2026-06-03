<?php

declare(strict_types=1);

namespace SimplyBook\Features\Onboarding;

use SimplyBook\Services\DashboardService;
use SimplyBook\Interfaces\FeatureInterface;
use SimplyBook\Support\Helpers\Storages\RequestStorage;
use SimplyBook\Features\Onboarding\Endpoints\ActionEndpoints;
use SimplyBook\Features\Onboarding\Endpoints\CallbackEndpoint;
use SimplyBook\Features\Onboarding\Endpoints\CreateAccountEndpoint;
use SimplyBook\Features\Onboarding\Endpoints\AuthenticationEndpoints;

final class OnboardingFeature implements FeatureInterface
{
    private DashboardService $dashboard;
    private RequestStorage $request;

    public function __construct(DashboardService $dashboard, RequestStorage $request)
    {
        $this->dashboard = $dashboard;
        $this->request = $request;
    }

    /**
     * @inheritDoc
     */
    public function boot(): void
    {
        add_filter('simplybook_endpoint_classes', [$this, 'registerEndpoints']);
    }

    /**
     * Add the endpoints of the Onboarding feature to the list of
     * endpoints registered by the plugin.
     */
    public function registerEndpoints(array $existingEndpoints): array
    {
        return array_merge($existingEndpoints, [
            ActionEndpoints::class,
            CallbackEndpoint::class,
            CreateAccountEndpoint::class,
            AuthenticationEndpoints::class,
        ]);
    }

    /**
     * Only enable the Onboarding feature when the onboarding is not already
     * completed.
     */
    public function isEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false) === false;
    }

    /**
     * Only enable the Onboarding feature when the user is on the dashboard or
     * when the request is a REST API request to one of our endpoints. Includes
     * compatibility with Extendify.
     */
    public function inScope(): bool
    {
        $extendifySiteIdExists = get_option('extendify_site_id', false) !== false;

        return (is_admin() && $this->dashboard->userIsOnDashboard())
            || (is_admin() && $extendifySiteIdExists)
            || $this->request->isRestRequest();
    }
}

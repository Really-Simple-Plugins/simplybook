<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\StatisticsService;
use SimplyBook\Interfaces\SingleEndpointInterface;

class StatisticsEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'statistics';

    private StatisticsService $service;

    public function __construct(StatisticsService $service) {
        $this->service = $service;
    }

    /**
     * This endpoint is disabled when the temporary callback URL is not (yet)
     * set or is expired.
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Fetch all statistics from the SimplyBook API and save it to the database.
     * @example /wp-json/simplybook/v1/statistics
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $currentSubscriptionData = $this->service->all(true);
        if (!empty($currentSubscriptionData)) {
            return $this->sendHttpResponse($currentSubscriptionData, true, 'Statistics retrieved.');
        }

        $subscriptionData = $this->service->fetch();
        if (empty($subscriptionData)) {
            return $this->sendHttpResponse([], false, 'No statistics found.', 404);
        }

        $this->service->save($subscriptionData);
        return $this->sendHttpResponse($subscriptionData, true, 'Statistics fetched.');
    }
}
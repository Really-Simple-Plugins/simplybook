<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\SubscriptionDataService;
use SimplyBook\Interfaces\MultiEndpointInterface;

class SubscriptionEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'subscription_data';

    private SubscriptionDataService $service;

    public function __construct(SubscriptionDataService $service) {
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
    public function registerRoutes(): array
    {
        return [
            self::ROUTE => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getAllSubscriptionData'],
            ],
            self::ROUTE . '/(?P<key>[^/]+)' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getSubscriptionData'],
            ],
        ];
    }

    /**
     * Fetch all subscription data from the SimplyBook API and save it to the
     * database. Return it fully.
     * @example /wp-json/simplybook/v1/subscription_data
     */
    public function getAllSubscriptionData(\WP_REST_Request $request): \WP_REST_Response
    {
        $currentSubscriptionData = $this->service->all(true);
        if (!empty($currentSubscriptionData)) {
            return $this->sendHttpResponse($currentSubscriptionData, true, 'Subscription data retrieved.');
        }

        $subscriptionData = $this->service->fetch();
        if (empty($subscriptionData)) {
            return $this->sendHttpResponse([], false, 'No subscription data found.', 404);
        }

        $saved = $this->service->save($subscriptionData);
        return $this->sendHttpResponse($saved, true, 'Subscription data fetched.');
    }

    /**
     * Fetch a specific subscription data key from the SimplyBook API and return
     * it. Dot notation is supported.
     * @example /wp-json/simplybook/v1/subscription_data/expire_date
     * @example /wp-json/simplybook/v1/subscription_data/limits:booking-website
     */
    public function getSubscriptionData(\WP_REST_Request $request): \WP_REST_Response
    {
        $searchKey = $request->get_param('key');
        if (empty($searchKey)) {
            return $this->sendHttpResponse([], false, 'No key provided.', 400);
        }

        $currentSubscriptionData = $this->service->all(true);
        if (empty($currentSubscriptionData)) {
            $this->service->restore();
        }

        $value = $this->service->search($searchKey);
        if (empty($value)) {
            return $this->sendHttpResponse([], false, 'Unknown subscription data requested.', 400);
        }

        return $this->sendHttpResponse([
            'value' => $value,
        ], true, 'Subscription data retrieved.');
    }
}
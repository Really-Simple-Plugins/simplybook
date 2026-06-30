<?php

namespace SimplyBook\Http\Endpoints;

use Throwable;
use WP_REST_Response;
use SimplyBook\Http\Entities\ServiceProvider;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Services\Entities\SubscriptionDataService;

/**
 * CRUD endpoint for Service Providers.
 *
 * @uses ServiceProvider as the entity for this endpoint.
 */
class ServicesProvidersEndpoint extends AbstractCrudEndpoint
{
    private SubscriptionDataService $subscriptionDataService;

    // Overriding the default Entity with dependency injection
    public function __construct(ServiceProvider $entity, SubscriptionDataService $subscriptionDataService)
    {
        parent::__construct($entity);

        $this->subscriptionDataService = $subscriptionDataService;
    }

    /**
     * Create a Service Provider only when the current plan allows it.
     */
    protected function createItem(Storage $request): WP_REST_Response
    {
        $currentProviderCount = count($this->entity->all());
        $providerLimitTotal = $this->getProviderLimitTotal();

        if ($providerLimitTotal > 0 && $currentProviderCount >= $providerLimitTotal) {
            return $this->sendHttpResponse(
                [
                    'code' => 'provider_limit_reached',
                ],
                false,
                __('You have reached the maximum number of Service Providers for your plan.', 'simplybook'),
                409
            );
        }

        $response = parent::createItem($request);

        if ($response->get_status() >= 200 && $response->get_status() < 300) {
            Event::dispatch(Event::HAS_PROVIDERS, [
                'count' => $currentProviderCount + 1,
            ]);
        }

        return $response;
    }

    /**
     * Keep provider-count task state up to date after deletion.
     */
    protected function deleteEntity(Storage $request): WP_REST_Response
    {
        $currentProviderCount = count($this->entity->all());
        $response = parent::deleteEntity($request);

        if ($response->get_status() >= 200 && $response->get_status() < 300) {
            $updatedProviderCount = max(0, $currentProviderCount - 1);

            if ($updatedProviderCount === 0) {
                Event::dispatch(Event::EMPTY_PROVIDERS);
            } else {
                Event::dispatch(Event::HAS_PROVIDERS, [
                    'count' => $updatedProviderCount,
                ]);
            }
        }

        return $response;
    }

    /**
     * Return the provider limit for the current subscription, if known.
     */
    private function getProviderLimitTotal(): int
    {
        try {
            $subscriptionData = $this->subscriptionDataService->all(true);

            if (empty($subscriptionData)) {
                $subscriptionData = $this->subscriptionDataService->restore();
            }
        } catch (Throwable $e) {
            return 0;
        }

        return (int) ($subscriptionData['limits']['provider_limit']['total'] ?? 0);
    }
}

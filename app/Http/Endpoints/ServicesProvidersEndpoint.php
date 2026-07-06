<?php

namespace SimplyBook\Http\Endpoints;

use Throwable;
use WP_REST_Response;
use SimplyBook\Exceptions\RestDataException;
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
     * Create a Service Provider and sync provider-count task state.
     */
    protected function createItem(Storage $request): WP_REST_Response
    {
        $response = parent::createItem($request);

        if ($response->get_status() >= 200 && $response->get_status() < 300) {
            // The providers query refresh dispatches the exact count.
            $this->dispatchCurrentProviderCount(1);
        }

        return $response;
    }

    /**
     * Keep provider-count task state up to date after deletion.
     */
    protected function deleteEntity(Storage $request): WP_REST_Response
    {
        $currentProviderCount = $this->getCurrentProviderCount();
        $response = parent::deleteEntity($request);

        if ($response->get_status() < 200 || $response->get_status() >= 300) {
            return $response;
        }

        if ($currentProviderCount === null) {
            return $response;
        }

        $updatedProviderCount = max(0, $currentProviderCount - 1);
        $this->dispatchCurrentProviderCount($updatedProviderCount);

        return $response;
    }

    /**
     * Return a clear provider-limit error when SimplyBook rejects the create
     * with a provider-limit response.
     */
    protected function processRequestThrowable(Throwable $exception, string $action = ''): WP_REST_Response
    {
        if (
            $exception instanceof RestDataException
            && $action === 'create'
            && $this->subscriptionDataService->isProviderLimitReachedResponse($exception)
        ) {
            return $this->sendHttpResponse(
                [
                    'code' => 'provider_limit_reached',
                ],
                false,
                __('You have reached the maximum number of Service Providers for your plan.', 'simplybook'),
                409
            );
        }

        return parent::processRequestThrowable($exception, $action);
    }

    /**
     * Dispatch provider task state for a provider count.
     */
    private function dispatchCurrentProviderCount(int $providerCount): void
    {
        if ($providerCount === 0) {
            Event::dispatch(Event::EMPTY_PROVIDERS);
            return;
        }

        Event::dispatch(Event::HAS_PROVIDERS, [
            'count' => $providerCount,
        ]);
    }

    /**
     * Return the current provider count, or null when it cannot be read.
     */
    private function getCurrentProviderCount(): ?int
    {
        try {
            return count($this->entity->all());
        } catch (Throwable $e) {
            return null;
        }
    }
}

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
            // A successful create guarantees at least one provider exists.
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

        if ($updatedProviderCount === 0) {
            Event::dispatch(Event::EMPTY_PROVIDERS);
            return $response;
        }

        Event::dispatch(Event::HAS_PROVIDERS, [
            'count' => $updatedProviderCount,
        ]);

        return $response;
    }

    /**
     * Return a clear provider-limit error when SimplyBook rejects the create
     * and the current subscription data indicates no provider slots remain.
     */
    protected function processRequestThrowable(Throwable $exception, string $action = ''): WP_REST_Response
    {
        if ($exception instanceof RestDataException && $action === 'create' && $this->providerLimitReached()) {
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
     * Dispatch the current provider count, if it can be read.
     */
    private function dispatchCurrentProviderCount(int $minimumProviderCount = 0): void
    {
        $providerCount = $this->getCurrentProviderCount();

        if ($providerCount === null) {
            return;
        }

        $providerCount = max($minimumProviderCount, $providerCount);

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

    /**
     * Check if the current provider count reaches the provider limit.
     */
    private function providerLimitReached(): bool
    {
        $currentProviderCount = $this->getCurrentProviderCount();

        if ($currentProviderCount === null) {
            return false;
        }

        $providerLimitTotal = $this->subscriptionDataService->getProviderLimitTotal();

        return $providerLimitTotal > 0 && $currentProviderCount >= $providerLimitTotal;
    }
}

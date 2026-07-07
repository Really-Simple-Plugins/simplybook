<?php

namespace SimplyBook\Services\Entities;

use Throwable;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Support\Helpers\Event;

class SubscriptionDataService extends AbstractEntityService
{
    /**
     * @inheritDoc
     */
    protected string $cachePrefix = 'simplybook';

    /**
     * @inheritDoc
     */
    protected string $identifier = 'subscription_data';

    /**
     * Fetch the subscription data from the SimplyBook API
     * @return array The subscription data
     */
    public function fetch(): array
    {
        return $this->client->get_subscription_data();
    }

    /**
     * Return the provider limit from fresh subscription data.
     */
    public function getFreshProviderLimitTotal(): int
    {
        try {
            $subscriptionData = $this->restore();
        } catch (Throwable $e) {
            return 0;
        }

        return (int) ($subscriptionData['limits']['provider_limit']['total'] ?? 0);
    }

    /**
     * Check whether a SimplyBook error response reports the provider limit.
     */
    public function isProviderLimitReachedResponse(RestDataException $exception): bool
    {
        if ($exception->getResponseCode() !== 403) {
            return false;
        }

        $message = $exception->getData()['message'] ?? '';

        return is_string($message)
            && stripos($message, 'provider limit has been reached') !== false;
    }

    /**
     * Process the subscription data and identify the limits by giving each
     * limit array item a key representing the limit type. We do this because
     * we need the limits in an associative array format.
     */
    protected function processData(array $data): array
    {
        if (empty($data) || empty($data['limits'])) {
            return $data;
        }

        $limits = $data['limits'];
        $data['limits'] = array_column($limits, null, 'key');
        return $data;
    }

    /**
     * Trigger {@see Event::SUBSCRIPTION_DATA_LOADED} when subscription data
     * is loaded.
     */
    protected function dispatchDataLoaded(array $data): void
    {
        Event::dispatch(Event::SUBSCRIPTION_DATA_LOADED, $data);
    }
}

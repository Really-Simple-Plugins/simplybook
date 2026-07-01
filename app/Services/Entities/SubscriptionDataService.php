<?php

namespace SimplyBook\Services\Entities;

use Throwable;
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
     * Return the provider limit for the current subscription, if known.
     */
    public function getProviderLimitTotal(): int
    {
        try {
            $subscriptionData = $this->all(true);

            if (empty($subscriptionData)) {
                $subscriptionData = $this->restore();
            }
        } catch (Throwable $e) {
            return 0;
        }

        return (int) ($subscriptionData['limits']['provider_limit']['total'] ?? 0);
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

<?php

namespace SimplyBook\Services\Entities;

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
     * Process the subscription data by keying limits by type and normalizing
     * their remaining and total values as integers.
     */
    protected function processData(array $data): array
    {
        if (empty($data) || empty($data['limits']) || !is_array($data['limits'])) {
            return $data;
        }

        $limits = array_column($data['limits'], null, 'key');
        foreach ($limits as $key => $limit) {
            $limit['rest'] = is_numeric($limit['rest'] ?? null) ? (int) $limit['rest'] : 0;
            $limit['total'] = is_numeric($limit['total'] ?? null) ? (int) $limit['total'] : 0;
            $limits[$key] = $limit;
        }

        $data['limits'] = $limits;
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

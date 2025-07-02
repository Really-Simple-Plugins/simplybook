<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Helpers\Event;
use SimplyBook\Helpers\Storage;

class SubscriptionDataService
{
    const DATA_TIME_THRESHOLD = (5 * MINUTE_IN_SECONDS);

    /**
     * Fetch the subscription data from the SimplyBook API
     * @return array The subscription data
     */
    public function fetch(): array
    {
        return App::provide('client')->get_subscription_data();
    }

    /**
     * Restore the subscription data by fetching it from the API and saving it
     * to the database.
     * @return array The subscription data
     */
    public function restore(): array
    {
        $subscriptionData = $this->fetch();
        return $this->save($subscriptionData);
    }

    /**
     * Save the subscription data to the database
     * @uses processDataAndIdentifyLimits to create associative array of limits
     * which in turn helps the {@see search} method for retrieving data.
     */
    public function save(array $subscriptionData): array
    {
        $subscriptionData['updated_at_utc'] = Carbon::now('UTC')->toDateTimeString();

        $subscriptionData = $this->processDataAndIdentifyLimits($subscriptionData);
        update_option('simplybook_subscription_data', $subscriptionData);

        $this->dispatchDataLoaded($subscriptionData);
        return $subscriptionData;
    }

    /**
     * Using the Storage helper ensures we can utilize dot notation in the
     * request for a specific key in the subscription data.
     * @param string $key The key to search for in the subscription data, a
     * semicolon can be used for dot notation instead of a dot.
     * @example /wp-json/simplybook/v1/subscription_data/limits:booking-website
     * @return mixed The value of the key in the subscription data.
     */
    public function search(string $key)
    {
        $storage = new Storage($this->all());

        $key = str_replace(':', '.', $key);

        return $storage->get($key);
    }

    /**
     * Get all subscription data from the database
     * @param bool $strict Indicates if the data should be checked for expiration
     */
    public function all(bool $strict = false): array
    {
        $cacheName = 'simplybook_subscription_data_all_' . ($strict ? 'strict' : 'non-strict');
        if ($cache = wp_cache_get($cacheName, 'simplybook')) {
            return $cache;
        }

        $subscriptionData = get_option('simplybook_subscription_data', []);
        if (empty($subscriptionData) || empty($subscriptionData['updated_at_utc'])) {
            return [];
        }

        if ($strict === false) {
            $this->dispatchDataLoaded($subscriptionData);
            wp_cache_set($cacheName, $subscriptionData, 'simplybook',  self::DATA_TIME_THRESHOLD);
            return $subscriptionData;
        }

        $updatedAt = Carbon::parse($subscriptionData['updated_at_utc']);
        if ($updatedAt->diffInSeconds(Carbon::now('UTC')) > self::DATA_TIME_THRESHOLD) {
            return [];
        }

        $this->dispatchDataLoaded($subscriptionData);
        wp_cache_set($cacheName, $subscriptionData, 'simplybook',  self::DATA_TIME_THRESHOLD);
        return $subscriptionData;
    }

    /**
     * Process the subscription data and identify the limits by giving each
     * limit array item a key representing the limit type. We do this because
     * we need the limits in an associative array format.
     */
    private function processDataAndIdentifyLimits(array $subscriptionData): array
    {
        if (empty($subscriptionData) || empty($subscriptionData['limits'])) {
            return $subscriptionData;
        }

        $limits = $subscriptionData['limits'];
        $subscriptionData['limits'] = array_column($limits, null, 'key');
        return $subscriptionData;
    }

    /**
     * Helper method to easily dispatch the subscription data loaded event.
     */
    private function dispatchDataLoaded(array $subscriptionData): void
    {
        Event::dispatch(Event::SUBSCRIPTION_DATA_LOADED, $subscriptionData);
    }

}
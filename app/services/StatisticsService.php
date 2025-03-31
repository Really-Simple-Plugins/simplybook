<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\App;

class StatisticsService
{
    const DATA_TIME_THRESHOLD = (5 * MINUTE_IN_SECONDS);

    /**
     * Fetch the statistic data from the SimplyBook API
     * @return array The statistics
     */
    public function fetch(): array
    {
        return App::provide('client')->get_statistics();
    }

    /**
     * Restore the statistics by fetching it from the API and saving it
     * to the database.
     * @return array The statistics
     */
    public function restore(): array
    {
        $subscriptionData = $this->fetch();
        $this->save($subscriptionData);
        return $subscriptionData;
    }

    /**
     * Save the statistics to the database
     */
    public function save(array $subscriptionData): void
    {
        $subscriptionData['updated_at_utc'] = Carbon::now('UTC')->toDateTimeString();
        update_option('simplybook_statistics', $subscriptionData);
    }

    /**
     * Get all statistics from the database
     * @param bool $strict Indicates if the data should be checked for expiration
     */
    public function all(bool $strict = false): array
    {
        $cacheName = 'simplybook_statistics_all_' . ($strict ? 'strict' : 'non-strict');
        if ($cache = wp_cache_get($cacheName, 'simplybook')) {
            return $cache;
        }

        $subscriptionData = get_option('simplybook_statistics', []);
        if (empty($subscriptionData) || empty($subscriptionData['updated_at_utc'])) {
            return [];
        }

        if ($strict === false) {
            wp_cache_set($cacheName, $subscriptionData, 'simplybook',  self::DATA_TIME_THRESHOLD);
            return $subscriptionData;
        }

        $updatedAt = Carbon::parse($subscriptionData['updated_at_utc']);
        $statisticsExpired = $updatedAt->diffInSeconds(Carbon::now('UTC')) > self::DATA_TIME_THRESHOLD;
        if ($statisticsExpired) {
            return [];
        }

        wp_cache_set($cacheName, $subscriptionData, 'simplybook',  self::DATA_TIME_THRESHOLD);
        return $subscriptionData;
    }
}
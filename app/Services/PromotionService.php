<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class PromotionService
{
    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Tells you if the promotion of the identifier is active now. The
     * identifier should match env config key of the promotion. A missing
     * date or a wrong date in the config stops the promotion.
     */
    public function isPromotionActive(string $identifier): bool
    {
        $hasCache = false;
        $cacheName = 'simplybook_promotion_service_' . $identifier;
        $cache = wp_cache_get($cacheName, 'simplybook', false, $hasCache);

        // The $hasCache variable is set by reference in wp_cache_get
        if ($hasCache) {
            return (bool) $cache;
        }

        $timezone = wp_timezone();
        $now = Carbon::now($timezone);

        $start = $this->getPromotionDate($identifier, 'start_date', $timezone);
        $end = $this->getPromotionDate($identifier, 'end_date', $timezone);

        if (empty($start) || empty($end)) {
            wp_cache_set($cacheName, false, 'simplybook', DAY_IN_SECONDS);
            return false;
        }

        $cacheDuration = HOUR_IN_SECONDS;

        $end = $end->endOfDay();
        $isActive = $now->betweenIncluded($start, $end);

        // Less than 1 hour before the end? Then cache for 5 minutes.
        $secondsUntilEnd = $now->diffInSeconds($end, false);
        if (($secondsUntilEnd > 0) && ($secondsUntilEnd <= HOUR_IN_SECONDS)) {
            $cacheDuration = (MINUTE_IN_SECONDS * 5);
        }

        wp_cache_set($cacheName, $isActive, 'simplybook', $cacheDuration);
        return $isActive;
    }

    /**
     * Gives the date of the promotion config key. Return Carbon instance or
     * null on any error.
     */
    private function getPromotionDate(string $identifier, string $key, \DateTimeZone $timezone): ?Carbon
    {
        $date = $this->env->getString('simplybook.' . $identifier . '.' . $key);
        if (empty($date)) {
            return null;
        }

        try {
            return Carbon::parse($date, $timezone);
        } catch (\Exception $e) {
            return null;
        }
    }
}

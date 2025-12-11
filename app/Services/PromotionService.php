<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class PromotionService
{
    private Storage $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    public function isBlackFriday(): bool
    {
        $cacheName = 'simplybook_promotion_service_is_black_friday';
        $cache = wp_cache_get($cacheName, 'simplybook', false, $hasCache);

        // The $hasCache variable is set by reference in wp_cache_get
        if ($hasCache) {
            return (bool) $cache;
        }

        $timezone = wp_timezone();

        $blackFridayStart = Carbon::parse(
            $this->env->getString('simplybook.black_friday.start_date'),
            $timezone
        );

        $blackFridayEnd = Carbon::parse(
            $this->env->getString('simplybook.black_friday.end_date'),
            $timezone
        );

        // Within 1 hour of the end day? Reduce cache time to 5 minutes
        $cacheDuration = HOUR_IN_SECONDS;
        if (Carbon::now($timezone)->diffInMinutes($blackFridayEnd->endOfDay()) <= $cacheDuration) {
            $cacheDuration = MINUTE_IN_SECONDS * 5;
        }

        $isBlackFriday = Carbon::now($timezone)->betweenIncluded($blackFridayStart, $blackFridayEnd);

        wp_cache_set($cacheName, $isBlackFriday, 'simplybook', $cacheDuration);
        return $isBlackFriday;
    }
}

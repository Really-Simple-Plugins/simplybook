<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\Bootstrap\App;
use SimplyBook\Support\Helpers\Storage;

class PromotionService
{
    private Storage $env;

    public function __construct()
    {
        $this->env = App::getInstance()->env;
    }

    public function isBlackFriday(): bool
    {
        $cacheName = 'simplybook_promotion_service_is_black_friday';
        $cache = wp_cache_get($cacheName, 'simplybook', false, $hasCache);

        if ($hasCache) {
            return $cache;
        }

        $blackFridayStart = Carbon::parse(
            $this->env->getString('simplybook.black_friday.start_date')
        );
        $blackFridayEnd = Carbon::parse(
            $this->env->getString('simplybook.black_friday.end_date')
        );

        $isBlackFriday = Carbon::now()->betweenIncluded($blackFridayStart, $blackFridayEnd);

        wp_cache_set($cacheName, $isBlackFriday, 'simplybook', HOUR_IN_SECONDS);
        return $isBlackFriday;
    }
}

<?php namespace SimplyBook\Traits;

use SimplyBook\App;

trait HasApiAccess
{
    /**
     * Checks if SimplyBook registration is complete with 60s caching.
     */
    public function companyRegistrationIsCompleted(): bool
    {
        $cacheKey = 'simplybook_is_authorized';
        if ($cache = wp_cache_get($cacheKey, 'simplybook')) {
            return $cache;
        }

        $isAuthorized = App::provide('client')->company_registration_complete();

        wp_cache_set($cacheKey, $isAuthorized, 'simplybook', 60);
        return $isAuthorized;
    }
}
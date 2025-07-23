<?php namespace SimplyBook\Traits;

use SimplyBook\App;

trait IsAuthorized 
{
    /**
     * Checks if SimplyBook registration is complete with 60s caching.
     */
    protected function IsAuthorized(): bool
    {
        $cacheKey = 'simplybook_is_authorized';
        
        if ($cache = wp_cache_get($cacheKey, 'simplybook')) {
            return $cache;
        }

        try {
            $client = App::provide('client');
            $isAuthorized = $client && $client->company_registration_complete();
        } catch (\Exception $e) {
            $isAuthorized = false;
        }

        wp_cache_set($cacheKey, $isAuthorized, 'simplybook', 60);
        
        return $isAuthorized;
    }
}
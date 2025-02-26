<?php namespace SimplyBook\Managers;

use SimplyBook\Interfaces\EndpointInterface;

class EndpointManager
{
    /**
     * Register a single endpoint as long as it implements the EndpointInterface
     * @uses do_action simplybook_endpoints_loaded
     */
    public function registerEndpoints(array $endpoints)
    {
        // Reject all given endpoints when they do not implement the
        // EndpointInterface
        $endpoints = array_filter($endpoints, function ($endpoint) {
            return $endpoint instanceof EndpointInterface;
        });

        // Serve each provider
        foreach ($endpoints as $endpoint) {
            $endpoint->registerRoutes();
        }

        do_action('simplybook_endpoints_loaded');
    }
}
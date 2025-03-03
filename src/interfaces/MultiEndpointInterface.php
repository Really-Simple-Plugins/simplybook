<?php namespace SimplyBook\Interfaces;

/**
 * This interface can be used instead of {@see EndpointInterface} to register
 * multiple routes at once. This is useful when a single route has multiple
 * endpoints.
 */
interface MultiEndpointInterface
{
    /**
     * The routes to register. For each array in the array, the key is the route
     * and the value is an array of arguments to pass to the register_rest_route
     * function: {@see EndpointManager::registerRoutes}.
     *
     * Arguments you can use are documented with filter: simplybook_rest_routes
     * in method: {@see EndpointManager::getPluginRoutes}
     */
    public function registerRoutes(): array;
}
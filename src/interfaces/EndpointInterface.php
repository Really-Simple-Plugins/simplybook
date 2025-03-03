<?php namespace SimplyBook\Interfaces;

interface EndpointInterface
{
    /**
     * The route name to register. Will be used as the array key for routes
     * array in: {@see EndpointManager::registerRoutes}
     */
    public function registerRoute(): string;

    /**
     * Arguments you can use are documented wih filter: simplybook_rest_routes
     * in method: {@see EndpointManager::getPluginRoutes}
     */
    public function registerArguments(): array;
}
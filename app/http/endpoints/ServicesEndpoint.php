<?php
namespace SimplyBook\Http\Endpoints;

class ServicesEndpoint extends BaseEndpoint
{
    const ROUTE = 'services';

    /**
     * Get the route name for this endpoint
     */
    protected function getRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * Get the API client method prefix
     */
    protected function getResourceType(): string
    {
        return 'Service';
    }

    /**
     * Get the resource name for logging
     */
    protected function getResourceName(): string
    {
        return 'service';
    }
}
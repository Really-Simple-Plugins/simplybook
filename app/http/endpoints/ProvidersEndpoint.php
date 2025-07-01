<?php
namespace SimplyBook\Http\Endpoints;

class ProvidersEndpoint extends BaseEndpoint
{
    const ROUTE = 'providers';

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
        return 'Provider';
    }

    /**
     * Get the resource name for logging
     */
    protected function getResourceName(): string
    {
        return 'provider';
    }
}
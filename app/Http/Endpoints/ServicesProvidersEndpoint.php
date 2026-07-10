<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\Entities\ServiceProvider;
use SimplyBook\Support\Helpers\Event;

/**
 * CRUD endpoint for Service Providers.
 *
 * @uses ServiceProvider as the entity for this endpoint.
 */
class ServicesProvidersEndpoint extends AbstractCrudEndpoint
{
    // Overriding the default Entity with dependency injection
    public function __construct(ServiceProvider $entity)
    {
        parent::__construct($entity);
    }

    /**
     * Dispatch the provider created event after one was successfully created.
     */
    protected function afterCreate(): void
    {
        Event::dispatch(Event::PROVIDER_CREATED);
    }

    /**
     * Dispatch the provider deleted event after one was successfully deleted.
     */
    protected function afterDelete(): void
    {
        Event::dispatch(Event::PROVIDER_DELETED);
    }
}

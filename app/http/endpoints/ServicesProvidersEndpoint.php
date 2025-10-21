<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\Entities\ServiceProvider;

/**
 * This CRUD endpoint does not override any methods from the parent class, so
 * it will inherit the default behavior for handling requests.
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
}

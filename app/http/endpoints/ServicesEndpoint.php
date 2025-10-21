<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\Entities\Service;

/**
 * This CRUD endpoint does not override any methods from the parent class, so
 * it will inherit the default behavior for handling requests.
 *
 * @uses Service as the entity for this endpoint.
 */
class ServicesEndpoint extends AbstractCrudEndpoint
{
    // Overriding the default Entity with dependency injection
    public function __construct(Service $entity)
    {
        parent::__construct($entity);
    }
}

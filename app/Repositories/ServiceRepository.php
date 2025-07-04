<?php
namespace SimplyBook\Repositories;

use SimplyBook\Models\Service;

/**
 * Repository for Service operations
 */
class ServiceRepository extends BaseRepository
{
    protected function getModelClass(): string
    {
        return Service::class;
    }
}
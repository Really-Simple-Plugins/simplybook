<?php
namespace SimplyBook\Repositories;

use SimplyBook\Models\Provider;

/**
 * Repository for Provider operations
 */
class ProviderRepository extends BaseRepository
{
    protected function getModelClass(): string
    {
        return Provider::class;
    }
}
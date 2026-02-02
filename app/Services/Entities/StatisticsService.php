<?php

namespace SimplyBook\Services\Entities;

class StatisticsService extends AbstractEntityService
{
    /**
     * @inheritDoc
     */
    protected string $cachePrefix = 'simplybook';

    /**
     * @inheritDoc
     */
    protected string $identifier = 'statistics';

    /**
     * Fetch the statistic data from the SimplyBook API
     * @return array The statistics
     */
    public function fetch(): array
    {
        return $this->client->get_statistics();
    }
}

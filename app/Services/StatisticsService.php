<?php

namespace SimplyBook\Services;

class StatisticsService extends AbstractFetchDataService
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

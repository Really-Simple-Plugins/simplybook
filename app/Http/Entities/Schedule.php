<?php

namespace SimplyBook\Http\Entities;

use SimplyBook\Traits\IsFilterable;

/**
 * Schedule entity class for reading the company schedule from the SimplyBook
 * API. This entity is read-only and represents a single schedule entry
 * (one day) as returned by `GET /admin/schedule`.
 *
 * @link https://simplybook.me/en/api/developer-api/tab/rest_api#method_GET_/admin/schedule
 */
class Schedule extends AbstractEntity
{
    use IsFilterable;

    /**
     * Mutable endpoint used by the {@see IsFilterable} trait to append query
     * parameters to the request URL.
     */
    protected string $endpoint = 'admin/schedule';

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return __('Schedule', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getEndpoint(): string
    {
        return $this->endpoint;
    }

    /**
     * @inheritDoc
     */
    protected function getAcceptedFilters(): array
    {
        return [
            'date_from' => '/^\d{4}-\d{2}-\d{2}$/',
            'date_to' => '/^\d{4}-\d{2}-\d{2}$/',
            'service_id' => '/^\d+$/',
            'provider_id' => '/^\d+$/',
        ];
    }

    /**
     * @inheritDoc
     */
    public function getInternalEndpoint(): string
    {
        return 'schedule';
    }

    /**
     * @inheritDoc
     */
    public function getKnownErrors(): array
    {
        return [];
    }

    /**
     * Get the schedule from the SimplyBook API. Apply filters before calling
     * this method via {@see IsFilterable::filter()}.
     */
    public function all(): array
    {
        try {
            $response = $this->client->get($this->getEndpoint());
        } catch (\Throwable $e) {
            return [];
        }

        return (array) $response;
    }
}

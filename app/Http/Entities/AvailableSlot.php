<?php

namespace SimplyBook\Http\Entities;

use SimplyBook\Traits\IsFilterable;

/**
 * Slot entity class for reading available booking slots from the SimplyBook
 * API. This entity is read-only and represents a single bookable time slot
 * as returned by `GET /admin/schedule/available-slots`.
 *
 * @link https://simplybook.me/en/api/developer-api/tab/rest_api#method_GET_/admin/schedule/available-slots
 */
class AvailableSlot extends AbstractEntity
{
    use IsFilterable;

    /**
     * Mutable endpoint used by the {@see IsFilterable} trait to append query
     * parameters to the request URL.
     */
    protected string $endpoint = 'admin/schedule/available-slots';

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return __('Available Slot', 'simplybook');
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
            'service_id' => '/^\d+$/',
            'provider_id' => '/^\d+$/',
            'date' => '/^\d{4}-\d{2}-\d{2}$/',
            'count' => '/^\d+$/',
        ];
    }

    /**
     * @inheritDoc
     */
    public function getInternalEndpoint(): string
    {
        return 'available-slots';
    }

    /**
     * @inheritDoc
     */
    public function getKnownErrors(): array
    {
        return [];
    }

    /**
     * Get the available booking slots from the SimplyBook API. Apply filters
     * before calling this method via {@see IsFilterable::filter()}.
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

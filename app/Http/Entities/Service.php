<?php

namespace SimplyBook\Http\Entities;

use SimplyBook\Bootstrap\App;
use SimplyBook\Support\Helpers\Event;

/**
 * Service entity class for managing services in the SimplyBook API. This
 * entity has dynamic attributes that can be set and retrieved, and it
 * provides methods for CRUD operations on services.
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property int $duration
 * @property bool $is_visible
 */
class Service extends AbstractEntity
{
    /**
     * @inheritDoc
     */
    protected array $fillable = [
        'id',
        'name',
        'duration',
        'is_visible',
    ];

    /**
     * @inheritDoc
     */
    protected array $required = [
        'name',
        'duration',
        'is_visible',
    ];

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return $this->name ?: __('Service', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getEndpoint(): string
    {
        return 'admin/services';
    }

    /**
     * @inheritDoc
     */
    public function getInternalEndpoint(): string
    {
        return 'services';
    }

    /**
     * @inheritDoc
     */
    public function getKnownErrors(): array
    {
        return [
            'duration' => [
                'is not multiple of' => __('Duration invalid. Please enter a valid number that is a multiple of your selected timeframe.', 'simplybook'),
                'is not between' => __('Duration invalid. Please enter a valid number between 5 and 1435.', 'simplybook'),
            ],
        ];
    }

    /**
     * Ensure the service ID is a non-negative integer
     * @param mixed $value
     */
    public function setIdAttribute($value): int
    {
        $id = intval($value);
        return max(1, $id); // Ensure non-negative
    }

    /**
     * Sanitize the service name as a text field.
     * @param mixed $value
     */
    protected function setNameAttribute($value): string
    {
        return sanitize_text_field($value);
    }

    /**
     * Ensure the service price is a non-negative float.
     * @param mixed $value
     */
    protected function setPriceAttribute($value): float
    {
        $price = floatval($value);
        return max(0, $price); // Ensure non-negative
    }

    /**
     * Ensure the service duration is a positive integer (minimum 1 minute).
     * @param mixed $value
     */
    protected function setDurationAttribute($value): int
    {
        $duration = intval($value);
        return max(1, $duration);
    }

    /**
     * Ensure the visibility status is a boolean.
     * @param mixed $value
     */
    protected function setIsVisibleAttribute($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * Get all services from the SimplyBook API.
     */
    public function all(): array
    {
        try {
            $response = App::getInstance()->client->get($this->getEndpoint());
        } catch (\Throwable $e) {
            return [];
        }

        $services = ($response['data'] ?? []);
        if (empty($services)) {
            Event::dispatch(Event::EMPTY_SERVICES);
            return [];
        }

        Event::dispatch(Event::HAS_SERVICES, [
            'count' => count($services),
        ]);

        return $services;
    }
}

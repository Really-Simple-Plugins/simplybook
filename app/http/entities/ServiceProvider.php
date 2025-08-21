<?php
namespace SimplyBook\Http\Entities;

use SimplyBook\Helpers\Event;

/**
 * ServiceProvider entity class for managing services in the SimplyBook API.
 * This entity has dynamic attributes that can be set and retrieved, and it
 * provides methods for CRUD operations on services.
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property int $qty
 * @property bool $is_visible
 */
class ServiceProvider extends AbstractEntity
{
    /**
     * @inheritDoc
     */
    protected array $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'qty',
        'is_visible',
    ];

    /**
     * @inheritDoc
     */
    protected array $required = [
        'name',
        'qty',
        'is_visible',
    ];

    /**
     * @inheritDoc
     */
    public function getEndpoint(): string
    {
        return 'admin/providers';
    }

    /**
     * @inheritDoc
     */
    public function getInternalEndpoint(): string
    {
        return 'providers';
    }

    /**
     * @inheritDoc
     */
    public function getKnownErrors(): array
    {
        return [
            'phone' => [
                'invalid' => esc_html__('Phone format invalid. Please enter a valid phone number with country code (e.g., +31 123 456 789)', 'simplybook'),
                'not contain letters' => esc_html__('Phone format invalid. Please enter a valid phone number without using letters.', 'simplybook'),
            ],
            'email' => [
                'not a valid hostname' => esc_html__('The email address is invalid. Please verify your input and try again.', 'simplybook'),
                'hostname but cannot match' => esc_html__('The email address is invalid. Please verify your input and try again.', 'simplybook'),
                'local network name' => esc_html__('The email address is invalid. Please verify your input and try again.', 'simplybook'),
                'only once per day' => esc_html__('The email address can only be changed once per day.', 'simplybook'),
            ],
        ];
    }

    /**
     * Ensure the provider ID is a non-negative integer
     */
    public function setIdAttribute($value): int
    {
        $id = intval($value);
        return max(1, $id); // Ensure non-negative
    }

    /**
     * Sanitize the provider name as a text field.
     */
    protected function setNameAttribute($value): string
    {
        return sanitize_text_field($value);
    }

    /**
     * Ensure the visibility status is a boolean.
     */
    protected function setIsVisibleAttribute($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * Sanitize the provider email as a valid email address.
     */
    protected function setEmailAttribute($value):  string
    {
        return sanitize_email($value);
    }

    /**
     * Sanitize the provider phone number as a text field.
     * This is a simple sanitization, you might want to use a more complex
     * validation depending on your requirements.
     */
    protected function setPhoneAttribute($value): string
    {
        return sanitize_text_field($value);
    }

    /**
     * Ensure the provider quantity is a non-negative integer. SimplyBook.me
     * requires a positive quantity, so we ensure it's at least 1.
     */
    protected function setQtyAttribute($value): int
    {
        $qty = intval($value);
        return max(1, $qty); // Ensure non-negative
    }

    /**
     * Get all providers from the SimplyBook API.
     */
    public function all(): array
    {
        try {
            $response = $this->client->get($this->getEndpoint());
        } catch (\Throwable $e) {
            return [];
        }

        $providers = ($response['data'] ?? []);
        if (empty($providers)) {
            Event::dispatch(Event::EMPTY_PROVIDERS);
            return [];
        }

        Event::dispatch(Event::HAS_PROVIDERS, [
            'count' => count($providers),
        ]);

        return $providers;
    }

}
<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Providers;

use Throwable;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Http\Entities\ServiceProvider;

class UpdateProviderAbility extends AbstractAbility
{
    public const NAME = 'update-provider';

    private ServiceProvider $provider;

    public function __construct(ServiceProvider $provider)
    {
        $this->provider = $provider;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Update Service Provider', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Updates a single SimplyBook.me service provider identified by its ID. Only the supplied fields are changed; values are validated and sanitized by the ServiceProvider entity before being sent to the SimplyBook.me API.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'required' => ['id'],
            'properties' => [
                'id' => [
                    'type' => ['string', 'integer'],
                    'description' => __('The ID of the service provider to update.', 'simplybook'),
                ],
                'name' => ['type' => 'string'],
                'email' => ['type' => 'string'],
                'phone' => ['type' => 'string'],
                'qty' => ['type' => 'integer'],
                'is_visible' => ['type' => 'boolean'],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'type' => ['object', 'string', 'null'],
            'description' => __('The updated service provider attributes on success, or a human-readable message describing why the update could not be performed.', 'simplybook'),
        ];
    }

    /**
     * We attempt to find the provider by ID and update it with the provided
     * data. Unknown attributes are just ignored by the ServiceProvider entity.
     *
     * @return callable -> string|array Either an error message or the updated
     *         provider attributes.
     */
    protected function executeCallback(): ?callable
    {
        $provider = $this->provider;

        return static function ($input = null) use ($provider) {
            if (!is_array($input) || empty($input['id'])) {
                return __('A valid service provider ID is required.', 'simplybook');
            }

            $searchId = (string) $input['id'];

            try {
                $provider->find($searchId)->fill($input, false);
                $provider->update();
            } catch (Throwable $e) {
                return __('The service provider could not be updated.', 'simplybook');
            }

            return $provider->attributes();
        };
    }

    /**
     * @inheritDoc
     */
    protected function permissionCallback(): ?callable
    {
        return static function () {
            return current_user_can('simplybook_manage');
        };
    }

    /**
     * @inheritDoc
     */
    public function getMeta(): ?array
    {
        return [
            'show_in_rest' => true,
            'mcp' => [
                'public' => true,
            ]
        ];
    }
}

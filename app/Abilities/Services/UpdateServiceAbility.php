<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Services;

use Throwable;
use SimplyBook\Http\Entities\Service;
use SimplyBook\Abilities\AbstractAbility;

class UpdateServiceAbility extends AbstractAbility
{
    public const NAME = 'update-service';

    private Service $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Update Service', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Updates a single SimplyBook.me service identified by its ID. Only the supplied fields are changed; values are validated and sanitized by the Service entity before being sent to the SimplyBook.me API.', 'simplybook');
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
                    'description' => __('The ID of the service to update.', 'simplybook'),
                ],
                'name' => ['type' => 'string'],
                'duration' => ['type' => 'integer'],
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
            'description' => __('The updated service attributes on success, or a human-readable message describing why the update could not be performed.', 'simplybook'),
        ];
    }

    /**
     * We attempt to find the service by ID and update it with the provided
     * data. Unknown attributes are just ignored by the Service entity.
     *
     * @return callable -> string|array Either an error message or the updated
     *         service attributes.
     */
    protected function executeCallback(): ?callable
    {
        $service = $this->service;

        return static function ($input = null) use ($service) {
            if (!is_array($input) || empty($input['id'])) {
                return __('A valid service ID is required.', 'simplybook');
            }

            $searchId = (string) $input['id'];

            try {
                $service->find($searchId)->fill($input, false);
                $service->update();
            } catch (Throwable $e) {
                return __('The service could not be updated.', 'simplybook');
            }

            return $service->attributes();
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

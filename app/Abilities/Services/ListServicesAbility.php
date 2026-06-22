<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Services;

use SimplyBook\Http\Entities\Service;
use SimplyBook\Abilities\AbstractAbility;

class ListServicesAbility extends AbstractAbility
{
    public const NAME = 'list-services';

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
        return __('List Services', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns all SimplyBook.me services currently configured on the connected company.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'type' => 'array',
            'description' => __('Zero-indexed list of services as returned by the SimplyBook.me API. Empty when no company is connected or no services exist.', 'simplybook'),
            'items' => [
                'type' => 'object',
                'additionalProperties' => true,
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function executeCallback(): ?callable
    {
        $service = $this->service;

        return static function () use ($service): array {
            return $service->all();
        };
    }

    /**
     * @inheritDoc
     */
    protected function defaultPermissionCallback(): ?callable
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

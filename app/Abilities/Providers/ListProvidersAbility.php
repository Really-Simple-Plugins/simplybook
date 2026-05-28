<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Providers;

use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Http\Entities\ServiceProvider;

class ListProvidersAbility extends AbstractAbility
{
    public const NAME = 'list-providers';

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
        return __('List Providers', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns all SimplyBook.me service providers (staff) currently configured on the connected company.', 'simplybook');
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
            'description' => __('Zero-indexed list of service providers as returned by the SimplyBook.me API. Empty when no company is connected or no providers exist.', 'simplybook'),
            'items' => [
                'type' => 'object',
                'additionalProperties' => true,
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function defaultExecuteCallback(): ?callable
    {
        $provider = $this->provider;

        return static function () use ($provider): array {
            return $provider->all();
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

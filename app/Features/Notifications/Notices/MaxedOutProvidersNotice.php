<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class MaxedOutProvidersNotice extends AbstractNotice
{
    public const IDENTIFIER = 'maxed_out_providers';

    private EnvironmentConfig $env;

    /**
     * @since 3.3.2 bumped version due to the addition of a constructor
     * argument.
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
        $this->version = '1.0.1';
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('Maximum number of Providers reached', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Please upgrade your plan to configure more Service Providers, or delete existing Providers if you want to add more.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return self::TYPE_INFO;
    }

    /**
     * @inheritDoc
     */
    public function getRoute(): string
    {
        return 'providers';
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'text' => __('Upgrade now', 'simplybook'),
            'link' => $this->env->getUrl('plugin.plans_prices_url'),
        ];
    }
}

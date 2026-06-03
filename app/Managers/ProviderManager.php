<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ProviderInterface;

final class ProviderManager extends AbstractManager
{
    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'provider';
    }

    /**
     * @inheritDoc
     */
    protected function path(): string
    {
        return $this->env->getString('plugin.providers_path');
    }

    /**
     * @inheritDoc
     */
    protected function namespace(): string
    {
        return 'SimplyBook\Providers\\';
    }

    /**
     * @inheritDoc
     */
    protected function suffix(): string
    {
        return 'Provider';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof ProviderInterface;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        $class->provide();
    }

    /**
     * @inheritDoc
     */
    public function afterRegister(): void
    {
        do_action('simplybook_providers_loaded');
    }
}

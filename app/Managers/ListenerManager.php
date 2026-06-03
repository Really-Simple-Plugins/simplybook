<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ListenerInterface;

final class ListenerManager extends AbstractManager
{
    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'listener';
    }

    /**
     * @inheritDoc
     */
    protected function path(): string
    {
        return $this->env->getString('plugin.listeners_path');
    }

    /**
     * @inheritDoc
     */
    protected function namespace(): string
    {
        return 'SimplyBook\Listeners\\';
    }

    /**
     * @inheritDoc
     */
    protected function suffix(): string
    {
        return 'Listener';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof ListenerInterface;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        $class->listen();
    }

    /**
     * @inheritDoc
     */
    public function afterRegister(): void
    {
        do_action('simplybook_listeners_loaded');
    }
}

<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ControllerInterface;

final class ControllerManager extends AbstractManager
{
    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'controller';
    }

    /**
     * @inheritDoc
     */
    protected function path(): string
    {
        return $this->env->getString('plugin.controllers_path');
    }

    /**
     * @inheritDoc
     */
    protected function namespace(): string
    {
        return 'SimplyBook\Controllers\\';
    }

    /**
     * @inheritDoc
     */
    protected function suffix(): string
    {
        return 'Controller';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof ControllerInterface;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        $class->register();
    }

    /**
     * @inheritDoc
     */
    public function afterRegister(): void
    {
        do_action('simplybook_controllers_loaded');
    }
}

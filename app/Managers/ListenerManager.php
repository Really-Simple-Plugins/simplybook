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
        return 'listeners';
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
}

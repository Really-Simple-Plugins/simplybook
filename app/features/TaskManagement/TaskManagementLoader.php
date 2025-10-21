<?php

declare(strict_types=1);

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Features\AbstractLoader;

class TaskManagementLoader extends AbstractLoader
{
    /**
     * @inheritDoc
     */
    public function isEnabled(): bool
    {
        return (bool) get_option('simplybook_onboarding_completed', false);
    }

    /**
     * @inheritDoc
     */
    public function inScope(): bool
    {
        return true;
    }
}
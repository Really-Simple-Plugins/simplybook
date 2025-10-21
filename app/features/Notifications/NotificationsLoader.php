<?php

declare(strict_types=1);

namespace SimplyBook\Features\Notifications;

use SimplyBook\Features\AbstractLoader;

class NotificationsLoader extends AbstractLoader
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
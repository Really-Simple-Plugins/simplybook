<?php

namespace SimplyBook\Features\Notifications;

use SimplyBook\Helpers\Event;

class NotificationsListener
{
    private NotificationsService $service;

    public function __construct(NotificationsService $service)
    {
        $this->service = $service;
    }

    public function listen(): void
    {
    }
}
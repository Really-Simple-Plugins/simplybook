<?php

namespace SimplyBook\Features\Notifications;

use SimplyBook\Helpers\Event;

class NotificationListener
{
    private NotificationsService $service;

    public function __construct(NotificationsService $service)
    {
        $this->service = $service;
    }

    public function listen(): void
    {
        add_action('simplybook_event_' . Event::AUTH_FAILED, [$this, 'handleFailedAuthentication']);
        add_action('simplybook_event_' . Event::AUTH_SUCCEEDED, [$this, 'handleSucceededAuthentication']);
        add_action('simplybook_event_' . Event::CALENDAR_PUBLISHED, [$this, 'handleCalendarPublished']);
    }

    /**
     * Handle the failed authentication event to update notice status.
     */
    public function handleFailedAuthentication(): void
    {
        $this->service->activate(
            Notices\FailedAuthenticationNotice::IDENTIFIER
        );
    }

    /**
     * Handle the succeeded authentication event to update notice status.
     */
    public function handleSucceededAuthentication(): void
    {
        $this->service->deactivate(
            Notices\FailedAuthenticationNotice::IDENTIFIER
        );
    }

    /**
     * Handle the calendar published event to update task status.
     */
    public function handleCalendarPublished(): void
    {
        $this->service->deactivate(
            Notices\PublishWidgetNotice::IDENTIFIER
        );
    }
}
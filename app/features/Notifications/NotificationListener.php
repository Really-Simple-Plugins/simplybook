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
        add_action('simplybook_event_' . Event::CALENDAR_UNPUBLISHED, [$this, 'handleCalendarUnPublished']);
        add_action('simplybook_event_' . Event::PUBLISH_WIDGET_TASK_DISMISSED, [$this, 'dismissPublishWidgetNotice']);
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

    /**
     * Handle the calendar published event to update task status.
     */
    public function handleCalendarUnPublished(): void
    {
        $this->service->activate(
            Notices\PublishWidgetNotice::IDENTIFIER
        );
    }

    /**
     * Dismiss the publish-widget-notice.
     */
    public function dismissPublishWidgetNotice(): void
    {
        $this->service->deactivate(
            Notices\PublishWidgetNotice::IDENTIFIER
        );
    }
}
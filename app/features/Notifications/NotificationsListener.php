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
        add_action('simplybook_event_' . Event::EMPTY_PROVIDERS, [$this, 'handleEmptyProviders']);
        add_action('simplybook_event_' . Event::HAS_PROVIDERS, [$this, 'handleHasProviders']);
    }

    /**
     * Handle the empty providers event to update notice status.
     */
    public function handleEmptyProviders(): void
    {
        $this->service->openNotice(
            Notices\AddMandatoryProviderNotice::IDENTIFIER
        );
    }

    /**
     * Handle the has providers event to update task status.
     */
    public function handleHasProviders(array $arguments): void
    {
        $providersAmount = ($arguments['count'] ?? 1);

        if ($providersAmount === 1) {
            $this->service->hideNotice(
                Notices\AddMandatoryProviderNotice::IDENTIFIER
            );
        }
    }
}
<?php

namespace SimplyBook\Features\Notifications;

use SimplyBook\Interfaces\NoticeInterface;
use SimplyBook\Interfaces\FeatureInterface;

class NotificationsController implements FeatureInterface
{
    private NotificationsEndpoints $endpoints;
    private NotificationsService $service;
    private NotificationListener $listener;

    public function __construct()
    {
        $this->service = new NotificationsService(
            new NotificationsRepository()
        );

        $this->endpoints = new NotificationsEndpoints($this->service);
        $this->listener = new NotificationListener($this->service);
    }

    public function register(): void
    {
        $this->endpoints->register();
        $this->listener->listen();

        $this->initiateNotices();
        add_action('simplybook_plugin_version_upgrade', [$this, 'upgradeNotices']);
    }

    /**
     * This method returns an array of Notice objects that should be added
     * to the database.
     *
     * @internal New Notices should be added here. Upgrade the Notice version if
     * the Notice should be updated. If a Notice should be removed, remove the
     * Notice from this list.
     *
     * @return array<int,NoticeInterface>
     * @throws \LogicException
     */
    private function getNoticeObjects(): array
    {
        return [
            new Notices\AddMandatoryProviderNotice(),
            new Notices\MaxedOutProvidersNotice(),
            new Notices\AddMandatoryServiceNotice(),
            new Notices\MaxedOutServicesNotice(),
            new Notices\FailedAuthenticationNotice(),
            new Notices\PublishWidgetNotice(),
        ];
    }

    /**
     * This method adds the initial Notices to the database if they are not
     * already present.
     */
    private function initiateNotices(): void
    {
        if ($this->service->hasNotices()) {
            return;
        }

        $this->service->addNotices(
            $this->getNoticeObjects()
        );
    }

    /**
     * This method makes sure that if new Notices are added in the update that
     * these Notices are added in the database. Existing Notices will be updated
     * if the version is higher than the current existing Notification with the same id.
     */
    public function upgradeNotices(): void
    {
        if ($this->service->hasNotices() === false) {
            return; // Notices will be added by initiateNotifications()
        }

        $this->service->upgradeNotices(
            $this->getNoticeObjects()
        );
    }
}

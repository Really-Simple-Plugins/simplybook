<?php

declare(strict_types=1);

namespace SimplyBook\Features\Notifications;

use SimplyBook\Interfaces\FeatureInterface;

final class NotificationsFeature implements FeatureInterface
{
    /**
     * @inheritDoc
     */
    public function boot(): void
    {
        add_filter('simplybook_controller_classes', [$this, 'registerControllers']);
        add_filter('simplybook_endpoint_classes', [$this, 'registerEndpoints']);
        add_filter('simplybook_listener_classes', [$this, 'registerListener']);
    }

    /**
     * Add the controllers of the Notifications feature to the list of
     * controllers registered by the plugin.
     */
    public function registerControllers(array $existingControllers): array
    {
        return array_merge($existingControllers, [
            NotificationsController::class,
        ]);
    }

    /**
     * Add the endpoints of the Notifications feature to the list of
     * endpoints registered by the plugin.
     */
    public function registerEndpoints(array $existingEndpoints): array
    {
        return array_merge($existingEndpoints, [
            NotificationsEndpoint::class,
        ]);
    }

    /**
     * Add the listeners of the Notifications feature to the list of
     * listeners registered by the plugin.
     */
    public function registerListener(array $existingEndpoints): array
    {
        return array_merge($existingEndpoints, [
            NotificationListener::class,
        ]);
    }

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

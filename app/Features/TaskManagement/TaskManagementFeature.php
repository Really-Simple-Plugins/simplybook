<?php

declare(strict_types=1);

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Interfaces\FeatureInterface;

final class TaskManagementFeature implements FeatureInterface
{
    /**
     * @inheritDoc
     */
    public function boot(): void
    {
        add_filter('simplybook_plugin_controllers', [$this, 'registerControllers']);
        add_filter('simplybook_plugin_endpoints', [$this, 'registerEndpoints']);
        add_filter('simplybook_plugin_listeners', [$this, 'registerListener']);
    }

    /**
     * Add the controllers of the Task Management feature to the list of
     * controllers registered by the plugin.
     */
    public function registerControllers(array $existingControllers): array
    {
        return array_merge($existingControllers, [
            TaskManagementController::class,
        ]);
    }

    /**
     * Add the endpoints of the Task Management feature to the list of
     * endpoints registered by the plugin.
     */
    public function registerEndpoints(array $existingEndpoints): array
    {
        return array_merge($existingEndpoints, [
            TaskManagementEndpoint::class,
        ]);
    }

    /**
     * Add the listeners of the Task Management feature to the list of
     * listeners registered by the plugin.
     */
    public function registerListener(array $existingEndpoints): array
    {
        return array_merge($existingEndpoints, [
            TaskManagementListener::class,
        ]);
    }

    /**
     * Only enable the Task Management feature when the onboarding is completed.
     */
    public function isEnabled(): bool
    {
        return (bool)get_option('simplybook_onboarding_completed', false);
    }

    /**
     * Task Management is always in scope because it should be able to listen
     * to actions in any context.
     */
    public function inScope(): bool
    {
        return true;
    }
}

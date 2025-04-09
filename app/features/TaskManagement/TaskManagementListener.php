<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Helpers\Event;

class TaskManagementListener
{
    private TaskManagementService $service;

    public function __construct(TaskManagementService $service)
    {
        $this->service = $service;
    }

    public function listen(): void
    {
        add_action('simplybook_event_' . Event::EMPTY_SERVICES, [$this, 'handleEmptyServices']);
        add_action('simplybook_event_' . Event::EMPTY_PROVIDERS, [$this, 'handleEmptyProviders']);
        add_action('simplybook_event_' . Event::HAS_SERVICES, [$this, 'handleHasServices']);
        add_action('simplybook_event_' . Event::HAS_PROVIDERS, [$this, 'handleHasProviders']);
        add_action('simplybook_event_' . Event::NAVIGATE_TO_SIMPLYBOOK, [$this, 'handleNavigateToSimplyBook']);
        add_action('simplybook_save_design_settings', [$this, 'handleDesignSettingsSaved']);
    }

    /**
     * Handle the empty services event to update task status.
     */
    public function handleEmptyServices(): void
    {
        $this->service->openTask(
            Tasks\AddServiceTask::IDENTIFIER
        );
    }

    /**
     * Handle the empty providers event to update task status.
     */
    public function handleEmptyProviders(): void
    {
        $this->service->openTask(
            Tasks\AddProviderTask::IDENTIFIER
        );
    }

    /**
     * Handle the has services event to update task status.
     */
    public function handleHasServices(): void
    {
        $this->service->completeTask(
            Tasks\AddServiceTask::IDENTIFIER
        );
    }

    /**
     * Handle the has providers event to update task status.
     */
    public function handleHasProviders(): void
    {
        $this->service->completeTask(
            Tasks\AddProviderTask::IDENTIFIER
        );
    }

    /**
     * Handle navigation to SimplyBook event to update task status.
     */
    public function handleNavigateToSimplyBook(): void
    {
        $this->service->completeTask(
            Tasks\GoToSimplyBookSystemTask::IDENTIFIER
        );
    }

    /**
     * Handle the after save options event to update task status.
     */
    public function handleDesignSettingsSaved(): void
    {
        $this->service->completeTask(
            Tasks\CustomizeDesignTask::IDENTIFIER
        );
    }
}
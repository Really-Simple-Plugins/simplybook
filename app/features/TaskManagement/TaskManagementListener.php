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
        add_action('simplybook_event_' . Event::SUBSCRIPTION_DATA_LOADED, [$this, 'handleSubscriptionDataLoaded']);
        add_action('simplybook_save_design_settings', [$this, 'handleDesignSettingsSaved']);
    }

    /**
     * Handle the empty services event to update task status.
     */
    public function handleEmptyServices(): void
    {
        $this->service->flagTaskUrgent(
            Tasks\AddMandatoryServiceTask::IDENTIFIER
        );
    }

    /**
     * Handle the empty providers event to update task status.
     */
    public function handleEmptyProviders(): void
    {
        $this->service->flagTaskUrgent(
            Tasks\AddMandatoryProviderTask::IDENTIFIER
        );
    }

    /**
     * Handle the has services event to update task status.
     */
    public function handleHasServices(array $arguments): void
    {
        $servicesAmount = ($arguments['count'] ?? 1);

        if ($servicesAmount === 1) {
            $this->service->completeTask(
                Tasks\AddMandatoryServiceTask::IDENTIFIER
            );
        }

        if ($servicesAmount > 1) {
            $this->service->completeTask(
                Tasks\AddAllServicesTask::IDENTIFIER
            );
        }
    }

    /**
     * Handle the has providers event to update task status.
     */
    public function handleHasProviders(array $arguments): void
    {
        $providersAmount = ($arguments['count'] ?? 1);

        if ($providersAmount === 1) {
            $this->service->completeTask(
                Tasks\AddMandatoryProviderTask::IDENTIFIER
            );
        }

        if ($providersAmount > 1) {
            $this->service->completeTask(
                Tasks\AddAllProvidersTask::IDENTIFIER
            );
        }
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
     * Handle subscription data loaded event to update task status.
     */
    public function handleSubscriptionDataLoaded(array $arguments): void
    {
        $subscription = ($arguments['subscription_name'] ?? '');
        $isExpired = ($arguments['is_expired'] ?? false);

        if (empty($subscription) || $subscription !== 'Trial') {
            return;
        }

        if ($isExpired) {
            $this->service->openTask(
                Tasks\TrialExpiredTask::IDENTIFIER
            );
        }

        if ($isExpired === false) {
            $this->service->hideTask(
                Tasks\TrialExpiredTask::IDENTIFIER
            );
        }
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
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
        add_action('simplybook_event_' . Event::SPECIAL_FEATURES_LOADED, [$this, 'handleSpecialFeaturesLoaded']);
        add_action('simplybook_event_' . Event::AUTH_FAILED, [$this, 'handleFailedAuthentication']);
        add_action('simplybook_event_' . Event::CALENDAR_PUBLISHED, [$this, 'handleCalendarPublished']);
        add_action('simplybook_event_' . Event::CALENDAR_UNPUBLISHED, [$this, 'handleCalendarUnPublished']);
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
        $limits = ($arguments['limits'] ?? []);

        if (!empty($subscription) && $subscription === 'Trial') {
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

        $this->handleSubscriptionLimits($limits);
    }

    /**
     * Handle subscription limits to update task status.
     */
    private function handleSubscriptionLimits(array $limits): void
    {
        foreach ($limits as $limit) {
            if (empty($limit['key'])) {
                continue;
            }

            $maxAmountForLimit = ($limit['total'] ?? 0);
            $amountLeftForLimit = ($limit['rest'] ?? 0);

            switch ($limit['key']) {
                case 'sheduler_limit':
                    $this->handleShedulerLimit($amountLeftForLimit);
                    break;
                case 'provider_limit':
                    $this->handleProviderLimit($amountLeftForLimit, $maxAmountForLimit);
            }
        }
    }

    /**
     * Handle the sheduler limit to update task status. The sheduler limit is
     * the limits associated with the number of bookings that can be made.
     *
     * @internal typo in 'sheduler' is on purpose as the typo is in the API
     * response as well.
     */
    private function handleShedulerLimit(int $amountLeft): void
    {
        if ($amountLeft <= 1) {
            $this->service->flagTaskUrgent(
                Tasks\MaximumBookingsTask::IDENTIFIER
            );
        }

        if ($amountLeft > 1) {
            $this->service->hideTask(
                Tasks\MaximumBookingsTask::IDENTIFIER
            );
        }
    }

    /**
     * Handle the provider limit to update task status.
     */
    private function handleProviderLimit(int $amountLeft, int $maxAmount): void
    {
        $amountUsed = ($maxAmount - $amountLeft);

        if ($amountLeft === 0) {
            $this->service->flagTaskUrgent(
                Tasks\MaxedOutProvidersTask::IDENTIFIER
            );
        }

        if ($amountLeft > 1) {
            $this->service->hideTask(
                Tasks\MaxedOutProvidersTask::IDENTIFIER
            );
        }

        if ($amountUsed > 1) {
            $this->service->completeTask(
                Tasks\AddAllProvidersTask::IDENTIFIER
            );
        }
    }

    /**
     * Handle the special features loaded event to update task status.
     */
    public function handleSpecialFeaturesLoaded(array $specialFeatures): void
    {
        foreach ($specialFeatures as $plugin) {
            if (empty($plugin['key'])) {
                continue;
            }

            switch ($plugin['key']) {
                case 'paid_events':
                    $this->handlePaidEventsSpecialFeature($plugin);
                    break;
            }
        }
    }

    /**
     * Handle the paid events special feature to update task status.
     */
    private function handlePaidEventsSpecialFeature(array $plugin): void
    {
        $pluginIsActive = ($plugin['is_active'] ?? false);

        if ($pluginIsActive) {
            $this->service->completeTask(
                Tasks\AcceptPaymentsTask::IDENTIFIER
            );
        }

        if ($pluginIsActive === false) {
            $this->service->openTask(
                Tasks\AcceptPaymentsTask::IDENTIFIER
            );
        }
    }

    /**
     * Handle the failed authentication event to update task status.
     */
    public function handleFailedAuthentication(): void
    {
        $this->service->flagTaskUrgent(
            Tasks\FailedAuthenticationTask::IDENTIFIER
        );
    }

    /**
     * Handle the calendar published event to update task status.
     */
    public function handleCalendarPublished(): void
    {
        $this->service->completeTask(
            Tasks\PublishWidgetTask::IDENTIFIER
        );
    }

    /**
     * Handle the calendar published event to update task status.
     */
    public function handleCalendarUnPublished(): void
    {
        $this->service->flagTaskUrgent(
            Tasks\PublishWidgetTask::IDENTIFIER
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
<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Support\Helpers\Event;
use SimplyBook\Services\PromotionService;
use SimplyBook\Services\CompanyInfoService;
use SimplyBook\Services\SubscriptionDataService;

class TaskManagementListener
{
    private TaskManagementService $service;
    private PromotionService $promotionService;
    private SubscriptionDataService $subscriptionDataService;
    private CompanyInfoService $companyInfoService;

    public function __construct(
        TaskManagementService $service,
        PromotionService $promotionService,
        SubscriptionDataService $subscriptionDataService,
        CompanyInfoService $companyInfoService
    ) {
        $this->service = $service;
        $this->promotionService = $promotionService;
        $this->subscriptionDataService = $subscriptionDataService;
        $this->companyInfoService = $companyInfoService;
    }

    public function listen(): void
    {
        add_action('admin_init', [$this, 'handleDateDrivenTasks']);
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
        add_action('simplybook_event_' . Event::COMPANY_INFO_CHECKED, [$this, 'handleCompanyInfoChecked']);
        add_action('simplybook_event_' . Event::BOOKING_PAGE_VISITED, [$this, 'handleBookingPageVisited']);
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

        if (!empty($subscription)) {
            $this->handleBlackFridayTask($subscription);
            $this->handleChristmasPromotionTask($subscription);
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
     * Handle the booking page visited event to update task status.
     */
    public function handleBookingPageVisited(): void
    {
        $this->service->completeTask(
            Tasks\VisitYourBookingPageTask::IDENTIFIER
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

    /**
     * Method will only set the Black Friday task visible and mark it as upgrade
     * if the current subscription is 'Trial' and the current date is between
     * the Black Friday start and end date mentioned in the env config.
     */
    private function handleBlackFridayTask(string $subscriptionType): void
    {
        $isTrial = (strtolower($subscriptionType) === 'trial');

        if ($isTrial && $this->promotionService->isBlackFriday()) {
            $this->service->setTaskBubbleCounter(1);
            $this->service->markTaskUpgrade(
                Tasks\BlackFridayTask::IDENTIFIER
            );
            return;
        }

        $this->service->setTaskBubbleCounter(0);
        $this->service->hideTask(
            Tasks\BlackFridayTask::IDENTIFIER
        );
    }

    /**
     * Method will only set the Christmas promo task visible and mark it as
     * upgrade if the current subscription is 'Trial' and the current date
     * is between the Christmas promo start and end date mentioned in the
     * env config.
     */
    private function handleChristmasPromotionTask(string $subscriptionType): void
    {
        $isTrial = (strtolower($subscriptionType) === 'trial');

        if ($isTrial && $this->promotionService->isChristmasPeriod()) {
            $this->service->setTaskBubbleCounter(1);
            $this->service->markTaskUpgrade(
                Tasks\ChristmasPromotionTask::IDENTIFIER
            );
            return;
        }

        $this->service->setTaskBubbleCounter(0);
        $this->service->hideTask(
            Tasks\ChristmasPromotionTask::IDENTIFIER
        );
    }

    /**
     * Method is hooked on 'admin_init' action to check for date driven tasks.
     * Because these tasks do not depend solely on events but also on the
     * current date we should check them on every page load.
     * @internal make sure you cache your conditionals
     */
    public function handleDateDrivenTasks(): void
    {
        if ($this->promotionService->isBlackFriday()) {
            $this->handleBlackFridayTask(
                (string) $this->subscriptionDataService->search('subscription_name', '')
            );
        }

        if ($this->promotionService->isChristmasPeriod()) {
            $this->handleChristmasPromotionTask(
                (string) $this->subscriptionDataService->search('subscription_name', '')
            );
        }

        $this->handleCompanyInfoTask();
    }

    /**
     * Handle the company info check event to update task status.
     */
    public function handleCompanyInfoChecked(array $arguments): void
    {
        $hasCompanyInfo = ($arguments['has_company_info'] ?? false);

        if ($hasCompanyInfo) {
            $this->service->completeTask(
                Tasks\AddCompanyInfoTask::IDENTIFIER
            );
        }
    }

    /**
     * Handle the company info task. This is a date-driven task that checks
     * if the company info is present.
     *
     * Logic:
     * - If task is already completed, do nothing
     * - Check if company info is present via API
     * - If present, complete the task
     * - If not present and not snoozed, show the task
     */
    private function handleCompanyInfoTask(): void
    {
        $task = $this->service->getTask(Tasks\AddCompanyInfoTask::IDENTIFIER);

        if ($task === null) {
            return;
        }

        // Skip if already completed
        if ($task->getStatus() === Tasks\AbstractTask::STATUS_COMPLETED) {
            return;
        }

        // Check company info via API (this will dispatch COMPANY_INFO_CHECKED event)
        // The result is cached for 24 hours
        $hasCompanyInfo = $this->companyInfoService->hasCompanyInfo();

        if ($hasCompanyInfo) {
            $this->service->completeTask(
                Tasks\AddCompanyInfoTask::IDENTIFIER
            );
        } elseif (!$task->isSnoozed()) {
            // Only show task if not snoozed
            $this->service->openTask(
                Tasks\AddCompanyInfoTask::IDENTIFIER
            );
        }
    }
}

<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Interfaces\FeatureInterface;

class TaskManagementController implements FeatureInterface
{
    private TaskManagementEndpoints $endpoints;
    private TaskManagementService $service;
    private TaskManagementListener $listener;

    public function __construct(TaskManagementService $service, TaskManagementEndpoints $endpoints, TaskManagementListener $listener)
    {
        $this->service = $service;
        $this->endpoints = $endpoints;
        $this->listener = $listener;
    }

    public function register(): void
    {
        $this->endpoints->register();
        $this->listener->listen();

        $this->initiateTasks();
        add_action('simplybook_plugin_version_upgrade', [$this, 'upgradeTasks']);
        add_action('simplybook_plugin_version_upgrade', [$this, 'migrateTaskOptions'], 10, 2);
    }

    /**
     * This method returns an array of task objects that should be added to the
     * database.
     *
     * @internal New tasks should be added here. Upgrade the task version if the
     * task should be updated. If a task should be removed, remove the task from
     * this list.
     *
     * @return array<int, class-string<TaskInterface>> Array of Task class-strings
     */
    private function getTaskClassStrings(): array
    {
        return [
            Tasks\FailedAuthenticationTask::class,
            Tasks\PublishWidgetTask::class,
            Tasks\VisitYourBookingPageTask::class,
            Tasks\AddMandatoryServiceTask::class,
            Tasks\AddMandatoryProviderTask::class,
            Tasks\GoToSimplyBookSystemTask::class,
            Tasks\AddAllServicesTask::class,
            Tasks\AddAllProvidersTask::class,
            Tasks\CustomizeDesignTask::class,
            Tasks\TrialExpiredTask::class,
            Tasks\MaximumBookingsTask::class,
            Tasks\InstallAppTask::class,
            Tasks\AcceptPaymentsTask::class,
            Tasks\MaxedOutProvidersTask::class,
            Tasks\PostOnSocialMediaTask::class,
            Tasks\GatherClientInfoTask::class,
            Tasks\BlackFridayTask::class,
            Tasks\ChristmasPromotionTask::class,
            Tasks\AddCompanyInfoTask::class,
        ];
    }

    /**
     * This method adds the initial tasks to the database if they are not
     * already present.
     */
    private function initiateTasks(): void
    {
        if ($this->service->hasTasks()) {
            return;
        }

        $this->service->addTasks(
            $this->getTaskClassStrings()
        );
    }

    /**
     * This method makes sure that if new tasks are added in the update that
     * these tasks are added in the database. Existing tasks will be updated
     * if the version is higher than the current existing task with the same id.
     */
    public function upgradeTasks(): void
    {
        if ($this->service->hasTasks() === false) {
            return; // Tasks will be added by initiateTasks()
        }

        $this->service->upgradeTasks(
            $this->getTaskClassStrings()
        );
    }

    /**
     * Migrate options used by tasks
     *
     * @since 3.3.0
     *      - Removed legacy {@see PublishWidgetNotice} completed flag
     *      - Removed legacy {@see PublishWidgetTask} completed flag
     */
    public function migrateTaskOptions(string $previousVersion, string $newVersion): void
    {
        if ($previousVersion && version_compare($previousVersion, '3.3.0', '<')) {
            delete_option('simplybook_calendar_published_notification_completed');
            delete_option('simplybook_calendar_published_task_completed');
        }
    }
}

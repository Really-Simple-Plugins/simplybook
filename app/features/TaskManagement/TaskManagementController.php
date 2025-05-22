<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Interfaces\FeatureInterface;

class TaskManagementController implements FeatureInterface
{
    private TaskManagementEndpoints $endpoints;
    private TaskManagementService $service;
    private TaskManagementListener $listener;

    public function __construct()
    {
        $this->service = new TaskManagementService(
            new TaskManagementRepository
        );

        $this->endpoints = new TaskManagementEndpoints($this->service);
        $this->listener = new TaskManagementListener($this->service);
    }

    public function register()
    {
        $this->endpoints->register();
        $this->listener->listen();

        $this->initiateTasks();
        add_action('simplybook_plugin_version_upgrade', [$this, 'upgradeTasks']);
    }

    /**
     * This method returns an array of task objects that should be added to the
     * database.
     *
     * @internal New tasks should be added here. Upgrade the task version if the
     * task should be updated. If a task should be removed, remove the task from
     * this list.
     *
     * @return TaskInterface[]
     */
    private function getTaskObjects(): array
    {
        // Add new tasks here
        $pluginTasks = [
            new Tasks\FailedAuthenticationTask(),
            new Tasks\PublishWidgetTask(),
            new Tasks\AddMandatoryServiceTask(),
            new Tasks\AddMandatoryProviderTask(),
            new Tasks\GoToSimplyBookSystemTask(),
            new Tasks\AddAllServicesTask(),
            new Tasks\AddAllProvidersTask(),
            new Tasks\CustomizeDesignTask(),
            new Tasks\TrialExpiredTask(),
            new Tasks\MaximumBookingsTask(),
            new Tasks\InstallAppTask(),
            new Tasks\AcceptPaymentsTask(),
            new Tasks\MaxedOutProvidersTask(),
            new Tasks\PostOnSocialMediaTask(),
            new Tasks\GatherClientInfoTask(),
        ];

        return array_filter($pluginTasks, function ($task) {
            return $task instanceof TaskInterface;
        });
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
            $this->getTaskObjects()
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
            $this->getTaskObjects()
        );
    }
}
<?php
namespace SimplyBook\Controllers;

use SimplyBook\Services\TaskService;
use SimplyBook\Interfaces\ControllerInterface;

class TaskController implements ControllerInterface
{
    private TaskService $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
        add_action('simplybook_daily', [$this, 'updateTasks']);
    }

    public function handlePluginActivation()
    {
        $this->service->addInitialTasks();
    }

    /**
     * On a daily basis, update the task options
     */
    public function updateTasks(): void
    {
        $taskData = $this->service->getRawTasksConfig();
        $this->service->validateTaskConditions();
    }
}
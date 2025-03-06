<?php
namespace SimplyBook\App\Controllers;

use SimplyBook\App\Services\TaskService;
use SimplyBook\Interfaces\ControllerInterface;

/**
 * todo
 * Is this a TaskFeature? Where we can add the Task class as a TaskService
 * dependency via the constructor?
 */
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
        $taskData = $this->service->getRawTasks();
        // todo, is this a completed method?
    }
}
<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Helpers\Event;
use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;
use SimplyBook\Features\TaskManagement\Tasks\PublishWidgetTask;

class TaskManagementRepository
{
    const OPTION_NAME = 'simplybook_tasks';

    /** @var TaskInterface[] */
    private array $tasks = [];

    public function __construct()
    {
        $this->loadTasksFromDatabase();
    }

    /**
     * Retrieve a single task by its ID
     */
    public function getTask(string $taskId): ?TaskInterface
    {
        return $this->tasks[$taskId] ?? null;
    }

    /**
     * Retrieve all registered tasks
     * @return TaskInterface[]
     */
    public function getAllTasks(bool $strict = false): array
    {
        $tasks = $this->tasks;

        // If strict mode is enabled, remove tasks that are hidden
        if ($strict) {
            $tasks = array_filter($tasks, function ($task) {
                return $task->getStatus() !== AbstractTask::STATUS_HIDDEN;
            });
        }

        return $tasks;
    }

    /**
     * Add a single task to the repository
     */
    public function addTask(TaskInterface $task, bool $save = true): void
    {
        $this->tasks[$task->getId()] = $task;

        if ($save) {
            $this->saveTasksToDatabase();
        }
    }

    /**
     * Upgrade a task in the repository. Only replace existing tasks with same
     * identifier if the version is lower than the new task version.
     */
    public function upgradeTask(TaskInterface $task, bool $save = true): void
    {
        $existingTask = $this->getTask($task->getId());
        $taskExists = !empty($existingTask);

        $taskIsUpdatable = (
            !$taskExists
            || (version_compare($existingTask->getVersion(), $task->getVersion(), '<'))
        );

        if ($taskIsUpdatable === false) {
            return;
        }

        // Keep current status if new task does not want to reactivate on
        // upgrade
        if ($taskExists && ($task->reactivateOnUpgrade() === false)) {
            $task->setStatus(
                $existingTask->getStatus(),
            );
        }

        // Upgrades existing tasks and add new tasks
        $this->addTask($task, $save);
    }

    /**
     * Remove a task from the repository
     */
    public function removeTask(TaskInterface $task, bool $save = true): void
    {
        unset($this->tasks[$task->getId()]);

        if ($save) {
            $this->saveTasksToDatabase();
        }
    }

    /**
     * Remove a task by its ID from the repository
     */
    public function removeTaskById(string $taskId, bool $save = true): void
    {
        if (isset($this->tasks[$taskId])) {
            unset($this->tasks[$taskId]);
        }

        if ($save) {
            $this->saveTasksToDatabase();
        }
    }

    /**
     * Update the status of a task if the task exists. If the task is required
     * and the status is set to 'dismissed', the status will not be updated.
     */
    public function updateTaskStatus(string $taskId, string $status): void
    {
        $task = $this->getTask($taskId);
        if ($task === null) {
            return;
        }

        if ($task->isRequired() && $status === AbstractTask::STATUS_DISMISSED) {
            return; // Not allowed
        }

        if ($taskId === PublishWidgetTask::IDENTIFIER) {
            Event::dispatch(Event::PUBLISH_WIDGET_TASK_DISMISSED);
        }

        $task->setStatus($status);
        $this->addTask($task);
    }

    /**
     * Load tasks from the WordPress database
     */
    private function loadTasksFromDatabase(): void
    {
        $storedTasks = get_option(self::OPTION_NAME, []);
        $this->tasks = is_array($storedTasks) ? $storedTasks : [];
    }

    /**
     * Save tasks to the WordPress database
     */
    public function saveTasksToDatabase(): void
    {
        update_option(self::OPTION_NAME, $this->tasks);
    }
}
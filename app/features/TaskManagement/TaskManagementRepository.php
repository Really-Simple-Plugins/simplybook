<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Interfaces\TaskInterface;

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
    public function getAllTasks(): array
    {
        return $this->tasks;
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
    public function upgradeTask(TaskInterface $task): void
    {
        $existingTask = $this->getTask($task->getId());

        $taskIsUpdatable = (
            empty($existingTask)
            || (version_compare($existingTask->getVersion(), $task->getVersion(), '<'))
        );

        if ($taskIsUpdatable === false) {
            return;
        }

        // Keep current status if new task does not want to reactivate on
        // upgrade
        if ($task->reactivateOnUpgrade() === false) {
            $task->setStatus(
                $existingTask->getStatus(),
            );
        }

        $this->addTask($task, false);
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
     * Update the status of a task if the task exists
     */
    public function updateTaskStatus(string $taskId, string $status): void
    {
        $task = $this->getTask($taskId);
        if ($task === null) {
            return;
        }

        $task->setStatus($status);
        $this->saveTasksToDatabase();
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
<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;

class TaskManagementService
{
    private TaskManagementRepository $repository;

    public function __construct(TaskManagementRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Check if there are tasks
     */
    public function hasTasks(): bool
    {
        return !empty($this->repository->getAllTasks());
    }

    /**
     * Get all tasks
     * @return TaskInterface[]
     */
    public function getAllTasks(): array
    {
        return $this->repository->getAllTasks();
    }

    /**
     * Add multiple tasks at once
     * @param TaskInterface[] $tasks
     */
    public function addTasks(array $tasks): void
    {
        foreach ($tasks as $task) {
            $this->repository->addTask($task, false);
        }
        $this->repository->saveTasksToDatabase();
    }

    /**
     * Upgrade the tasks. Only replace existing tasks with same identifier if
     * the version is lower than the new task version. Add missing tasks and
     * remove tasks that are no longer present.
     * @param TaskInterface[] $tasks
     */
    public function upgradeTasks(array $tasks): void
    {
        // Remove tasks that are no longer present. Maybe that are them all?
        $deletableTasksList = $this->repository->getAllTasks();

        foreach ($tasks as $task) {
            $this->repository->upgradeTask($task, false);

            // Current tasks is not deletable so remove it from the list
            unset($deletableTasksList[$task->getId()]);
        }

        // If list still contains tasks, the upgrade requests them to be removed
        if (!empty($deletableTasksList)) {
            $this->removeDeletableTasksAfterUpgrade($deletableTasksList, false);
        }

        $this->repository->saveTasksToDatabase();
    }

    /**
     * Remove tasks that are no longer present in our Task Object list. Such
     * tasks are now a __PHP_Incomplete_Class and do not implement the
     * TaskInterface. Because of this we cannot use the task classes.
     */
    private function removeDeletableTasksAfterUpgrade(array $deletableTasksList, bool $save = true): void
    {
        foreach ($deletableTasksList as $taskId => $deletedTask) {
            $this->repository->removeTaskById($taskId, $save);
        }

        if ($save) {
            $this->repository->saveTasksToDatabase();
        }
    }

    /**
     * Remove multiple tasks at once
     * @param TaskInterface[] $tasks
     */
    public function removeTasks(array $tasks, bool $save = true): void
    {
        foreach ($tasks as $task) {
            $this->repository->removeTask($task, $save);
        }

        if ($save) {
            $this->repository->saveTasksToDatabase();
        }
    }

    /**
     * Dismiss a task by setting the status to 'dismissed'. Only allowed if
     * the task is not required.
     */
    public function dismissTask(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_DISMISSED);
    }

    /**
     * Open a task by setting the status to 'open'
     */
    public function openTask(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_OPEN);
    }

    /**
     * Set the task to 'urgent' status
     */
    public function flagTaskUrgent(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_URGENT);
    }

    /**
     * Hide a task by setting the status to 'hidden'
     */
    public function hideTask(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_HIDDEN);
    }

    /**
     * Complete a task by setting the status to 'completed'
     */
    public function completeTask(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_COMPLETED);
    }
}
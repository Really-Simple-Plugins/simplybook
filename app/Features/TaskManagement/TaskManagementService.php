<?php

namespace SimplyBook\Features\TaskManagement;

use InvalidArgumentException;
use SimplyBook\Bootstrap\App;
use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;

/**
 * @SuppressWarnings("PHPMD.TooManyPublicMethods")
 */
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
     * Get a single task by its ID
     */
    public function getTask(string $taskId): ?TaskInterface
    {
        return $this->repository->getTask($taskId);
    }

    /**
     * Get all tasks as plain associative arrays, optionally filtered by
     * status. Returns a zero-indexed list so the result is JSON-array friendly.
     *
     * @return array<int, array<string, mixed>>
     * @throws InvalidArgumentException If the status filter is invalid
     */
    public function getTasks(?string $statusFilter = null, bool $strict = false): array
    {
        $tasks = array_map(static function (TaskInterface $task): array {
            return $task->toArray();
        }, $this->repository->getAllTasks($strict));

        if ($statusFilter !== null) {
            if (!in_array($statusFilter, AbstractTask::allowedStatuses(), true)) {
                throw new InvalidArgumentException('Invalid status filter: ' . $statusFilter);
            }

            $tasks = array_filter($tasks, static function (array $task) use ($statusFilter): bool {
                return ($task['status'] ?? null) === $statusFilter;
            });
        }

        return array_values($tasks);
    }

    /**
     * Add multiple tasks at once
     * @param class-string<TaskInterface>[] $tasks
     * @throws \Exception If task class cannot be instantiated
     */
    public function addTasks(array $tasks): void
    {
        foreach ($tasks as $taskClassString) {
            $task = App::getInstance()->make($taskClassString);
            $this->repository->addTask($task, false);
        }
        $this->repository->saveTasksToDatabase();
    }

    /**
     * Upgrade the tasks. Only replace existing tasks with same identifier if
     * the version is lower than the new task version. Add missing tasks and
     * remove tasks that are no longer present.
     * @param class-string<TaskInterface>[] $tasks
     * @throws \Exception If task class cannot be instantiated
     */
    public function upgradeTasks(array $tasks): void
    {
        // Remove tasks that are no longer present. Maybe that are them all?
        $deletableTasksList = $this->repository->getAllTasks();

        foreach ($tasks as $taskClassString) {
            $task = App::getInstance()->make($taskClassString);

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
        foreach (array_keys($deletableTasksList) as $taskId) {
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

    /**
     * Set the task to 'upgrade' status. This is used for upsell reasons. For
     * example with Black Friday promotions.
     */
    public function markTaskUpgrade(string $taskId): void
    {
        $this->repository->updateTaskStatus($taskId, AbstractTask::STATUS_UPGRADE);
    }

    /**
     * Update the task bubble counter shown in the admin menu
     */
    public function setTaskBubbleCounter(int $count): void
    {
        update_option(AbstractTask::MENU_BUBBLE_OPTION_KEY, $count);
    }

    /**
     * Snooze a task for a specified duration. Only works for snoozable tasks.
     * The task's getStatus() will return 'hidden' while snoozed.
     */
    public function snoozeTask(string $taskId): void
    {
        $task = $this->repository->getTask($taskId);

        if ($task === null || !$task->isSnoozable()) {
            return;
        }

        $task->snooze();
        $this->repository->addTask($task);
    }

    /**
     * Update the status of a task identified by its ID. Returns the updated
     * task on success, or null when the status is not allowed or the task
     * could not be found.
     * @throws InvalidArgumentException If the status is not allowed
     */
    public function updateStatusFromId(string $taskId, string $status): ?TaskInterface
    {
        if (!in_array($status, AbstractTask::allowedStatuses(), true)) {
            throw new InvalidArgumentException('Invalid status: ' . $status);
        }

        $this->repository->updateTaskStatus($taskId, $status);

        return $this->repository->getTask($taskId);
    }

    /**
     * Check if a task is completed
     */
    public function isTaskCompleted(string $taskId): bool
    {
        $task = $this->repository->getTask($taskId);

        if ($task === null) {
            return false;
        }

        return $task->getStatus() === AbstractTask::STATUS_COMPLETED;
    }
}

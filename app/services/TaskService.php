<?php

namespace SimplyBook\Services;

use SimplyBook\App;
use SimplyBook\Traits\HasAllowlistControl;

class TaskService
{
    use HasAllowlistControl;

    const TASK_OPTION_PREFIX = 'simplybook_task_';

    /**
     * Return the raw tasks configuration using the App::tasks() method.
     */
    public function getRawTasksConfig(): array
    {
        return App::tasks()->all();
    }

    /**
     * Add a task to the list of tasks. The given taskID will be sanitized as a
     * slug and formatted like 'simplybook_task_{taskID}'. Existing tasks will
     * be overwritten.
     */
    public function addTask(string $taskId): void
    {
        update_option(self::TASK_OPTION_PREFIX . sanitize_title($taskId), true, false);
    }

    /**
     * Dismiss a task by taskId. The given taskID will be sanitized as a slug
     * and formatted like 'simplybook_task_{taskID}' to find and delete the
     * option.
     */
    public function dismissTask(string $taskId): void
    {
        delete_option(self::TASK_OPTION_PREFIX . sanitize_title($taskId));
    }

    /**
     * Check if a task is completed by checking if the option exists in the
     * database. The taskID will be sanitized as a slug and formatted like
     * 'simplybook_task_{taskID}'. If the option exists, the task is active and
     * not completed yet.
     */
    public function taskIsCompleted(string $taskId): bool
    {
        $taskExist = (bool) get_option(self::TASK_OPTION_PREFIX . sanitize_title($taskId), false);
        return $taskExist === false;
    }

    /**
     * Add initial tasks that are marked with
     * ['condition']['type'] === activation by inserting an option
     */
    public function addInitialTasks(): void
    {
        $tasks = $this->getRawTasksConfig();
        foreach ($tasks as $task) {
            if (isset($task['condition']['type']) && $task['condition']['type'] === 'activation') {
                $this->addTask($task['id']);
            }
        }
    }

    /**
     * Validate the tasks by checking the conditions of each task. If the
     * condition is met, the task will be dismissed, otherwise it will be added
     * or updated.
     */
    public function validateTaskConditions(): void
    {
        $tasks = $this->getRawTasksConfig();
        $serversideFunctionableTasks = array_filter($tasks, function($task) {
            return (
                isset($task['condition']['function'])
                && (isset($task['condition']['type']) && $task['condition']['type'] === 'serverside')
            );
        });

        foreach ($serversideFunctionableTasks as $task) {
            $taskFunction = $task['condition']['function'];
            $taskCompletedWhenFalse = str_contains($taskFunction, '!');

            // Remove the '!' from the function name if needed
            $taskFunction = $taskCompletedWhenFalse ? substr($taskFunction, 1) : $taskFunction;

            $taskCompleted = $this->functionableConditionIsMet($taskFunction);

            if ($taskCompletedWhenFalse) {
                $taskCompleted = !$taskCompleted;
            }

            if ($taskCompleted) {
                $this->dismissTask($task['id']);
            } else {
                $this->addTask($task['id']);
            }
        }
    }

    /**
     * Method can process a given function as a string. Currently used to check
     * if the function in the condition of a task returns true.
     * @see validateTaskConditions
     */
    private function functionableConditionIsMet(string $function): bool
    {
        if ($this->userCanManage() === false) {
            return false;
        }

        if ($function === '__true__') {
            return true;
        }

        if (function_exists($function)) {
            return $function();
        }

        //e.g. (new \Simplybook_old\Api\Api())->has_services()
        if (preg_match('/\(new (.+)\)->(.+)\(\)/', $function, $matches)) {
            $class = $matches[1];
            $method = $matches[2];
            if (class_exists($class) && method_exists($class, $method)) {
                return (new $class)->$method();
            } else {
                error_log("Class or method does not exist: $class, $method");
            }
        } else {
            error_log("Function not recognized: $function");
        }

        return true;
    }

    /**
     * Get the tasks, including those that are not completed yet and those that
     * are completed. We recognize completed tasks by checking if the option
     * exists in the database.
     *
     * @return array The list of tasks, with completed tasks at the end and
     * premium tasks at the very end.
     */
    public function getTasks(): array
    {
        $completedTasks = [];
        $tasks = $this->getRawTasksConfig();

        foreach ($tasks as $key => $task) {
            if ($this->taskIsCompleted($task['id'])) {
                continue;
            }

            //we want to have these completed ones at the end so remove them
            // here, and store in separate array
            unset($tasks[$key]);
            $task['status'] = 'completed';
            //as its completed, we can remove any action
            unset($task['action']);
            $completedTasks[] = $task;
        }

        // add completed tasks to the end
        $tasks = array_merge($tasks, $completedTasks);

        // move premium tasks to the end
        $premiumTasks = array_filter($tasks, function($task) {
            return $task['status'] === 'premium';
        });
        $tasks = array_filter($tasks, function($task) {
            return $task['status'] !== 'premium';
        });

        return array_merge($tasks, $premiumTasks);
    }

}
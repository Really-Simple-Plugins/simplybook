<?php

namespace SimplyBook\App\Services;

use SimplyBook\App;
use SimplyBook\Traits\HasAllowlistControl;

// todo - https://teamdotblue.atlassian.net/browse/NL14RSP2-14
class TaskService
{
    use HasAllowlistControl;

    public function addTask(string $taskId): void
    {
        update_option('simplybook_task_' . sanitize_title($taskId), true, false);
    }

    public function dismissTask(string $taskId): void
    {
        delete_option('simplybook_task_' . sanitize_title($taskId));
    }

    public function getRawTasks(): array
    {
        return App::tasks();
    }

    /**
     * Add initial tasks that are marked with
     * ['condition']['type'] === activation by inserting an option
     */
    public function addInitialTasks(): void
    {
        $tasks = $this->getRawTasks();
        foreach ($tasks as $task) {
            if (isset($task['condition']['type']) && $task['condition']['type'] === 'activation') {
                update_option('simplybook_task_' . $task['id'], true, false);
            }
        }
    }

    public function validateTasks(): void
    {
        $tasks = $this->getRawTasks();
        foreach ($tasks as $task) {
            if (isset($task['condition']['type']) && $task['condition']['type'] === 'serverside') {
                $invert = str_contains($task['condition']['function'], '!');
                $function = $invert ? substr($task['condition']['function'], 1) : $task['condition']['function'];
                $isValid = $this->validateFunction($function);

                if ($invert) {
                    $isValid = !$isValid;
                }
                if ($isValid) {
                    $this->dismissTask($task['id']);
                } else {
                    $this->addTask($task['id']);
                }
            }
        }
    }

    public function validateFunction(string $function): bool
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

        return false;
    }

    public function getTasks(): array
    {
        $completedTasks = [];
        $tasks = $this->getRawTasks();

        foreach ($tasks as $key => $task) {
            if (get_option('simplybook_task_' . sanitize_title($task['id']), false)) {
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
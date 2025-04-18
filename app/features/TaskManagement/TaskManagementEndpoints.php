<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;

class TaskManagementEndpoints
{
    use HasRestAccess;
    use HasAllowlistControl;

    private TaskManagementService $service;

    public function __construct(TaskManagementService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_filter('simplybook_rest_routes', [$this, 'addTaskRoutes']);
    }

    /**
     * Add the task routes to the REST API.
     */
    public function addTaskRoutes(array $routes): array
    {
        if ($this->adminAccessAllowed() === false) {
            return $routes;
        }

        $routes['get_tasks'] = [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'getTasksCallback'],
        ];

        $routes['dismiss_task'] = [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'dismissTaskCallback'],
        ];

        return $routes;
    }

    /**
     * Return current tasks as a WP_REST_Response.
     */
    public function getTasksCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $allTasksAsArray = array_map(function ($task) {
            return $task->toArray();
        }, $this->service->getAllTasks(true));

        return $this->sendHttpResponse(
            array_values($allTasksAsArray) // Keys should be removed
        );
    }

    /**
     * Dismiss a task by taskId.
     */
    public function dismissTaskCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        $sanitizedTaskId = $storage->getTitle('taskId');
        $this->service->dismissTask($sanitizedTaskId);

        return $this->sendHttpResponse();
    }
}
<?php

namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\MultiEndpointInterface;

class TaskManagementEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private TaskManagementService $service;

    public function __construct(TaskManagementService $service)
    {
        $this->service = $service;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            'get_tasks' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getTasksCallback'],
            ],
            'dismiss_task' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'dismissTaskCallback'],
            ],
            'snooze_task' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'snoozeTaskCallback'],
            ]
        ];
    }

    /**
     * Return current tasks as a WP_REST_Response.
     */
    public function getTasksCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        return $this->sendHttpResponse(
            $this->service->getTasks(null, true)
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

    /**
     * Snooze a task by taskId (temporarily hides it).
     */
    public function snoozeTaskCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        $sanitizedTaskId = $storage->getTitle('taskId');
        $this->service->snoozeTask($sanitizedTaskId);

        return $this->sendHttpResponse();
    }
}

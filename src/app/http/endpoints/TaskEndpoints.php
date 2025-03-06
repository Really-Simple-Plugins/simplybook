<?php
namespace SimplyBook\App\Http\Endpoints;

use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\App\Services\TaskService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\MultiEndpointInterface;

class TaskEndpoints implements MultiEndpointInterface
{
    use Save;
    use HasRestAccess;
    use HasAllowlistControl;

    private TaskService $service;

    public function __construct(TaskService $service)
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
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getTasksCallback'],
            ],
            'dismiss_task' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'dismissTaskCallback'],
            ],
        ];
    }

    /**
     * Return current tasks as a WP_REST_Response.
     */
    public function getTasksCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        return $this->sendHttpResponse(
            array_values($this->service->getTasks())
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
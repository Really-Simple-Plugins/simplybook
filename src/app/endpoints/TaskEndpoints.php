<?php
namespace SimplyBook\App\Endpoints;

use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use Simplybook_old\Admin\Tasks\Tasks;
use SimplyBook\Interfaces\MultiEndpointInterface;

class TaskEndpoints implements MultiEndpointInterface
{
    use Save;
    use HasRestAccess;

    /**
     * Always enabled
     */
    public function enabled(): bool
    {
        return true;
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
        $tasks = new Tasks();
        return $this->sendHttpResponse($tasks->get_tasks());
    }

    /**
     * Dismiss a task by taskId.
     */
    public function dismissTaskCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        $tasks = new Tasks();
        $tasks->dismiss_task($storage->getTitle('taskId'));

        return $this->sendHttpResponse();
    }
}
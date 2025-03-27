<?php
namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\TaskInterface;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\FeatureInterface;

class TaskManagementController implements FeatureInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private TaskManagementService $service;

    public function __construct()
    {
        $this->service = new TaskManagementService(
            new TaskManagementRepository
        );
    }

    public function register()
    {
        $this->initiateTasks();
        add_action('simplybook_plugin_version_upgrade', [$this, 'upgradeTasks']);
        add_filter('simplybook_rest_routes', [$this, 'addTaskRoutes']);
    }

    /**
     * This method returns an array of task objects that should be added to the
     * database.
     *
     * @internal New tasks should be added here. Upgrade the task version if the
     * task should be updated. If a task should be removed, remove the task from
     * this list.
     *
     * @return TaskInterface[]
     */
    private function getTaskObjects(): array
    {
        // Add new tasks here
        $pluginTasks = [
            new Tasks\AddServiceTask(),
            new Tasks\CustomizeDesignTask(),
            new Tasks\TestPremiumTask(),
        ];

        return array_filter($pluginTasks, function($task) {
            return $task instanceof TaskInterface;
        });
    }

    /**
     * This method adds the initial tasks to the database if they are not
     * already present.
     */
    private function initiateTasks(): void
    {
        if ($this->service->hasTasks()) {
            return;
        }

        $this->service->addTasks(
            $this->getTaskObjects()
        );
    }

    /**
     * This method makes sure that if new tasks are added in the update that
     * these tasks are added in the database. Existing tasks will be updated
     * if the version is higher than the current existing task with the same id.
     */
    public function upgradeTasks(): void
    {
        if ($this->service->hasTasks() === false) {
            return; // Tasks will be added by initiateTasks()
        }

        $this->service->upgradeTasks(
            $this->getTaskObjects()
        );
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
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'getTasksCallback'],
        ];

        $routes ['dismiss_task'] = [
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
        $allTasksAsArray = array_map(function($task) {
            return $task->toArray();
        }, $this->service->getAllTasks());

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
<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Tasks;

use SimplyBook\Bootstrap\App;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;
use SimplyBook\Features\TaskManagement\TaskManagementService;

class UpdateTaskStatusAbility extends AbstractAbility
{
    public const NAME = 'update-task-status';

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Update Task Status', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Updates the status of a SimplyBook.me plugin task identified by its ID.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'required' => ['id', 'status'],
            'properties' => [
                'id' => [
                    'type' => 'string',
                    'description' => __('The unique identifier of the task to update.', 'simplybook'),
                ],
                'status' => [
                    'type' => 'string',
                    'enum' => AbstractTask::allowedStatuses(),
                    'description' => __('The new status to assign to the task.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'oneOf' => [
                [
                    'type' => 'object',
                    'description' => __('The updated task represented as an associative array.', 'simplybook'),
                    'properties' => [
                        'id' => ['type' => 'string'],
                        'text' => ['type' => 'string'],
                        'label' => ['type' => 'string'],
                        'status' => ['type' => 'string'],
                        'premium' => ['type' => 'boolean'],
                        'special_feature' => ['type' => 'boolean'],
                        'type' => ['type' => 'string'],
                        'action' => ['type' => 'object'],
                        'snoozable' => ['type' => 'boolean'],
                    ],
                ],
                [
                    'type' => 'string',
                    'description' => __('Human-readable message returned when the task management feature is not available or when the update could not be performed.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function defaultExecuteCallback(): ?callable
    {
        return static function ($input = null) {
            if (!class_exists(TaskManagementService::class)) {
                return __('Tasks are not available yet.', 'simplybook');
            }

            $taskId = is_array($input) ? ($input['id'] ?? null) : null;
            $status = is_array($input) ? ($input['status'] ?? null) : null;

            if (!is_string($taskId) || $taskId === '') {
                return __('A valid task ID is required.', 'simplybook');
            }

            $service = App::getInstance()->get(TaskManagementService::class);

            $task = $service->getTask($taskId);
            if ($task === null) {
                return __('Task not found.', 'simplybook');
            }

            switch ($status) {
                case AbstractTask::STATUS_OPEN:
                    $service->openTask($taskId);
                    break;
                case AbstractTask::STATUS_URGENT:
                    $service->flagTaskUrgent($taskId);
                    break;
                case AbstractTask::STATUS_UPGRADE:
                    $service->markTaskUpgrade($taskId);
                    break;
                case AbstractTask::STATUS_DISMISSED:
                    $service->dismissTask($taskId);
                    break;
                case AbstractTask::STATUS_COMPLETED:
                    $service->completeTask($taskId);
                    break;
                case AbstractTask::STATUS_HIDDEN:
                    $service->hideTask($taskId);
                    break;
                default:
                    return __('Status is not supported for updates.', 'simplybook');
            }

            $updatedTask = $service->getTask($taskId);
            if ($updatedTask === null) {
                return __('Task could not be retrieved after update.', 'simplybook');
            }

            return $updatedTask->toArray();
        };
    }

    /**
     * @inheritDoc
     */
    protected function defaultPermissionCallback(): ?callable
    {
        return static function () {
            return current_user_can('simplybook_manage');
        };
    }

    /**
     * @inheritDoc
     */
    public function getMeta(): ?array
    {
        return [
            'show_in_rest' => true,
            'mcp' => [
                'public' => true,
            ]
        ];
    }
}

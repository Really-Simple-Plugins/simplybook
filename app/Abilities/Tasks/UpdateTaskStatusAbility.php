<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Tasks;

use InvalidArgumentException;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;
use SimplyBook\Features\TaskManagement\TaskManagementService;
use SimplyBook\Features\TaskManagement\TaskManagementFeature;

class UpdateTaskStatusAbility extends AbstractAbility
{
    public const NAME = 'update-task-status';

    private TaskManagementFeature $feature;
    private TaskManagementService $service;

    public function __construct(TaskManagementFeature $feature, TaskManagementService $service)
    {
        $this->feature = $feature;
        $this->service = $service;
    }

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
        $feature = $this->feature;
        $service = $this->service;

        return static function ($input = null) use ($feature, $service) {
            if ($feature->isEnabled() === false) {
                return __('Please finish the onboarding process first to be able to update a task.', 'simplybook');
            }

            $taskId = is_array($input) ? (string) ($input['id'] ?? '') : null;
            $status = is_array($input) ? (string) ($input['status'] ?? '') : null;

            if (empty($taskId)) {
                return sprintf(
                    /* translators: %1$s: The required argument. */
                    __('Required argument "%1$s" not found.', 'simplybook'),
                    "id"
                );
            }

            if (empty($status)) {
                return sprintf(
                    /* translators: %1$s: The required argument. */
                    __('Required argument "%1$s" not found.', 'simplybook'),
                    "status"
                );
            }

            $task = $service->getTask($taskId);
            if (empty($task)) {
                return __('Task not found.', 'simplybook');
            }

            try {
                $task = $service->updateStatusFromId($taskId, $status);
            } catch (InvalidArgumentException $e) {
                return sprintf(
                    /* translators: %1$s: Status */
                    __('Could not use status "%1$s" to update th task.', 'simplybook'),
                    $status
                );
            }

            return $task->toArray();
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

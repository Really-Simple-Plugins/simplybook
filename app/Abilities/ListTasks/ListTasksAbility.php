<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\ListTasks;

use SimplyBook\Bootstrap\App;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;
use SimplyBook\Features\TaskManagement\TaskManagementService;

class ListTasksAbility extends AbstractAbility
{
    public const NAME = 'list-tasks';

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('List Tasks', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns all SimplyBook.me plugin tasks.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'oneOf' => [
                [
                    'type' => 'array',
                    'description' => __('List of tasks, each represented as an associative array.', 'simplybook'),
                    'items' => [
                        'type' => 'object',
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
                ],
                [
                    'type' => 'string',
                    'description' => __('Human-readable message returned when the task management feature is not available.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => ['object', 'null'],
            'properties' => [
                'status' => [
                    'type' => 'string',
                    'enum' => AbstractTask::allowedStatuses(),
                    'description' => __('Optional. Filter tasks by status. Omit to return all tasks.', 'simplybook'),
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

            $statusFilter = is_array($input) ? ($input['status'] ?? null) : null;
            if ($statusFilter !== null && !in_array($statusFilter, AbstractTask::allowedStatuses(), true)) {
                $statusFilter = null;
            }

            $service = App::getInstance()->get(TaskManagementService::class);

            $tasks = array_map(static function ($task) {
                return $task->toArray();
            }, $service->getAllTasks());

            if ($statusFilter !== null) {
                $tasks = array_filter($tasks, static function (array $task) use ($statusFilter): bool {
                    return ($task['status'] ?? null) === $statusFilter;
                });
            }

            return array_values($tasks);
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

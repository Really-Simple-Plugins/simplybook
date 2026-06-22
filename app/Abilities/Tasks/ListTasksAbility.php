<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Tasks;

use Throwable;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;
use SimplyBook\Features\TaskManagement\TaskManagementFeature;
use SimplyBook\Features\TaskManagement\TaskManagementService;

class ListTasksAbility extends AbstractAbility
{
    public const NAME = 'list-tasks';

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
                    'description' => __('Optional. Filter tasks by status.', 'simplybook'),
                ],
                'required' => [
                    'type' => 'boolean',
                    'description' => __('Optional. Filter tasks by whether they are required.', 'simplybook'),
                ],
                'premium' => [
                    'type' => 'boolean',
                    'description' => __('Optional. Filter tasks by whether they are premium.', 'simplybook'),
                ],
                'special_feature' => [
                    'type' => 'boolean',
                    'description' => __('Optional. Filter tasks by whether they are a special feature.', 'simplybook'),
                ],
                'snoozed' => [
                    'type' => 'boolean',
                    'description' => __('Optional. Filter tasks by whether they are snoozed.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function executeCallback(): ?callable
    {
        $feature = $this->feature;
        $service = $this->service;

        return static function ($input = null) use ($feature, $service) {
            if ($feature->isEnabled() === false) {
                return __('Please finish the onboarding process first to be able to list tasks.', 'simplybook');
            }

            $filters = is_array($input) ? $input : [];

            try {
                return $service->getTasks($filters);
            } catch (Throwable $e) {
                return __('An error occurred while listing the tasks.', 'simplybook');
            }
        };
    }

    /**
     * @inheritDoc
     */
    protected function permissionCallback(): ?callable
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

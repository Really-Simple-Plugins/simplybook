<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Statistics;

use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Services\Entities\StatisticsService;

class GetStatisticsAbility extends AbstractAbility
{
    public const NAME = 'get-statistics';

    private StatisticsService $statistics;

    public function __construct(StatisticsService $statistics)
    {
        $this->statistics = $statistics;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Get Statistics', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns the cached SimplyBook.me statistics for the connected company (e.g. bookings today, bookings this week, bookings in the last 30 days, most popular service and provider). Optionally returns a single value when a key is provided.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => ['object', 'null'],
            'properties' => [
                'key' => [
                    'type' => 'string',
                    'description' => __('Optional. The statistics key to return. Omit to return all statistics. Use dot notation to get nested values (e.g. "most_popular_service.name").', 'simplybook'),
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
            'type' => ['object', 'array', 'string', 'boolean', 'number', 'null'],
            'description' => __('The full statistics map, a nested section, a scalar value resolved by dot-notation, or a human-readable message when the statistics or requested key could not be found.', 'simplybook'),
        ];
    }

    /**
     * @inheritDoc
     */
    protected function defaultExecuteCallback(): ?callable
    {
        $statistics = $this->statistics;

        return static function ($input = null) use ($statistics) {
            $data = $statistics->all();
            $storage = new Storage($data);

            if ($storage->isEmpty()) {
                return __('Statistics could not be found.', 'simplybook');
            }

            if (empty($input) || !is_array($input) || empty($input['key'])) {
                return $storage->all();
            }

            $search = (string) $input['key'];
            if ($storage->isEmpty($search)) {
                return sprintf(
                    /* translators: %s: user-provided search key */
                    __('Statistic "%s" could not be found.', 'simplybook'),
                    $search
                );
            }

            return $storage->get($search);
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
            ],
        ];
    }
}

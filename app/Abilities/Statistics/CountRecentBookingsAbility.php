<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Statistics;

use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Services\Entities\StatisticsService;

class CountRecentBookingsAbility extends AbstractAbility
{
    public const NAME = 'count-recent-bookings';

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
        return __('Count Recent Bookings', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns the number of SimplyBook.me bookings made on the connected company in the last 30 days.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'type' => 'integer',
            'minimum' => 0,
            'description' => __('Number of bookings on the connected company in the last 30 days. Zero when no company is connected or no bookings exist.', 'simplybook'),
        ];
    }

    /**
     * @inheritDoc
     */
    protected function getExecuteCallback(): ?callable
    {
        $statistics = $this->statistics;

        return static function () use ($statistics): int {
            $data = $statistics->fetch();
            return (int)($data['bookings'] ?? 0);
        };
    }

    /**
     * @inheritDoc
     */
    protected function getPermissionCallback(): ?callable
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

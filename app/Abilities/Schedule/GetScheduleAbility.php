<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Schedule;

use Throwable;
use SimplyBook\Http\Entities\Schedule;
use SimplyBook\Abilities\AbstractAbility;

class GetScheduleAbility extends AbstractAbility
{
    public const NAME = 'get-schedule';

    private Schedule $schedule;

    public function __construct(Schedule $schedule)
    {
        $this->schedule = $schedule;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Get Working Hours', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns the configured working hours per day from SimplyBook.me (including days off). Optionally narrow the result by service provider and/or service. Does NOT account for existing bookings, so the response indicates when work is rostered, not when there are free slots. The date range is optional and defaults to today when omitted; if only one date is supplied the other defaults to the same value.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'properties' => [
                'provider_id' => [
                    'type' => ['string', 'integer'],
                    'description' => __('Optional. The ID of the service provider to filter by.', 'simplybook'),
                ],
                'service_id' => [
                    'type' => ['string', 'integer'],
                    'description' => __('Optional. The ID of the service to filter by.', 'simplybook'),
                ],
                'date_from' => [
                    'type' => 'string',
                    'pattern' => '^\d{4}-\d{2}-\d{2}$',
                    'description' => __('Start of the date range in YYYY-MM-DD format. Defaults to today.', 'simplybook'),
                ],
                'date_to' => [
                    'type' => 'string',
                    'pattern' => '^\d{4}-\d{2}-\d{2}$',
                    'description' => __('End of the date range in YYYY-MM-DD format. Defaults to date_from (or today).', 'simplybook'),
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
            'type' => ['array', 'string'],
            'description' => __('Zero-indexed list of working-hour entries (one per day) for the requested filters and date range. Each entry contains the date, the start and end of the working window and a day-off flag; it does not reflect existing bookings. Returns a human-readable message instead when the schedule could not be retrieved.', 'simplybook'),
            'items' => [
                'type' => 'object',
                'additionalProperties' => true,
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function executeCallback(): ?callable
    {
        $schedule = $this->schedule;

        return static function ($input = null) use ($schedule) {
            $input = is_array($input) ? $input : [];

            $today = gmdate('Y-m-d');
            $dateFrom = (string) ($input['date_from'] ?? $input['date_to'] ?? $today);
            $dateTo = (string) ($input['date_to'] ?? $dateFrom);

            $filters = [
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
            ];

            if (!empty($input['provider_id'])) {
                $filters['provider_id'] = (string) $input['provider_id'];
            }

            if (!empty($input['service_id'])) {
                $filters['service_id'] = (string) $input['service_id'];
            }

            try {
                return $schedule->filter($filters)->all();
            } catch (Throwable $e) {
                return __('The schedule could not be retrieved.', 'simplybook');
            }
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

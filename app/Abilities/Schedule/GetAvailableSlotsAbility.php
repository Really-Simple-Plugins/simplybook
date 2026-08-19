<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Schedule;

use WP_Error;
use Throwable;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Http\Entities\AvailableSlot;
use SimplyBook\Abilities\AbstractAbilityCategory;

class GetAvailableSlotsAbility extends AbstractAbility
{
    public const NAME = 'get-available-slots';

    private AvailableSlot $slot;

    public function __construct(AvailableSlot $slot)
    {
        $this->slot = $slot;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Get Available Booking Slots', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns the bookable time slots for a given SimplyBook.me service, provider and date. Unlike the working-hours ability, this reflects actual availability after existing bookings have been taken into account, so it answers the question "when can a booking be placed?".', 'simplybook');
    }

    /**
     * Specific category for the Schedule abilities.
     * @return class-string<AbstractAbilityCategory>
     */
    public function getCategory(): string
    {
        return ScheduleCategory::class;
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'required' => ['date'],
            'properties' => [
                'service_id' => [
                    'type' => ['string', 'integer'],
                    'description' => __('Optional. The ID of the service to filter by.', 'simplybook'),
                ],
                'provider_id' => [
                    'type' => ['string', 'integer'],
                    'description' => __('Optional. The ID of the service provider to filter by.', 'simplybook'),
                ],
                'date' => [
                    'type' => 'string',
                    'pattern' => '^\d{4}-\d{2}-\d{2}$',
                    'description' => __('The date to check, in YYYY-MM-DD format.', 'simplybook'),
                ],
                'count' => [
                    'type' => 'integer',
                    'minimum' => 1,
                    'description' => __('Optional. Number of attendees for a group booking. Defaults to 1.', 'simplybook'),
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
            'description' => __('Zero-indexed list of bookable time slots for the requested service, provider and date. Returns a human-readable message instead when the slots could not be retrieved.', 'simplybook'),
            'items' => [
                'type' => 'object',
                'additionalProperties' => true,
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function getExecuteCallback(): ?callable
    {
        $slot = $this->slot;

        return static function ($input = null) use ($slot) {
            if (!is_array($input) || empty($input['date'])) {
                $code = 'simplybook_available_slots_invalid_input';
                $message = __('A valid date is required.', 'simplybook');
                return new WP_Error($code, $message, [
                    'status' => 400,
                ]);
            }

            $filters = [
                'date' => (string) $input['date'],
            ];

            if (!empty($input['service_id'])) {
                $filters['service_id'] = (string) $input['service_id'];
            }

            if (!empty($input['provider_id'])) {
                $filters['provider_id'] = (string) $input['provider_id'];
            }

            if (!empty($input['count'])) {
                $filters['count'] = (string) (int) $input['count'];
            }

            try {
                return $slot->filter($filters)->all();
            } catch (Throwable $e) {
                $code = 'simplybook_available_slots_fetch_failed';
                $message = __('The available slots could not be retrieved.', 'simplybook');
                return new WP_Error($code, $message, [
                    'status' => 500,
                ]);
            }
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

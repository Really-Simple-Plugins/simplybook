<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Schedule;

use SimplyBook\Abilities\AbstractAbilityCategory;

class ScheduleCategory extends AbstractAbilityCategory
{
    public const SLUG = 'simplybook-schedule';

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('SimplyBook.me Schedule Abilities', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Abilities related to the Simplybook.me Schedule API.', 'simplybook');
    }
}

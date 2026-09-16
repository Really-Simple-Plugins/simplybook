<?php

namespace SimplyBook\Services\Admin;

/**
 * Manages the number shown in the bubble next to the SimplyBook admin
 * menu item. The number tells the user how many items need attention.
 */
class BubbleCounterService
{
    private const OPTION_KEY = 'simplybook_task_bubble_counter';

    /**
     * Method is used by the DashboardController to render the bubble in the
     * admin menu. Returns 0 when no bubble is stored, so no bubble is shown.
     */
    public function current(): int
    {
        return (int) get_option(self::OPTION_KEY, 0);
    }

    /**
     * Method is used by the TaskManagementListener when promotion tasks
     * become visible. Adds the amount to the stored number.
     */
    public function increase(int $amount = 1): void
    {
        $this->set($this->current() + $amount);
    }

    /**
     * Method is used by the TaskManagementListener when the user dismisses
     * a promotion task. Subtracts the amount from the stored number. The
     * number never goes below 0, because a negative bubble has no meaning.
     */
    public function decrease(int $amount = 1): void
    {
        $this->set(max(0, $this->current() - $amount));
    }

    /**
     * Method is used by the TaskManagementListener before it counts the
     * visible promotion tasks again. Sets the number back to 0 so the
     * bubble does not keep a stale number from a previous run.
     */
    public function reset(): void
    {
        $this->set(0);
    }

    /**
     * Method stores the number in the WordPress options table. It is
     * private so all changes go through increase, decrease or reset.
     */
    private function set(int $count): void
    {
        update_option(self::OPTION_KEY, $count);
    }
}

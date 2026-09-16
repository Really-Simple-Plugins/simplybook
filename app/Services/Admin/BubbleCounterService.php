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
     * Returns the number to show in the bubble. Returns 0 when nothing is
     * stored, so no bubble is shown.
     */
    public function current(): int
    {
        return (int) get_option(self::OPTION_KEY, 0);
    }

    /**
     * Adds the amount to the stored number. Use this when new items need
     * the attention of the user.
     */
    public function increase(int $amount = 1): void
    {
        $this->set($this->current() + $amount);
    }

    /**
     * Subtracts the amount from the stored number. Use this when an item no
     * longer needs the attention of the user. The number never goes below
     * 0, because a negative bubble has no meaning.
     */
    public function decrease(int $amount = 1): void
    {
        $this->set(max(0, $this->current() - $amount));
    }

    /**
     * Sets the number back to 0. Use this before you count the items again,
     * so the bubble does not keep a stale number from a previous run.
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

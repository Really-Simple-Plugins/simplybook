<?php

namespace SimplyBook\Services\Admin;

/**
 * Manages the notification bubble count of the SimplyBook admin menu
 * item.
 */
class BubbleCounterService
{
    private const OPTION_KEY = 'simplybook_task_bubble_counter';

    /**
     * Get the current notification bubble count. Returns 0 when no count
     * is stored.
     */
    public function current(): int
    {
        return (int) get_option(self::OPTION_KEY, 0);
    }

    /**
     * Increase the notification bubble count.
     */
    public function increase(int $amount = 1): void
    {
        $this->set($this->current() + $amount);
    }

    /**
     * Decrease the notification bubble count. The count never goes below 0.
     */
    public function decrease(int $amount = 1): void
    {
        $this->set(max(0, $this->current() - $amount));
    }

    /**
     * Reset the notification bubble count to 0.
     */
    public function reset(): void
    {
        $this->set(0);
    }

    /**
     * Store the notification bubble count in the WordPress options table.
     */
    private function set(int $count): void
    {
        update_option(self::OPTION_KEY, $count);
    }
}

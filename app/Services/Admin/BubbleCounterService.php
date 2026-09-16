<?php

namespace SimplyBook\Services\Admin;

/**
 * Manages the number shown in the bubble next to the SimplyBook admin
 * menu item. The number tells the user how many items need attention.
 */
class BubbleCounterService
{
    private const OPTION_KEY = 'simplybook_task_bubble_counter';

    public function current(): int
    {
        return (int) get_option(self::OPTION_KEY, 0);
    }

    public function increase(int $amount = 1): void
    {
        $this->set($this->current() + $amount);
    }

    /**
     * The counter never goes below 0.
     */
    public function decrease(int $amount = 1): void
    {
        $this->set(max(0, $this->current() - $amount));
    }

    public function reset(): void
    {
        $this->set(0);
    }

    private function set(int $count): void
    {
        update_option(self::OPTION_KEY, $count);
    }
}

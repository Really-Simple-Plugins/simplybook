<?php

namespace SimplyBook\Services;

/**
 * Manages the counter shown in the SimplyBook admin menu bubble. The
 * {@see \SimplyBook\Features\TaskManagement\TaskManagementListener}
 * increases and decreases the counter. The
 * {@see \SimplyBook\Controllers\DashboardController} reads it to render
 * the bubble.
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

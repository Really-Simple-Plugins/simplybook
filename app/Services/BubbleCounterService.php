<?php

namespace SimplyBook\Services;

/**
 * Manages the counter shown in the SimplyBook admin menu bubble. The
 * {@see \SimplyBook\Features\TaskManagement\TaskManagementListener} sets
 * and lowers the counter. The
 * {@see \SimplyBook\Controllers\DashboardController} reads it to render
 * the bubble.
 */
class BubbleCounterService
{
    private const OPTION_KEY = 'simplybook_task_bubble_counter';

    public function set(int $count): void
    {
        update_option(self::OPTION_KEY, $count);
    }

    public function get(): int
    {
        return (int) get_option(self::OPTION_KEY, 0);
    }

    /**
     * The counter never goes below 0.
     */
    public function decrease(): void
    {
        $this->set(max(0, $this->get() - 1));
    }
}

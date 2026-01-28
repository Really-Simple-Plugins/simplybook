<?php

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;

class ScheduleController implements ControllerInterface
{
    public function register(): void
    {
        add_action('init', [$this, 'startSimplyBookSchedules']);
        add_action('simplybook_deactivation', [$this, 'unscheduleSimplyBookTasks']);
    }

    /**
     * Hook into the default WordPress 'daily' schedule with the
     * 'simplybook_daily' action. Can be used to run daily tasks.
     */
    public function startSimplyBookSchedules(): void
    {
        if (wp_next_scheduled('simplybook_daily') === false) {
            wp_schedule_event(time(), 'daily', 'simplybook_daily');
        }
    }

    /**
     * Unschedule SimplyBook tasks on plugin deactivation.
     */
    public function unscheduleSimplyBookTasks(): void
    {
        $timestamp = wp_next_scheduled('simplybook_daily');
        if ($timestamp !== false) {
            wp_unschedule_event($timestamp, 'simplybook_daily');
        }
    }
}

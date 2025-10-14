<?php
namespace SimplyBook\Controllers;
use SimplyBook\Interfaces\ControllerInterface;

class ScheduleController implements ControllerInterface
{
    public function register() {
        add_filter('cron_schedules', [$this, 'registerSimplyBookSchedules']);
        add_action('plugins_loaded', [$this, 'startSimplyBookSchedules']);
    }

    public function registerSimplyBookSchedules(array $schedules): array
    {
        $schedules['simplybook_daily'] = [
            'interval' => DAY_IN_SECONDS,
            'display' => __('Once every day', 'simplybook'),
        ];

        return $schedules;
    }

    public function startSimplyBookSchedules(): void
    {
        if (wp_next_scheduled('simplybook_daily') === false) {
            wp_schedule_event(time(), 'simplybook_daily', 'simplybook_daily');
        }
    }
}
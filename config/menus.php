<?php if (!defined('ABSPATH')) {
    exit;
}

// The menu config can only be used AFTER or ON the 'init' hook.
return [
    'general' => [
        'id' => 'general',
        'title' => __('General', 'simplybook'),
        'groups' => [
            [
                'id' => 'general',
                'title' => __('General', 'simplybook'),
            ],
            [
                'id' => 'authentication',
                'title' => __('Authentication', 'simplybook'),
            ],
            [
                'id' => 'widgets',
                'title' => __('Widgets', 'simplybook'),
            ],
        ],
    ],
    'providers' => [
        'id' => 'providers',
        'title' => __('Providers', 'simplybook'),
    ],
    'services' => [
        'id' => 'services',
        'title' => __('Services', 'simplybook'),
    ],
    'design' => [
        'id' => 'design',
        'title' => __('Design', 'simplybook'),
        'groups' => [
            [
                'id' => 'design',
                'title' => __('Design', 'simplybook'),
            ],
            [
                'id' => 'palettes',
                'title' => __('Palettes', 'simplybook'),
            ],
        ],
    ],
    'notifications' => [
        'id' => 'notifications',
        'title' => __('Notifications', 'simplybook'),
    ],
    'custom' => [
        'id' => 'custom',
        'title' => __('Custom', 'simplybook'),
    ],
    'schedule' => [
        'id' => 'schedule',
        'title' => __('Schedule', 'simplybook'),
        'url' => 'v2/management/#company-worktime/week',
    ],
    'bookings' => [
        'id' => 'bookings',
        'title' => __('Bookings', 'simplybook'),
        'url' => '/index/index',
    ],
];
<?php if (!defined('ABSPATH')) {
    exit;
}

// The menu config can only be used AFTER or ON the 'init' hook.
return [
    'general' => [
        'id' => 'general',
        'title' => __('General', 'rsp-plugin'),
        'groups' => [
            [
                'id' => 'general',
                'title' => __('General', 'rsp-plugin'),
            ],
            [
                'id' => 'authentication',
                'title' => __('Authentication', 'rsp-plugin'),
            ],
            [
                'id' => 'widgets',
                'title' => __('Widgets', 'rsp-plugin'),
            ],
        ],
    ],
    'providers' => [
        'id' => 'providers',
        'title' => __('Providers', 'rsp-plugin'),
    ],
    'services' => [
        'id' => 'services',
        'title' => __('Services', 'rsp-plugin'),
    ],
    'design' => [
        'id' => 'design',
        'title' => __('Design', 'rsp-plugin'),
        'groups' => [
            [
                'id' => 'design',
                'title' => __('Design', 'rsp-plugin'),
            ],
            [
                'id' => 'palettes',
                'title' => __('Palettes', 'rsp-plugin'),
            ],
        ],
    ],
    'notifications' => [
        'id' => 'notifications',
        'title' => __('Notifications', 'rsp-plugin'),
    ],
    'custom' => [
        'id' => 'custom',
        'title' => __('Custom', 'rsp-plugin'),
    ],
    'schedule' => [
        'id' => 'schedule',
        'title' => __('Schedule', 'rsp-plugin'),
        'url' => 'v2/management/#company-worktime/week',
    ],
    'bookings' => [
        'id' => 'bookings',
        'title' => __('Bookings', 'rsp-plugin'),
        'url' => '/index/index',
    ],
];
<?php if (!defined('ABSPATH')) {
    exit;
}

// The menu config can only be used AFTER or ON the 'init' hook.
return [
    'general' => [
        'id' => 'general',
        'title' => __('General', 'simplybook'),
        'has_settings' => false,
        'groups' => [
            [
                'id' => 'authentication',
                'title' => __('Authentication', 'simplybook'),
            ],
            [
                'id' => 'content',
                'title' => __('Content', 'simplybook'),
            ]
        ],
    ],
    'providers' => [
        'id' => 'providers',
        'title' => __('Providers', 'simplybook'),
        'has_settings' => false,
    ],
    'services' => [
        'id' => 'services',
        'title' => __('Services', 'simplybook'),
        'has_settings' => false,
    ],
    'design' => [
        'id' => 'design',
        'title' => __('Design', 'simplybook'),
        'groups' => [
            [
                'id' => 'main',
                'title' => __('Main settings', 'simplybook'),
                'has_preview' => true,
            ],
            [
                'id' => 'theme',
                'title' => __('Theme settings', 'simplybook'),
                'has_preview' => true,
            ],
            [
                'id' => 'reviews',
                'title' => __('Reviews shortcode', 'simplybook'),
            ],
            [
                'id' => 'booking',
                'title' => __('Booking button widget', 'simplybook'),
                'help' => __('The booking button shortcode can be placed anywhere in the page and it will automatically be added to the outermost edges of that page.', 'simplybook'),
            ],
        ],
    ],
    'notifications' => [
        'id' => 'notifications',
        'title' => __('Notifications', 'simplybook'),
        'url' => '/settings/templates',
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
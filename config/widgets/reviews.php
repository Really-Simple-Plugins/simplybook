<?php
if (!defined('ABSPATH')) {
    exit;
}

// Unused since: NL14RSP2-219 - kept for reference
return [
    'static' => [
        'widget_type' => 'reviews',
        'container_id' => 'sbw_z0hg2i_reviews',
    ],
    'settings' => [
        'url' => 'server',
        'theme' => 'theme',
        'theme_settings' => 'theme_settings',
        'timeline' => 'timeline_type',
        'datepicker' => 'datepicker',
        'is_rtl' => 'is_rtl',
        'app_config' => [
            'predefined' => 'predefined',
        ],
        'reviews_count' => 'reviews_count',
        'hide_add_reviews' => 'hide_add_reviews',
    ]
];
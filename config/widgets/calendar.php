<?php
if (!defined('ABSPATH')) {
    exit;
}

return [
    'static' => [
        'widget_type' => 'iframe',
        'container_id' => 'sbw_z0hg2i_calendar',
    ],
    'settings' => [
        'url' => 'server',
        'theme' => 'theme',
        'theme_settings' => 'theme_settings',
        'timeline' => 'timeline_type',
        'datepicker' => 'datepicker',
        'is_rtl' => 'is_rtl',
        'app_config' => [
            'clear_session' => 'clear_session',
            'allow_switch_to_ada' => 'allow_switch_to_ada',
            'predefined' => 'predefined',
        ],
    ],
];
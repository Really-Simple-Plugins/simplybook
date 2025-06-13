<?php
use SimplyBook\Helpers\FeatureHelper;

if (!defined('ABSPATH')) {
    exit;
}

return [
    'Onboarding' => [
        'enabled' => FeatureHelper::isEnabled('onboarding'),
        'inScope' => is_admin() || simplybook_is_wp_json_request(),
        'pro' => false,
        'dependencies' => [
            'Service',
        ],
    ],
    'TaskManagement' => [
        'enabled' => FeatureHelper::isEnabled('task_management'),
        'inScope' => true, // Should be able to listen everywhere
        'pro' => false,
        'priorityFiles' => [
            'Tasks' . DIRECTORY_SEPARATOR . 'AbstractTask',
        ],
    ],
    'Notifications' => [
        'enabled' => FeatureHelper::isEnabled('notifications'),
        'inScope' => true, // Should be able to listen everywhere
        'pro' => false,
        'priorityFiles' => [
            'Notices' . DIRECTORY_SEPARATOR . 'AbstractNotice',
        ],
    ],
];
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
        'inScope' => is_admin() || simplybook_is_wp_json_request(),
        'pro' => false,
        'priorityFiles' => [
            'Tasks/AbstractTask',
        ],
    ],
    'Notifications' => [
        'enabled' => FeatureHelper::isEnabled('notifications'),
        'inScope' => true, // todo - only on our dashboard
        'pro' => false,
        'priorityFiles' => [
            'Notices/AbstractNotice',
        ],
    ],
];
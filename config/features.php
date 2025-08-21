<?php
use SimplyBook\Helpers\FeatureHelper;

if (!defined('ABSPATH')) {
    exit;
}

return [
    'Onboarding' => [
        'enabled' => FeatureHelper::isEnabled('onboarding'),
        'inScope' => FeatureHelper::inScope('onboarding'),
        'pro' => false,
        'dependencies' => [
            'Service',
            '\SimplyBook\Services\WidgetTrackingService',
        ],
    ],
    'TaskManagement' => [
        'enabled' => FeatureHelper::isEnabled('task_management'),
        'inScope' => FeatureHelper::inScope('task_management'),
        'pro' => false,
        'priorityFiles' => [
            'Tasks' . DIRECTORY_SEPARATOR . 'AbstractTask',
        ],
    ],
    'Notifications' => [
        'enabled' => FeatureHelper::isEnabled('notifications'),
        'inScope' => FeatureHelper::inScope('notifications'),
        'pro' => false,
        'priorityFiles' => [
            'Notices' . DIRECTORY_SEPARATOR . 'AbstractNotice',
        ],
    ],
];
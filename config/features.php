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
        ]
    ],
    'TaskManagement' => [
        'enabled' => true,
        'inScope' => is_admin(),
        'pro' => false,
        'dependencies' => [
            'Repository',
            'Service',
        ],
        'domain' => 'Tasks',
    ],
];
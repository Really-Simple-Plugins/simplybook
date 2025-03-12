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
];
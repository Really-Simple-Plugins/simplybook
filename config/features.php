<?php if (!defined('ABSPATH')) {
    exit;
}

return [
    'Onboarding' => [
        'enabled' => true, // todo - we need some way to track if the onboarding is completed and disable this feature if it is
        'inScope' => is_admin(),
        'pro' => false,
        'dependencies' => [
            'Service',
            '\Simplybook_old\Api\Api',
        ]
    ],
];
<?php if (!defined('ABSPATH')) {
    exit;
}

return [
    'Onboarding' => [
        'enabled' => true, // todo - we need some way to track if the onboarding is completed
        'inScope' => is_admin(),
        'pro' => false,
        'dependencies' => [
            'Service',
            '\Simplybook_old\Api\Api',
        ]
    ],
    'ExampleFeature' => [ // Folder- and feature name. Prefix all classes with the feature name.
        // 'enabled' => get_option('example_feature_enabled'), // default false
        'enabled' => true, // for testing purposes
        'inScope' => is_admin(), // dynamic check to see if feature should be loaded, default true
        'pro' => false, // default false
        'dependencies' => [ // Controller dependencies, optional.
            'Service', // Will be instantiated as ExampleFeatureService from feature folder
            'Repository',
            // '\ExampleRoot\Namespace\Class', // Fully qualified class name will be instantiated from root
        ]
    ],
    'ExampleProFeature' => [
        'enabled' => true,
        'inScope' => is_admin(),
        'pro' => true,
        'dependencies' => [
            'Service',
            'Repository',
        ]
    ],
];
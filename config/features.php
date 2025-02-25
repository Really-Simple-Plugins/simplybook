<?php if (!defined('ABSPATH')) {
    exit;
}

return [
    'ExampleFeature' => [ // Folder- and feature name. Prefix all classes with the feature name.
        // 'enabled' => get_option('example_feature_enabled'), // default false
        'enabled' => true, // for testing purposes
        'inScope' => is_admin(), // dynamic check to see if feature should be loaded, default true
        'pro' => false, // default false
        'dependencies' => [ // Controller dependencies, optional.
            'Service',
            'Repository',
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
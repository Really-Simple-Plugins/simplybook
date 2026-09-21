<?php if (!defined('ABSPATH')) {
    exit;
}

// The related config can only be used AFTER or ON the 'init' hook.
return [
    'plugins' => [
        'metricool' => [
            'slug' => 'metricool',
            'options_prefix' => 'metricool',
            'activation_slug' => 'metricool' . DIRECTORY_SEPARATOR . 'metricool.php',
            'create' => admin_url('options-general.php?page=metricool'),
            'url' => 'https://wordpress.org/plugins/metricool/',
            'title' => sprintf(
                /* translators: %s: Plugin name: "Metricool -". */
                __('%s Social Media Management', 'simplybook'),
                'Metricool -'
            ),
            'color' => '#f87fdd'
        ],
        'really-simple-ssl' => [
            'slug' => 'really-simple-ssl',
            'options_prefix' => 'rsssl',
            'activation_slug' => 'really-simple-ssl' . DIRECTORY_SEPARATOR . 'rlrsssl-really-simple-ssl.php',
            'constant_free' => 'rsssl_version',
            'constant_premium' => 'rsssl_pro',
            'url' => 'https://wordpress.org/plugins/really-simple-ssl/',
            'upgrade_url' => 'https://really-simple-ssl.com/pro?src=simplybook-plugin',
            'title' => sprintf(
                /* translators: %s: Plugin name: "Really Simple Security -". */
                __('%s Lightweight plugin. Heavyweight security features.', 'simplybook'),
                'Really Simple Security -'
            ),
            'color' => '#f4bf3e'
        ],
        'complianz-gdpr' => [
            'slug' => 'complianz-gdpr',
            'options_prefix' => 'cmplz',
            'activation_slug' => 'complianz-gdpr' . DIRECTORY_SEPARATOR . 'complianz-gpdr.php',
            'constant_free' => 'cmplz_version',
            'constant_premium' => 'cmplz_premium',
            'create' => admin_url('admin.php?page=complianz'),
            'url' => 'https://wordpress.org/plugins/complianz-gdpr/',
            'upgrade_url' => 'https://complianz.io?src=simplybook-plugin',
            'title' => sprintf(
                /* translators: %s: Plugin name: "Complianz -". */
                __('%s Consent Management as it should be', 'simplybook'),
                'Complianz -'
            ),
            'color' => '#009fff'
        ],
    ],
];

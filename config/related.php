<?php if (!defined('ABSPATH')) {
    exit;
}

// The related config can only be used AFTER or ON the 'init' hook.
return [
    'plugins' => [
        'really-simple-ssl' => [
            'slug' => 'really-simple-ssl',
            'options_prefix' => 'rsssl',
            'activation_slug' => 'really-simple-ssl' . DIRECTORY_SEPARATOR . 'rlrsssl-really-simple-ssl.php',
            'constant_free' => 'rsssl_version',
            'constant_premium' => 'rsssl_pro',
            'url' => 'https://wordpress.org/plugins/really-simple-ssl/',
            'upgrade_url' => 'https://really-simple-ssl.com/pro?src=simplybook-plugin',
            'title' => "Really Simple Security - " . esc_html__("Lightweight plugin. Heavyweight security features.", "simplybook" ),
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
            'title' => 'Complianz - ' . esc_html__('Consent Management as it should be', 'simplybook'),
            'color' => '#009fff'
        ],
        'complianz-terms-conditions' => [
            'slug' => 'complianz-terms-conditions',
            'options_prefix' => 'cmplz_tc',
            'activation_slug' => 'complianz-terms-conditions' . DIRECTORY_SEPARATOR . 'complianz-terms-conditions.php',
            'constant_free' => 'cmplz_tc_version',
            'create' => admin_url('admin.php?page=terms-conditions'),
            'url' => 'https://wordpress.org/plugins/complianz-terms-conditions/',
            'upgrade_url' => 'https://complianz.io?simplybook=cmplz-plugin',
            'title' => 'Complianz - '. __("Terms & Conditions", "simplybook"),
            'color' => '#000000'
        ],
    ],
];
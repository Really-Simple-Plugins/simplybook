<?php
defined( 'ABSPATH' ) or die();

return [
    'company_login' => [
        'id' => 'company_login',
        'menu_id' => 'general',
        'group_id' => 'authentication',
        'type' => 'authentication',
        'default' => get_option('simplybook_company_login'),
        'label' => esc_html__('Currently logged in as', 'simplybook'),
        'disabled' => true,
    ],
];
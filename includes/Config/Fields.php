<?php
return $fields = [
    [
        'id'       => 'review_notice_shown',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'hidden',
        'label'    => '',
        'disabled' => false,
        'default'  => false,
    ],
    [
        'id'       => 'tour_shown_once',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'hidden',
        'label'    => '',
        'disabled' => false,
        'default'  => false,
    ],
    [
        'id'       => 'enable_turbo_mode',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'checkbox',
        'label'    => __( 'Enable Turbo mode', 'burst-statistics' ),
        'help'     => [
            'label' => 'default',
            'title' => __( 'What is Turbo mode?', 'burst-statistics' ),
            'text'  => __( 'Turbo mode improves pagespeed. When enabled, the script is no longer loaded in the header asynchronously, but is loaded in the footer and deferred. You could lose data from visitors who leave before the page has fully loaded.', 'burst-statistics' ),
            'url'   => burst_get_website_url( '/definition/turbo-mode/', [
                'burst_source'   => 'setting-help',
                'burst_content'   => 'turbo-mode',
            ] ),
        ],
        'disabled' => false,
        'default'  => false,
    ],
];
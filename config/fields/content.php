<?php
defined( 'ABSPATH' ) or die( );

return
    [
        'booking_page' => [
            'id'       => 'booking_page',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'select',
            'label'    => __('Booking page', 'simplybook'),
            'default'  => true,
        ],
        'calendar_page' => [
            'id'       => 'calendar_page',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'select',
            'label'    => __('Calendar page', 'simplybook'),
            'default'  => true,
        ],
        'calendar_shortcode' => [
            'id'       => 'calendar_shortcode',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'copy',
            'label'    => __('Calendar shortcode', 'simplybook'),
            'default'  => '[simplybook_widget]',
        ],
        'reviews_shortcode' => [
            'id'       => 'reviews_shortcode',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'copy',
            'label'    => __('Reviews shortcode', 'simplybook'),
            'default'  => '[simplybook_reviews]',
        ],
        'simplybook_booking_button' => [
            'id'       => 'simplybook_booking_button',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'copy',
            'label'    => __('Booking button shortcode', 'simplybook'),
            'default'  => '[simplybook_booking_button]',
        ],
    ];
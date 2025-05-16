<?php
defined( 'ABSPATH' ) or die( );

return
    [
        'calendar_shortcode' => [
            'id'       => 'calendar_shortcode',
            'menu_id'  => 'general',
            'group_id' => 'content',
            'type'     => 'text',
            'copy_field' => true,
            'disabled' => true,
            'label'    => __('Calendar shortcode', 'simplybook'),
            'default'  => '[simplybook_widget]',
        ],

// Removed since: NL14RSP2-219 - kept for reference
//        'reviews_shortcode' => [
//            'id'       => 'reviews_shortcode',
//            'menu_id'  => 'general',
//            'group_id' => 'content',
//            'type'     => 'text',
//            'copy_field' => true,
//            'disabled' => true,
//            'label'    => __('Reviews shortcode', 'simplybook'),
//            'default'  => '[simplybook_reviews]',
//        ],

// Removed since: NL14RSP2-220 - kept for reference
//        'simplybook_booking_button' => [
//            'id'       => 'simplybook_booking_button',
//            'menu_id'  => 'general',
//            'group_id' => 'content',
//            'type'     => 'text',
//            'copy_field' => true,
//            'disabled' => true,
//            'label'    => __('Booking button widget', 'simplybook'),
//            'default'  => '[simplybook_booking_button]',
//        ],
    ];
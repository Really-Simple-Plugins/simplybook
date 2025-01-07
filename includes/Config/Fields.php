<?php
defined( 'ABSPATH' ) or die( );

$fields = [];
foreach ( glob( __DIR__ . '/Fields/*.php' ) as $file ) {
	$fields = array_merge( $fields, include $file );
}

return array_merge( $fields, [
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
        'default'  => false,
    ],
    [
        'id'       => 'company_name',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'api',
        'default'  => '',
    ],
	[
		'id'       => 'domain',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'api',
		'default'  => '',
	],
	[
        'id'       => 'company_id',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'api',
        'default'  => false,
    ],
	[
		'id'       => 'terms-and-conditions',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => false,
	],
	[
		'id'       => 'email',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'tips-and-tricks',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => false,
	],
	[
		'id'       => 'phone',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'address',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'zip',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'category',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => 0,
	],
	[
		'id'       => 'city',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'country',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'default'  => '',
	],
	[
		'id'       => 'server',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => '',
		'disabled' => false,
		'default'  => 'default',
		'widget_field'  => '/',
	],
	[
		'id'       => 'service',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __("Service", 'simplybook'),
		'default'  => '',
	],
    [
        'id'       => 'clear_session',
        'menu_id'  => 'general',
        'group_id' => 'general',
        'type'     => 'switch',
        'label'    => __('Clear session', 'simplybook'),
        'disabled' => false,
        'default'  => false,
        'widget_field'  => '/',
    ]

]);
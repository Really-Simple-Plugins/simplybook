<?php

defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'company_name',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'api',
		'label'    => __('Company Name', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'email',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Email', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'phone',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Phone', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'address',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Address', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'zip',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Zip', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'category',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Category', 'simplybook'),
		'default'  => 0,
	],
	[
		'id'       => 'city',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('City', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'country',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Country', 'simplybook'),
		'default'  => '',
	],
	[
		'id'       => 'service',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __("Service", 'simplybook'),
		'default'  => '',
	],
];
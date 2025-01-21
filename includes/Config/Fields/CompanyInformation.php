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
		'validation' => [
			'regex' => "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            'message'=> __("Please enter a valid email address", "simplybook"),
          ],
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
		'type'     => 'select',
		'label'    => __('Category', 'simplybook'),
		'options' => require_once( SIMPLYBOOK_PATH . 'includes/Config/Categories.php' ),

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
		'type'     => 'select',
		'options' => require_once( SIMPLYBOOK_PATH . 'includes/Config/Countries.php' ),
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
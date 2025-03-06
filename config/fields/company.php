<?php

defined( 'ABSPATH' ) or die();

return [
	'company_name' => [
		'id'       => 'company_name',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'api',
		'label'    => __('Company Name', 'simplybook'),
		'default'  => '',
	],
	'email' => [
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
	'phone' => [
		'id'       => 'phone',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Phone', 'simplybook'),
		'default'  => '',
	],
	'address' => [
		'id'       => 'address',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Address', 'simplybook'),
		'default'  => '',
	],
	'zip' => [
		'id'       => 'zip',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('Zip', 'simplybook'),
		'default'  => '',
	],
	'category' => [
		'id'       => 'category',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'select',
		'label'    => __('Category', 'simplybook'),
		'options' => require_once(__DIR__ . '/options/categories.php'),

		'default'  => 0,
	],
	'city' => [
		'id'       => 'city',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __('City', 'simplybook'),
		'default'  => '',
	],
	'country' => [
		'id'       => 'country',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'select',
		'options' => require_once(__DIR__ . '/options/countries.php'),
		'label'    => __('Country', 'simplybook'),
		'default'  => '',
	],
	'service' => [
		'id'       => 'service',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'text',
		'label'    => __("Service", 'simplybook'),
		'default'  => '',
	],
];
<?php
defined( 'ABSPATH' ) or die();

return [
	'services_management' => [
		'id'       => 'services_management',
		'menu_id'  => 'services',
		'group_id' => 'services_list',
		'type'     => 'services_list',
		'label'    => __('Services', 'simplybook'),
		'control'  => 'self',
	],
	'_services_state' => [
		'id'       => '_services_state',
		'menu_id'  => 'services',
		'group_id' => 'services_list',
		'type'     => 'hidden',
		'visible'  => false,
		'default'  => '{"isDirty":false,"isEditing":false,"hasActiveForm":false}',
	],
];
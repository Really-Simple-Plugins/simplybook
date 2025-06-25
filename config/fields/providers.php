<?php
defined( 'ABSPATH' ) or die();

return [
	'providers_management' => [
		'id'       => 'providers_management',
		'menu_id'  => 'providers',
		'group_id' => 'providers_list',
		'type'     => 'providers_list',
		'label'    => __('Providers', 'simplybook'),
		'control'  => 'self',
	],
	'_providers_state' => [
		'id'       => '_providers_state',
		'menu_id'  => 'providers',
		'group_id' => 'providers_list',
		'type'     => 'hidden',
		'visible'  => false,
		'default'  => '{"isDirty":false,"isEditing":false,"hasActiveForm":false}',
	],
];
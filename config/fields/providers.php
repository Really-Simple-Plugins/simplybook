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
];
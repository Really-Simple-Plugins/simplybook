<?php
defined( 'ABSPATH' ) or die();

return [
	'domain' => [
		'id'       => 'domain',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => '',
	],
	'company_id' => [
		'id'       => 'company_id',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
	'server' => [
		'id'       => 'server',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'label'    => '',
		'disabled' => false,
		'default'  => 'default',
		'widget_field'  => '/',
	],
	'implementation' => [
		'id'       => 'implementation',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
];
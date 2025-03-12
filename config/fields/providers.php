<?php
defined( 'ABSPATH' ) or die();

return [
	'providers' => [
		'id'       => 'providers',
		'menu_id'  => 'providers',
		'group_id' => 'providers',
		'source' => 'providers',
		'link'     => 'management/#providers',
		'type'     => 'list',
		'label'    => __('Providers', 'simplybook'),
		'default'  => false,
	],
];
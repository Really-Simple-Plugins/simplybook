
<?php
defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'domain',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => '',
	],
	[
		'id'       => 'company_id',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
	[
		'id'       => 'server',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'label'    => '',
		'disabled' => false,
		'default'  => 'default',
		'widget_field'  => '/',
	],
	[
		'id'       => 'implementation',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
];



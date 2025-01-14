
<?php
defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'clear_session',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'checkbox',
		'label'    => __('Clear session', 'simplybook'),
		'disabled' => false,
		'default'  => false,
		'widget_field'  => '/',
	],
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



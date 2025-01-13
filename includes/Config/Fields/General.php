
<?php
defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'clear_session',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'switch',
		'label'    => __('Clear session', 'simplybook'),
		'disabled' => false,
		'default'  => false,
		'widget_field'  => '/',
	]
];



<?php
defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'services',
		'menu_id'  => 'services',
		'group_id' => 'services',
		'source' => 'services',
		'link'     => 'management/#services',
		'type'     => 'list',
		'label'    => __('Services', 'simplybook'),
		'default'  => false,
	],
];
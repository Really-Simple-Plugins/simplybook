<?php
defined( 'ABSPATH' ) or die();

return [
	'services' => [
		'id'       => 'services',
		'menu_id'  => 'services',
		'group_id' => 'services',
		'source' => 'services',
		'edit_link' => 'v2/management/#services/edit/details/{ID}',
		'link'     => 'v2/management/#services',
		'type'     => 'list',
		'label'    => __('Services', 'simplybook'),
		'default'  => false,
	],
];
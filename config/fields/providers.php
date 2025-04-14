<?php
defined( 'ABSPATH' ) or die();

return [
	'providers' => [
		'id'       => 'providers',
		'menu_id'  => 'providers',
		'group_id' => 'providers',
		'source' => 'providers',
        'edit_link' => 'v2/management/#providers/edit/details/{ID}',
		'link'     => 'v2/management/#providers',
		'type'     => 'list',
		'label'    => __('Providers', 'simplybook'),
        'premiumText' => __('Want more providers?', 'simplybook'),
		'default'  => false,
	],
];
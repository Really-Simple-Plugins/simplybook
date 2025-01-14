<?php

defined( 'ABSPATH' ) or die();

return [
	[
		'id'       => 'review_notice_shown',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'disabled' => false,
		'default'  => false,
	],
	[
		'id'       => 'terms-and-conditions',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
	[
		'id'       => 'tour_shown_once',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'label'    => '',
		'default'  => false,
	],
];
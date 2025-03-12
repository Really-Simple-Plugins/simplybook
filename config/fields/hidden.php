<?php

defined( 'ABSPATH' ) or die();

return [
	'review_notice_shown' => [
		'id'       => 'review_notice_shown',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'disabled' => false,
		'default'  => false,
	],
	'terms-and-conditions' => [
		'id'       => 'terms-and-conditions',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'default'  => false,
	],
	'tour_shown_once' => [
		'id'       => 'tour_shown_once',
		'menu_id'  => 'general',
		'group_id' => 'general',
		'type'     => 'hidden',
		'label'    => '',
		'default'  => false,
	],
];
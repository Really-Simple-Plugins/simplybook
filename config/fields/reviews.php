<?php
defined( 'ABSPATH' ) or die( );

return
	[
		'reviews_count' => [
			'id'       => 'reviews_count',
			'menu_id'  => 'general',
			'group_id' => 'widgets',
			'type'     => 'checkbox',
			'label'    => __('Add the reviews count', 'simplybook'),
			'default'  => true,
			'widget_field'  => '/',
		],
		'hide_add_reviews' => [
			'id'       => 'hide_add_reviews',
			'menu_id'  => 'general',
			'group_id' => 'widgets',
			'type'     => 'checkbox',
			'label'    => __('Hide the add reviews button', 'simplybook'),
			'default'  => true,
			'widget_field'  => '/',
		],
		'button_title' => [
			'id'       => 'button_title',
			'menu_id'  => 'general',
			'group_id' => 'widgets',
			'type'     => 'text',
			'label'    => __('Booking button title', 'simplybook'),
			'default'  => __("Book now", 'simplybook'),
			'widget_field'  => '/',
		],
	];
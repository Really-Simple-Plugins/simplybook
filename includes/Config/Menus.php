<?php
defined( 'ABSPATH' ) or die( );
return $menus = [
		[
			'id'       => 'general',
			'title'    => __( 'General', 'simplybook' ),
			'groups'   => [
				[
					'id'    => 'general',
					'title' => __( 'General', 'simplybook' ),
				],
				[
					'id'    => 'authentication',
					'title' => __( 'Authentication', 'simplybook' ),
				],
				[
					'id'    => 'widgets',
					'title' => __( 'Widgets', 'simplybook' ),
				],
				[
					'id'    => 'working-hours',
					'title' => __( 'Working hours', 'simplybook' ),
				],
			],
		],
		[
			'id'       => 'services',
			'title'    => __( 'Services', 'simplybook' ),
		],
		[
			'id'       => 'design',
			'title'    => __( 'Design', 'simplybook' ),
			'groups'  => [
				[
					'id'    => 'design',
					'title' => __( 'Design', 'simplybook' ),
				],
				[
					'id'    => 'palettes',
					'title' => __( 'Palettes', 'simplybook' ),
				],
				[
					'id'    => 'colors',
					'title' => __( 'Colors', 'simplybook' ),
				],
			],
		],
		[
			'id'       => 'notifications',
			'title'    => __( 'Notifications', 'simplybook' ),
		],
		[
			'id'       => 'custom',
			'title'    => __( 'Custom', 'simplybook' ),
		],
		[
			'id'       => 'schedule',
			'title'    => __( 'Schedule', 'simplybook' ),
		],
		[
			'id'       => 'providers',
			'title'    => __( 'Providers', 'simplybook' ),
		],
		[
			'id'       => 'bookings',
			'title'    => __( 'Bookings', 'simplybook' ),
			'url'      => '/index/index',
		],
	];
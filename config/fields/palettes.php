<?php
defined( 'ABSPATH' ) or die( );
return
	[
		'palette' => [
			'id'       => 'palette',
			'menu_id'  => 'design',
			'group_id' => 'palettes',
			'type'     => 'palettes',
			'label'    => __( 'Palette', 'simplybook' ),
			'disabled' => false,
			'default'  => 'persian',
			'options'  => [
				[
					'id' => 'persian',
					'label' => __( 'Persian', 'simplybook' ),
					'colors' => [ '#49306B', '#C98E5A', '#FFFFFF', '#FFFFFF', '#474747' ],
				],
				[
					'id' => 'france',
					'label' => __( 'France', 'simplybook' ),
					'colors' => [ '#384DCF', '#CE3445', '#FFFFFF', '#FFFFFF', '#080D39' ],
				],
				[
					'id' => 'teal-refresh',
					'label' => __( 'Teal Refresh', 'simplybook' ),
					'colors' => [ '#E0692E', '#66A3AD', '#FFFFFF', '#FFFFFF', '#202929' ],
				],
				[
					'id' => 'oranges',
					'label' => __( 'Oranges', 'simplybook' ),
					'colors' => [ '#FFA80A', '#E25811', '#FFFFFF', '#FFFFFF', '#444547' ],
				],
				[
					'id' => 'energy-blue',
					'label' => __( 'Energy Blue', 'simplybook' ),
					'colors' => [ '#354AC9', '#585BFF', '#FFFFFF', '#FFFFFF', '#2A2B39' ],
				],
				[
					'id' => 'custom',
					'label' => __( 'Custom', 'simplybook' ),
					'colors' => [ '#D9A441', '#FFFFFF', '#333333', '#333333', '#FFFFFF' ],
				],
			],
			'widget_field'  => '/',
		],
	];
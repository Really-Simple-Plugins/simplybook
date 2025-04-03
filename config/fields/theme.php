<?php
defined( 'ABSPATH' ) or die( );

return
	[
        'theme' => [
            'id'       => 'theme_settings',
            'menu_id'  => 'design',
            'group_id' => 'theme',
            'type'     => 'theme',
            'label'    => __('Theme', 'simplybook'),
            'default'  => 'default',
            'translations' => [
                'flexible_week' => __('Flexible weekly', 'simplybook'),
                'flexible_provider' => __('Flexible Provider', 'simplybook'),
                'modern' => __('Modern', 'simplybook'),
                'default' => __('Default', 'simplybook'),
                'flexible' => __('Flexible', 'simplybook'),
                'modern_week' => __('Slots weekly', 'simplybook'),
                'grid_week' => __('Weekly classes', 'simplybook'),
                'classes_plugin' => __('Daily classes', 'simplybook'),
                'classes' => __('Modern provider', 'simplybook'),
                'as_slots' => __('As slots', 'simplybook'),
                'as_table' => __('As table', 'simplybook'),
                'block' => __('Block', 'simplybook'),
                'list' => __('List', 'simplybook'),
                'single_page' => __('Single page', 'simplybook'),
                'Display timeline' => __('Display calendar', 'simplybook'),
                'sb_base_color' => __('Base theme color', 'simplybook'),
                'Hide unavailable time' => __('Show only available time'),
                'Hide past days on calendar' => __('Hide unavailable days on calendar'),
                'Display timeline sidebar' => __('Display calendar layout sidebar (some themes only)'),
                'Image fit mode' => __('Image scale mode', 'simplybook'),
            ],
        ],
	];
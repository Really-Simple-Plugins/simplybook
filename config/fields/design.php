<?php
defined( 'ABSPATH' ) or die( );

/**
 * Get theme colors for default values
 */
function getThemeColorsForDefaults(): array {
    static $themeColors = null;
    
    if ($themeColors === null) {
        $themeColorService = new \SimplyBook\Services\ThemeColorService();
        $themeColors = $themeColorService->getThemeColors();
    }
    
    return $themeColors;
}

$themeColors = getThemeColorsForDefaults();

return
	[
        'timeline_type' => [
            'id'       => 'timeline_type',
            'menu_id'  => 'design',
            'group_id' => 'main',
            'type'     => 'select',
            'options' => [
                "flexible" => __("Flexible", "simplybook"),
                "modern" => __("Modern", "simplybook"),
                "flexible_week" => __("Flexible weekly", "simplybook"),
                "modern_week" => __("Slots weekly", "simplybook"),
                "classes" => __("Modern Provider", "simplybook"),
                "flexible_provider" => __("Flexible Provider", "simplybook"),
                "grid_week" => __("Weekly classes", "simplybook"),
            ],
            'label'    => __('Calendar layout', 'simplybook'),
            'disabled' => false,
            'default'  => 'modern',
        ],
		'datepicker' => [
			'id'       => 'datepicker',
			'menu_id'  => 'design',
			'group_id' => 'main',
			'type'     => 'select',
			'label'    => __('Datepicker type', 'simplybook'),
			'disabled' => false,
			'options' => [
				'inline_datepicker' => __('Inline Datepicker','simplybook'),
				'top_calendar' => __('Top Calendar','simplybook'),
			],
			'default'  => 'top_calendar',
		],
		'is_rtl' => [
			'id'       => 'is_rtl',
			'menu_id'  => 'design',
			'group_id' => 'main',
			'type'     => 'checkbox',
            'label'    => __('RTL', 'simplybook'),
            'tooltip'  => [
                'message' => sprintf(
                    /* translators: %s - IS or IS NOT */
                    __('When selected, writing starts from the right of the page and continues to the left, proceeding from top to bottom for new lines. Your website %s set to RTL.', 'simplybook'),
                    (is_rtl() ? 'IS' : 'IS NOT'),
                ),
                'type'    => 'info',
            ],
			'disabled' => false,
			'default'  => is_rtl(),
		],
		'allow_switch_to_ada' => [
			'id'       => 'allow_switch_to_ada',
			'menu_id'  => 'design',
			'group_id' => 'main',
			'type'     => 'checkbox',
			'label'    => __('Allow switch to ADA', 'simplybook'),
            'tooltip'  => [
                'message' => __('This adds a button to enable accessibility mode, which increases contrast for visitors with a visual disability.', 'simplybook'),
                'type'    => 'info',
            ],
			'disabled' => false,
			'default'  => false,
		],
        'clear_session' => [
            'id'       => 'clear_session',
            'menu_id'  => 'design',
            'group_id' => 'main',
            'type'     => 'checkbox',
            'tooltip'  => [
                'message' => __('Useful for in-store tablets, so each customer can make a new appointment without data from earlier ones.', 'simplybook'),
                'type'    => 'info',
            ],
            'label'    => __('Clear the session of each widget initialization', 'simplybook'),
            'disabled' => false,
            'default'  => true,
        ],
// Removed since: NL14RSP2-219 - kept for reference
//        'reviews_count' => [
//            'id'       => 'reviews_count',
//            'menu_id'  => 'design',
//            'group_id' => 'reviews',
//            'type'     => 'checkbox',
//            'label'    => __('Add the reviews count', 'simplybook'),
//            'default'  => true,
//        ],
//        'hide_add_reviews' => [
//            'id'       => 'hide_add_reviews',
//            'menu_id'  => 'design',
//            'group_id' => 'reviews',
//            'type'     => 'checkbox',
//            'label'    => __('Hide the add reviews button', 'simplybook'),
//            'default'  => true,
//        ],
// Removed since: NL14RSP2-220 - kept for reference
//        'button_title' => [
//            'id'       => 'button_title',
//            'menu_id'  => 'design',
//            'group_id' => 'booking',
//            'type'     => 'text',
//            'label'    => __('Title', 'simplybook'),
//            'default'  => __("Book now", 'simplybook'),
//        ],
//        'button_background_color' => [
//            'id'       => 'button_background_color',
//            'menu_id'  => 'design',
//            'group_id' => 'booking',
//            'type'     => 'colorpicker',
//            'style'     => 'inline',
//            'label'    => __('Background color', 'simplybook'),
//            'default'  => '#4CAF50',
//        ],
//        'button_text_color' => [
//            'id'       => 'button_text_color',
//            'menu_id'  => 'design',
//            'group_id' => 'booking',
//            'type'     => 'colorpicker',
//            'style'     => 'inline',
//            'label'    => __('Text color', 'simplybook'),
//            'default'  => '#ffffff',
//        ],
//        'button_position' => [
//            'id'       => 'button_position',
//            'menu_id'  => 'design',
//            'group_id' => 'booking',
//            'type'     => 'select',
//            'label'    => __('Position', 'simplybook'),
//            'default'  => 'bottom',
//            'options'  => [
//                'top'    => __('Top', 'simplybook'),
//                'bottom' => __('Bottom', 'simplybook'),
//                'left'   => __('Left', 'simplybook'),
//                'right'  => __('Right', 'simplybook'),
//            ],
//        ],
//        'button_position_offset' => [
//            'id'       => 'button_position_offset',
//            'menu_id'  => 'design',
//            'group_id' => 'booking',
//            'type'     => 'text',
//            'label'    => __('Position offset', 'simplybook'),
//            'help'     => __('Offset value in pixels, percentage or \'auto\'. Calculated from the bottom or right side, based on the chosen position.', 'simplybook'),
//            'default'  => 'auto',
//            'regex'    => '/^(auto|[0-9]+(px|%)?)$/',
//        ],
        'theme' => [
            'id'       => 'theme',
            'menu_id'  => 'design',
            'group_id' => 'theme',
            'type'     => 'theme',
            'label'    => __('Theme', 'simplybook'),
            'control' => 'self',
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
                'classes' => __('Modern Provider', 'simplybook'),
                'as_slots' => __('As slots', 'simplybook'),
                'as_table' => __('As table', 'simplybook'),
                'block' => __('Block', 'simplybook'),
                'list' => __('List', 'simplybook'),
                'single_page' => __('Single page', 'simplybook'),
                'Display timeline' => __('Display calendar', 'simplybook'),
                'sb_base_color' => __('Base theme color', 'simplybook'),
                'Hide unavailable time' => __('Show only available time', 'simplybook'),
                'Hide past days on calendar' => __('Hide unavailable days on calendar', 'simplybook'),
                'Display timeline sidebar' => __('Display calendar layout sidebar', 'simplybook'),
                'Image fit mode' => __('Image scale mode', 'simplybook'),
            ],
        ],
        'theme_settings' => [
            'id' => 'theme_settings',
            'menu_id' => 'design',
            'group_id' => 'theme',
            'type' => 'hidden',
            'sub_settings' => [
                'timeline_show_end_time' => [
                    'id' => 'timeline_show_end_time',
                    'default' => false,
                ],
                'timeline_hide_unavailable' => [
                    'id' => 'timeline_hide_unavailable',
                    'default' => true,
                ],
                'hide_past_days' => [
                    'id' => 'hide_past_days',
                    'default' => false,
                ],
                'hide_img_mode' => [
                    'id' => 'hide_img_mode',
                    'default' => true,
                ],
                'show_sidebar' => [
                    'id' => 'show_sidebar',
                    'default' => true,
                ],
                'timeline_modern_display' => [
                    'id' => 'timeline_modern_display',
                    'default' => 'as_slots',
                ],
                'display_item_mode' => [
                    'id' => 'display_item_mode',
                    'default' => 'block',
                ],
                'sb_base_color' => [
                    'id' => 'sb_base_color',
                    'default' => $themeColors['secondary'],
                    'is_secondary' => true,
                ],
                'booking_nav_bg_color' => [
                    'id' => 'booking_nav_bg_color',
                    'default' => $themeColors['primary'],
                    'is_primary' => true,
                ],
                'body_bg_color' => [
                    'id' => 'body_bg_color',
                    'default' => $themeColors['background'],
                ],
                'dark_font_color' => [
                    'id' => 'dark_font_color',
                    'default' => $themeColors['foreground'],
                ],
                'light_font_color' => [
                    'id' => 'light_font_color',
                    'default' => $themeColors['text'],
                ],
                'btn_color_1' => [
                    'id' => 'btn_color_1',
                    'default' => $themeColors['primary'],
                    'is_primary' => true,
                ],
                'sb_company_label_color' => [
                    'id' => 'sb_company_label_color',
                    'default' => $themeColors['primary'],
                    'is_primary' => true,
                ],
                'sb_busy' => [
                    'id' => 'sb_busy',
                    'default' => $themeColors['secondary'],
                    'is_secondary' => true,
                ],
                'sb_available' => [
                    'id' => 'sb_available',
                    'default' => $themeColors['active'],
                    'is_active' => true,
                ],
                'sb_review_image' => [
                    'id' => 'sb_review_image',
                    'default' => '',
                ],
                'hide_company_label' => [
                    'id' => 'hide_company_label',
                    'default' => false,
                ],
                'link_color' => [
                    'id' => 'link_color',
                    'default' => $themeColors['active'],
                ],
            ]
        ],
        'settings_section' => [
            'id'       => 'settings_section',
            'menu_id'  => 'design',
            'group_id' => 'main',
            'type'     => 'hidden',
            'disabled' => false,
            'default'  => 'design_settings',
        ]
	];
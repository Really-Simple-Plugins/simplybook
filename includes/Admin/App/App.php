<?php

namespace Simplybook\Admin\App;

class App {
	public function __construct() {
		// Any initialization code for App can go here
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
	}

	/**
	 * Add the admin menu.
	 * @hook admin_menu
	 *
	 * @return void
	 */
	public function add_admin_menu(): void {
		// If you need to restrict access based on user capabilities, uncomment the following line.
		// if ( ! burst_user_can_view() ) { return; } @todo capabilities

		$menu_label = __( 'Bookings', 'simplybook' );

		// Add admin menu page and set the callback to the simplybook_app method in App
		$page_hook_suffix = add_menu_page(
			__( 'Bookings', 'simplybook' ),
			$menu_label,
			'simplybook_manage',
			'simplybook',
			array( $this, 'simplybook_app' ), // Reference the App instance's method
			'dashicons-calendar-alt',
			apply_filters( 'simplybook_menu_position', 3 )
		);

		add_action( "admin_print_scripts-{$page_hook_suffix}", [ $this, 'enqueue_app_scripts' ] );
	}

	public function simplybook_app() {
		?>
        <style>
            .toplevel_page_simplybook #wpcontent {
                padding-left: 0;
            }
        </style>
        <div id="simplybook_app">

        </div>
		<?php
	}

	/**
	 * Enqueue the app scripts
	 */
	public function enqueue_app_scripts(): void {
		error_log( 'enqueue_app_scripts' );
		$js_data = $this->get_chunk_translations( 'includes/Admin/App/build' );
		if ( empty( $js_data ) ) {
			error_log( 'No JS data found' );
			return;
		}
		wp_enqueue_script(
			'simplybook',
			plugins_url( '/build/' . $js_data['js_file'], __FILE__ ),
			$js_data['dependencies'],
			$js_data['version'],
			true
		);

		wp_localize_script(
			'simplybook',
			'simplybook',
			$this->localized_settings( $js_data )
		);
	}

	/**
	 * WordPress doesn't allow for translation of chunks resulting of code splitting.
	 * Several workarounds have popped up in JetPack and Woocommerce: https://developer.wordpress.com/2022/01/06/wordpress-plugin-i18n-webpack-and-composer/
	 * Below is mainly based on the Woocommerce solution, which seems to be the most simple approach. Simplicity is king here.
	 *
	 * @param $dir
	 *
	 * @return array
	 */
	private function get_chunk_translations( $dir ): array {
		// get all files from the settings/build folder
		$buildDirPath = SIMPLYBOOK_PATH . $dir;
		$filenames    = scandir( $buildDirPath );

		// filter the filenames to get the JavaScript and asset filenames
		$jsFilename        = '';
		$assetFilename     = '';
		$json_translations = [];
		foreach ( $filenames as $filename ) {
			if ( strpos( $filename, 'index.' ) === 0 ) {
				if ( substr( $filename, - 3 ) === '.js' ) {
					$jsFilename = $filename;
				} else if ( str_ends_with( $filename, '.asset.php' ) ) {
					$assetFilename = $filename;
				}
			}

			if ( strpos( $filename, '.js' ) === false ) {
				continue;
			}

			// remove extension from $filename
			$chunk_handle = str_replace( '.js', '', $filename );
			// temporarily register the script, so we can get a translations object.
			wp_register_script( $chunk_handle, plugins_url( 'build/' . $filename, __FILE__ ), [], true );

			//as there is no pro version of this plugin, no need to declare a path
			$localeData = load_script_textdomain( $chunk_handle, 'simplybook', false );
			if ( ! empty( $localeData ) ) {
				$json_translations[] = $localeData;
			}
			wp_deregister_script( $chunk_handle );
		}

		$asset_file = require $buildDirPath . '/' . $assetFilename;
		if ( empty( $jsFilename ) ) {
			return [];
		}

		return [
			'json_translations' => $json_translations,
			'js_file'           => $jsFilename,
			'dependencies'      => $asset_file['dependencies'],
			'version'           => $asset_file['version'],
		];
	}

	/**
	 * Localize the script with the translations
	 *
	 * @param $js_data
	 *
	 * @return array
	 */
	private function localized_settings( $js_data ): array {
		return apply_filters(
			'simplybook_localize_script',
			[
				'json_translations' => $js_data['json_translations'],
				'settings_menu'     => $this->settings_menu(),
                'settings_fields'   => $this->settings_fields(),
			]
		);
	}

	private function settings_menu() {
		$menu_items = [
			[
				'id'       => 'general',
				'title'    => __( 'General', 'burst-statistics' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'general',
						'title' => __( 'General', 'burst-statistics' ),
					],
					[
						'id'          => 'email_reports',
						'title'       => __( 'Email reports', 'burst-statistics' ),
						'description' => __( 'Get weekly or monthly reports sent to your email.', 'burst-statistics' ),
					],
				],
			],
			[
				'id'       => 'goals',
				'title'    => __( 'Goals', 'burst-statistics' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'goals',
						'title' => __( 'Goals', 'burst-statistics' ),
					],
				],
			],
			[
				'id'       => 'data',
				'title'    => __( 'Data', 'burst-statistics' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'data_archiving',
						'title' => __( 'Archiving', 'burst-statistics' ),
					],
					[
						'id'       => 'restore_archives',
						'title'    => __( 'Archived Data', 'burst-statistics' ),
					],
				],
			],
			[
				'id'       => 'advanced',
				'title'    => __( 'Advanced', 'burst-statistics' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'tracking',
						'title' => __( 'Tracking', 'burst-statistics' ),
					],
					[
						'id'    => 'scripts',
						'title' => __( 'Scripts', 'burst-statistics' ),
					],
				],
			],
		];

		return apply_filters( 'burst_menu', $menu_items );
	}

	function settings_fields( $load_values = true ) {

		if ( ! burst_user_can_manage() ) {
			return [];
		}
		$fields = [
			[
				'id'       => 'review_notice_shown',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'hidden',
				'label'    => '',
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'burst_tour_shown_once',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'hidden',
				'label'    => '',
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'enable_turbo_mode',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'checkbox',
				'label'    => __( 'Enable Turbo mode', 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'What is Turbo mode?', 'burst-statistics' ),
					'text'  => __( 'Turbo mode improves pagespeed. When enabled, the script is no longer loaded in the header asynchronously, but is loaded in the footer and deferred. You could lose data from visitors who leave before the page has fully loaded.', 'burst-statistics' ),
					'url'   => burst_get_website_url( '/definition/turbo-mode/', [
						'burst_source'   => 'setting-help',
						'burst_content'   => 'turbo-mode',
					] ),
				],
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'enable_cookieless_tracking',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'checkbox',
				'label'    => __( 'Enable Cookieless tracking', 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'What is Cookieless tracking?', 'burst-statistics' ),
					'text'  => __( "With cookieless tracking enabled, Burst will not use cookies to determine the number of unique visitors. It will use contextual data, like the browser version and device, also called 'fingerprinting'. The latter could be less reliable for some users.", 'burst-statistics' ),
					'url'   => burst_get_website_url( '/definition/what-is-cookieless-tracking/', [
						'burst_source'   => 'setting-help',
						'burst_content'   => 'cookieless-tracking',
					] ),
				],
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'enable_do_not_track',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'checkbox',
				'label'    => __( "Honor 'Do Not Track' requests", 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'          => 'restart_tour',
				'menu_id'     => 'general',
				'group_id'    => 'general',
				'type'        => 'button',
				'url'         => burst_dashboard_url . '#dashboard/tour',
				'button_text' => __( 'Restart', 'burst-statistics' ),
				'label'       => __( 'Restart plugin tour', 'burst-statistics' ),
				'disabled'    => false,
				'default'     => false,
			],
			[
				'id'       => 'dismiss_non_error_notices',
				'menu_id'  => 'general',
				'group_id' => 'general',
				'type'     => 'checkbox',
				'label'    => __( 'Dismiss all notices in your dashboard except critical ones', 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'email_reports_mailinglist',
				'menu_id'  => 'general',
				'group_id' => 'email_reports',
				'type'     => 'email_reports',
				'label'    => __( 'Email reports', 'burst-statistics' ),
				'disabled' => false,
				'default'  => '',
			],
			[
				'id'          => 'logo_attachment_id',
				'menu_id'     => 'general',
				'group_id'    => 'email_reports',
				'type'        => 'logo_editor',
				'label'       => __( 'Change logo in the email reports', 'burst-statistics' ),
				'pro' => [
					'url' => burst_get_website_url('pricing/', [
						'burst_source'   => 'setting-upgrade',
						'burst_content'   => 'email-reports',
					]),
					'disabled' => false,
				],
				'disabled'    => true,
				'default'     => false,
			],

			[
				'id'       => 'goals',
				'menu_id'  => 'goals',
				'group_id' => 'goals',
				'type'     => 'goals',
				'label'    => __( 'Goals', 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'How to set goals?', 'burst-statistics' ),
					'text'  => __( "To set goals for a website, you need to identify the purpose of the site and the key actions you want visitors to take. Set measurable and achievable goals for each action and track your progress.", 'burst-statistics' ),
					'url'   => burst_get_website_url( 'how-to-set-goals/', [
						'burst_source'   => 'setting-help',
						'burst_content'   => 'goals',
					] ),
				],
				'default' => [],
			],
			[
				'id'       => 'user_role_blocklist',
				'menu_id'  => 'advanced',
				'group_id' => 'tracking',
				'type'     => 'user_role_blocklist',
				'label'    => __( 'Exclude user roles from being tracked', 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'Excluding visitors', 'burst-statistics' ),
					'text'  => __( 'You can exclude visitors by user role and IP address. This will affect new data only.', 'burst-statistics' ),
					'url'   => burst_get_website_url( 'exclude-ip-addresses-from-burst-statistics/', [
						'burst_source'   => 'setting-help',
						'burst_content'   => 'exclude-visitors',
					] ),
				],
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'ip_blocklist',
				'menu_id'  => 'advanced',
				'group_id' => 'tracking',
				'type'     => 'ip_blocklist',
				'label'    => __( 'Exclude IP address from tracking, separate with a line break', 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'track_url_change',
				'menu_id'  => 'advanced',
				'group_id' => 'tracking',
				'type'     => 'checkbox',
				'label'    => __( "Track URL changes as separate pageviews", 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'Track URL changes as separate pageviews', 'burst-statistics' ),
					'text'  => __('Enable this option to track changes in the URL (such as parameters or fragments) as separate pageviews. This is particularly useful for single-page applications or dynamic websites.', 'burst-statistics'),
				],
				'disabled' => false,
				'default'  => false,
			],

			[
				'id'       => 'combine_vars_and_script',
				'menu_id'  => 'advanced',
				'group_id' => 'scripts',
				'type'     => 'checkbox',
				'label'    => __( 'Merge tracking settings and script', 'burst-statistics' ),
				'help'     => [
					'label' => 'default',
					'title' => __( 'Merge tracking settings and script for optimized delivery', 'burst-statistics' ),
					'text'  => __( 'Boost site speed by merging the Burst settings into the Burst script. This simplifies management and improves loading times, ideal for headless sites or strict security policies.', 'burst-statistics' ),
				],
				'disabled' => false,
				'default'  => false,
			],

			[
				'id'       => 'archive_data',
				'menu_id'  => 'data',
				'group_id' => 'data_archiving',
				'options'  => [

					'none' 	 => __('Don\'t manage',"burst-statistics"),
					'archive' => __('Automatically Archive',"burst-statistics"),
					'delete' => __('Automatically Delete',"burst-statistics"),
				],
				'pro' => [
					'url' => burst_get_website_url('pricing/', [
						'burst_source'   => 'setting-upgrade',
						'burst_content'   => 'data-archiving',
					]),
					'disabled' => false,
				],
				'help'     => [
					'label' => 'default',
					'title' => __( 'Why should I manage old data?', 'burst-statistics' ),
					'text'  => __( 'Managing old data can optimize storage and improve site performance. Choose to archive or delete based on your needs.', 'burst-statistics' ),
					'url'   => burst_get_website_url( 'do-I-need-to-archive-my-data/', [
						'burst_source'   => 'setting-help',
						'burst_content'   => 'data-archiving',
					] ),
				],
				'disabled' => ['archive'],
				'type'     => 'select',
				'label'    => __( 'Choose how to manage old statistics', 'burst-statistics' ),
				// option is string with more than 1 letter
				'comment' => strlen( get_option( 'burst_table_size' ) ) > 1
					? sprintf( _x( 'Burst currently uses %s of your database.', 'e.g. Burst currently uses 10 MB of your database.', "burst-statistics" ), get_option( 'burst_table_size' ) ) : '',
				'default' => false,
			],
			[
				'id'       => 'archive_after_months',
				'menu_id'  => 'data',
				'group_id' => 'data_archiving',
				'min'   	 => 1,
				'type'     => 'number',
				'label'    => __( 'Retain data for how many months?', 'burst-statistics' ),
				'disabled' => false,
				'default'  => 24,
				'react_conditions' => [
					'relation' => 'AND',
					[
						'archive_data' => ['archive', 'delete'],
					],
				],
			],
			[
				'id'       => 'reset',
				'menu_id'  => 'data',
				'group_id' => 'data_archiving',
				'type'     => 'button',
				'warnTitle'     => __( 'Are you sure?', 'burst-statistics' ),
				'warnContent'  => __( 'This will permanently delete all statistics, goals, and goal statistics.', 'burst-statistics' ) . ' ' . __( 'This action can not be undone.', 'burst-statistics' ),
				'warnType' => 'danger', // 'info', 'warning', 'danger
				'action'   => 'reset',
				'button_text'     => __('Reset statistics', 'burst-statistics'),
				'label'    => __( 'Reset statistics', 'burst-statistics' ),
				'comment'   => __( 'This will permanently delete all statistics, goals, and goal statistics.', 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
			],
			[
				'id'       => 'confirm_delete_data',
				'menu_id'  => 'data',
				'group_id' => 'data_archiving',
				'type'     => 'checkbox',
				'label'    => __( 'Please confirm the deletion, without the possibility to restore.', 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
				'react_conditions' => [
					'relation' => 'AND',
					[
						'archive_data' => ['delete'],
					],
				],
			],
			[
				'id'       => 'restore_archives',
				'menu_id'  => 'data',
				'group_id' => 'restore_archives',
				'type'     => 'restore_archives',
				'disabled' => false,
				'default'  => false,
			],
		];

		//If the plugin is considered high traffic, summary tables kick in. This can be disabled with this option.
		if ( BURST()->summary->is_high_traffic() || burst_get_option('disable_summary') ) {
			$fields[] = [
				'id'       => 'disable_summary',
				'menu_id'  => 'advanced',
				'group_id' => 'tracking',
				'type'     => 'checkbox',
				'label'    => __( 'Disable the usage of summary tables', 'burst-statistics' ),
				'comment'    => __( 'Using summary tables speeds up the dashboard on higher traffic environments, but can show small differences from the actual data.', 'burst-statistics' ),
				'disabled' => false,
				'default'  => false,
			];
		}

		if ( is_multisite() && burst_is_networkwide_active() && is_main_site() ) {
			$fields[] = [
				'id'       => 'track_network_wide',
				'menu_id'  => 'advanced',
				'group_id' => 'tracking',
				'type'     => 'checkbox',
				'label'    => __( 'Track all hits networkwide, and view them on the dashboard of your main site', 'burst-statistics' ),
				'disabled' => true,
				'pro' => [
					'url' => burst_get_website_url('pricing/', [
						'burst_source'   => 'setting-upgrade',
						'burst_content'   => 'network-wide',
					]),
					'disabled' => false,
				],
				'default'  => false,
			];
		}

		$fields = apply_filters( 'burst_fields', $fields );
		foreach ( $fields as $key => $field ) {
			$field = wp_parse_args( $field, [ 'id'                 => false,
			                                  'visible'            => true,
			                                  'disabled'           => false,
			                                  'new_features_block' => false,
			] );
			if ( $load_values ) {
				$value          = burst_sanitize_field( burst_get_option( $field['id'], $field['default'] ), $field['type'], $field['id'] );
				$field['value'] = apply_filters( 'burst_field_value_' . $field['id'], $value, $field );
				$fields[ $key ] = apply_filters( 'burst_field', $field, $field['id'] );
			}
		}

		$fields = apply_filters( 'burst_fields_values', $fields );

		return array_values( $fields );
	}
}

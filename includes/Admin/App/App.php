<?php

namespace Simplybook\Admin\App;

class App {
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
	}

	/**
	 * Add the admin menu.
	 * @hook admin_menu
	 *
	 * @return void
	 */
	public function add_admin_menu(): void {
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
//                'settings_fields'   => $this->settings_fields(),
			]
		);
	}

	private function settings_menu() {
		$menu_items = [
			[
				'id'       => 'general',
				'title'    => __( 'General', 'simplybook' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'general',
						'title' => __( 'General', 'simplybook' ),
					],
					[
						'id'          => 'email_reports',
						'title'       => __( 'Email reports', 'simplybook' ),
						'description' => __( 'Get weekly or monthly reports sent to your email.', 'simplybook' ),
					],
				],
			],
			[
				'id'       => 'goals',
				'title'    => __( 'Goals', 'simplybook' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'goals',
						'title' => __( 'Goals', 'simplybook' ),
					],
				],
			],
			[
				'id'       => 'data',
				'title'    => __( 'Data', 'simplybook' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'data_archiving',
						'title' => __( 'Archiving', 'simplybook' ),
					],
					[
						'id'       => 'restore_archives',
						'title'    => __( 'Archived Data', 'simplybook' ),
					],
				],
			],
			[
				'id'       => 'advanced',
				'title'    => __( 'Advanced', 'simplybook' ),
				'step'     => 1,
				'groups'   => [
					[
						'id'    => 'tracking',
						'title' => __( 'Tracking', 'simplybook' ),
					],
					[
						'id'    => 'scripts',
						'title' => __( 'Scripts', 'simplybook' ),
					],
				],
			],
		];

		return apply_filters( 'simplybook_menu', $menu_items );
	}
}

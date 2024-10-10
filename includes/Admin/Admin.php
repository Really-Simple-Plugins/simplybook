<?php
namespace Simplybook\Admin;

use Simplybook\Admin\App\App;
use Simplybook\Traits\Admin\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Admin {
    use Helper;

    protected App $app;

	public function __construct() {
		// Instantiate the App class
		$this->app = new App();

		// Add action to register the admin menu
		add_action('admin_menu', array($this, 'add_admin_menu'));

        $plugin = SIMPLYBOOK_PLUGIN;
        add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
	}

    public function plugin_settings_link($links) {
        if ( ! $this->user_can_manage() ) {
            return $links;
        }

        $url = $this->admin_url();
        $settings_link = '<a href="' . $url . '">' . __( 'Settings', 'simplybook' ) . '</a>';
        array_unshift( $links, $settings_link );

        //support
        $support = '<a rel="noopener noreferrer" target="_blank" href="https://wordpress.org/support/plugin/simplybook/">' . __( 'Support', 'simplybook' ) . '</a>';
        array_unshift( $links, $support );

        return $links;
    }

    /**
     * Add the admin menu.
     * @hook admin_menu
     *
     * @return void
     */
	public function add_admin_menu(): void
    {
		// If you need to restrict access based on user capabilities, uncomment the following line.
		// if ( ! burst_user_can_view() ) { return; } @todo

		$menu_label = __('Bookings', 'simplybook');

		// Add admin menu page and set the callback to the simplybook_app method in App
		$page_hook_suffix = add_menu_page(
			__('Bookings', 'simplybook'),
			$menu_label,
			'manage_options',
			'simplybook',
			array( $this->app, 'simplybook_app' ), // Reference the App instance's method
			'dashicons-calendar-alt',
			apply_filters('simplybook_menu_position', 3)
		);

		add_action( "admin_print_scripts-{$page_hook_suffix}", [$this, 'enqueue_app_scripts'] );
	}

    /**
     * Enqueue the app scripts
     */
	public function enqueue_app_scripts(): void
    {
		$js_data = $this->get_chunk_translations( 'includes/Admin/App/build' );
		if ( empty( $js_data ) ) {
			return;
		}
		wp_enqueue_script(
			'simplybook-app',
			plugins_url( 'App/build/' . $js_data['js_file'], __FILE__ ),
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
     * @return array
     */
	public function get_chunk_translations( $dir ): array
    {
		// get all files from the settings/build folder
		$buildDirPath = SIMPLYBOOK_PATH . $dir;
		$filenames    = scandir( $buildDirPath );

		// filter the filenames to get the JavaScript and asset filenames
		$jsFilename        = '';
		$assetFilename     = '';
		$json_translations = [];
		foreach ( $filenames as $filename ) {
			if ( str_starts_with($filename, 'index.') ) {
				if (str_ends_with($filename, '.js')) {
					$jsFilename = $filename;
				} elseif ( str_ends_with($filename, '.asset.php') ) {
					$assetFilename = $filename;
				}
			}

			if ( !str_contains($filename, '.js') ) {
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
	public function localized_settings( $js_data ): array
    {
		return apply_filters(
			'simplybook_localize_script',
			[
				'json_translations'       => $js_data['json_translations'],
			]
		);
	}
}

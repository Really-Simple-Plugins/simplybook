<?php
namespace Simplybook\Admin;

use Simplybook\Admin\App\App;
use Simplybook\Admin\Capability\Capability;
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
		add_action('admin_init', array($this, 'maybe_run_activation'));

        $plugin = SIMPLYBOOK_PLUGIN;
        add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
	}

    /**
     * Run activation hooks when on the settings page
     * @hook admin_init
     * @return void
     */
    public function maybe_run_activation(): void
    {
        if ( ! get_option( 'simplybook_run_activation' ) ) {
            return;
        }

        Capability::add_capability('simplybook_manage');
        delete_option( 'simplybook_run_activation' );
        do_action( 'simplybook_activation' );
    }
    /**
     * Add settings and support link to the plugin page
     *
     * @param array $links
     * @return array
     */
    public function plugin_settings_link(array $links): array
    {
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
			'simplybook_manage',
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
			plugins_url( 'build/index.js' , __FILE__ ),
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
            if ( strpos( $filename, 'index.' ) === 0 ) {
                if ( substr( $filename, -3 ) === '.js' ) {
					$jsFilename = $filename;
				} elseif ( str_ends_with($filename, '.asset.php') ) {
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

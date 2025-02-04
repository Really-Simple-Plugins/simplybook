<?php
namespace Simplybook\Admin\Installer;
if ( ! defined( 'ABSPATH' ) ) exit;

/**
* Install suggested plugins
*/

class Installer {
	private string $slug = '';
	public string $action;
	public function __construct($slug) {
		if (!function_exists('is_plugin_active')) {
			include_once(ABSPATH . 'wp-admin/includes/plugin.php');
		}
		if ( !current_user_can('install_plugins') ) return;
		$this->slug = $slug;
	}

	/**
	 * Check if plugin is downloaded
	 * @return bool
	 */

	public function plugin_is_downloaded(): bool {
		return file_exists(trailingslashit(WP_PLUGIN_DIR).$this->get_activation_slug() );
	}
	/**
	 * Check if plugin is activated
	 * @return bool
	 */
	public function plugin_is_activated(): bool {
		return is_plugin_active($this->get_activation_slug());
	}

	/**
	 * Install plugin
	 * @param string $step
	 *
	 * @return void
	 */
	public function install(string $step): void {
		if ( !current_user_can('install_plugins') ) return;

		ob_start();

		if ( $step === 'download' ) {
			$this->download_plugin();
		}
		if ( $step === 'activate' ) {
			$this->activate_plugin();
		}

		ob_get_clean();

	}

	/**
	 * Get slug to activate plugin with
	 * @return string
	 */
	public function get_activation_slug(): string {
		$slugs = [
			'complianz-gdpr' => 'complianz-gdpr/complianz-gpdr.php',
			'really-simple-ssl' => 'really-simple-ssl/rlrsssl-really-simple-ssl.php',
			'complianz-terms-conditions' => 'complianz-terms-conditions/complianz-terms-conditions.php',
		];
		return $slugs[$this->slug];
	}

	/**
	 * Cancel shepherd tour
	 * @return void
	 */
	public function cancel_tour(): void {
		$prefixes = [
			'burst-pro' => 'burst',
			'burst-statistics' => 'burst',
			'really-simple-ssl' => 'rsssl',
			'complianz-terms-conditions' => 'cmplz_tc',
		];
		$prefix = $prefixes[$this->slug];
		update_site_option( $prefix.'_tour_started', false );
		update_site_option( $prefix.'_tour_shown_once', true );
		delete_transient($prefix.'_redirect_to_settings');
	}

	/**
	 * Download the plugin
	 * @return bool
	 */
	public function download_plugin(): bool {
		if ( !current_user_can('install_plugins') ) {
			return false;
		}
		if ( get_transient("rsssl_plugin_download_active")!==$this->slug ) {
			set_transient("rsssl_plugin_download_active", $this->slug,MINUTE_IN_SECONDS );
			$info          = $this->get_plugin_info();
			$download_link = esc_url_raw( $info->versions['trunk'] );
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			$skin     = new WP_Ajax_Upgrader_Skin();
			$upgrader = new Plugin_Upgrader( $skin );
			$result = $upgrader->install( $download_link );
			if (is_wp_error($result)){
				return false;
			}
			delete_transient("rsssl_plugin_download_active");
		}
		return true;
	}

	/**
	 * Activate the plugin
	 *
	 * @return bool
	 */
	public function activate_plugin(): bool {
		if ( !current_user_can('install_plugins')) {
			return false;
		}
		$slug = $this->get_activation_slug();
		//when activated from the network admin, we assume the user wants network activated
		$networkwide = is_multisite() && is_network_admin();
		if ( !defined('DOING_CRON') ) {
			define( 'DOING_CRON', true);
		}

		$result = activate_plugin( $slug, '', $networkwide );
		if ( is_wp_error($result) ){
			return false;
		}
		$this->cancel_tour();
		return true;
	}

	/**
	 * Get plugin info
	 * @return array
	 */
	public function get_plugin_info(): array {
		require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		$plugin_info = get_transient('cmplz_'.$this->slug . '_plugin_info');
		if ( empty($plugin_info) ) {
			$plugin_info = plugins_api('plugin_information', array('slug' => $this->slug));
			if ( !is_wp_error($plugin_info) ) {
				set_transient('cmplz_'.$this->slug . '_plugin_info', $plugin_info, WEEK_IN_SECONDS);
			}
		}
		return $plugin_info;
	}
}



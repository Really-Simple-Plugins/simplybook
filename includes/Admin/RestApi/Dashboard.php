<?php
namespace Simplybook_old\Admin\RestApi;

use Simplybook_old\Admin\Installer\Installer;
use Simplybook_old\Traits\Helper;
use Simplybook_old\Traits\Save;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated Use {@see \SimplyBook\App\Endpoints\DashboardDataEndpoint}
 * and {@see \SimplyBook\App\Endpoints\OtherPluginsDataEndpoint} instead
 */
class Dashboard extends RestApi {
	use Helper;
	use Save;

	public function __construct() {
		parent::__construct();
	}

	public function register_rest_route(): void
	{
		register_rest_route(
			'simplybook/v1',
			'get_dashboard_data',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'get_dashboard_data' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);

		register_rest_route(
			'simplybook/v1',
			'other_plugins_data',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'other_plugins_data' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);


		register_rest_route(
			'simplybook/v1',
			'do_plugin_action',
			array(
				'methods' => 'POST',
				'callback' => array( $this, 'do_plugin_action' ),
				'permission_callback' => function ( $request ) {
					return $this->validate_request( $request );
				},
			)
		);
	}

	public function do_plugin_action($request): WP_REST_Response {
		$slug = $request->get_param('slug');
		$action = $request->get_param('action');
		error_log("do plugin action for $slug and $action");
		$installer = new Installer($slug);
		$installer->install($action);
		$plugins = $this->get_plugins_data();

		//get the plugin with slug $slug
		$plugin = array_filter($plugins, function($plugin) use ($slug){
			return $plugin['slug'] === $slug;
		});
		//get the first element
		$plugin = reset($plugin);

		return $this->response([
			'plugin' => $plugin
		]);
	}

	/**
	 * Get plugin data for other plugin section
	 *
	 * @return array
	 */
	private function get_plugins_data( ): array {
		$plugins = array(
			[
				'slug' => 'really-simple-ssl',
				'constant_free' => 'rsssl_version',
				'constant_premium' => 'rsssl_pro',
				'wordpress_url' => 'https://wordpress.org/plugins/really-simple-ssl/',
				'upgrade_url' => 'https://really-simple-ssl.com/pro?src=simplybook-plugin',
				'title' => "Really Simple Security - ".__("Lightweight plugin. Heavyweight security features.", "simplybook" ),
				'color' => '#f4bf3e'
			],
			[
				'slug' => 'complianz-gdpr',
				'constant_free' => 'cmplz_version',
				'constant_premium' => 'cmplz_premium',
				'create' => admin_url('admin.php?page=complianz'),
				'wordpress_url' => 'https://wordpress.org/plugins/complianz-gdpr/',
				'upgrade_url' => 'https://complianz.io?src=simplybook-plugin',
				'title' => 'Complianz GDPR/CCPA',
				'color' => '#009fff'
			],
			[
				'slug' => 'complianz-terms-conditions',
				'constant_free' => 'cmplz_tc_version',
				'create' => admin_url('admin.php?page=terms-conditions'),
				'wordpress_url' => 'https://wordpress.org/plugins/complianz-terms-conditions/',
				'upgrade_url' => 'https://complianz.io?simplybook=cmplz-plugin',
				'title' => 'Complianz - '. __("Terms & Conditions", "simplybook"),
				'color' => '#000000'
			],
		);

		foreach ( $plugins as $index => $plugin ){
			$installer = new Installer($plugin['slug']);
			$plugins[ $index ]['url'] = $plugin['wordpress_url'];

			if ( isset($plugin['constant_premium']) && defined($plugin['constant_premium']) ) {
				$plugins[ $index ]['action'] = 'installed';
			} else if ( !$installer->plugin_is_downloaded() && !$installer->plugin_is_activated() ) {
				$plugins[$index]['action'] = 'download';
			} else if ( $installer->plugin_is_downloaded() && !$installer->plugin_is_activated() ) {
				$plugins[ $index ]['action'] = 'activate';
			} else {
				//free is active, but not premium.
				$plugins[$index]['url'] = $plugin['upgrade_url'];
				if (isset($plugin['constant_premium']) ) {
					$plugins[$index]['action'] = 'upgrade-to-premium';
				} else {
					$plugins[ $index ]['action'] = 'installed';
				}
			}
		}
		return $plugins;
	}

	/**
	 * Get plugin data for other plugin section
	 *
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function other_plugins_data($request): WP_REST_Response {

		$plugins = $this->get_plugins_data();
		return $this->response([
			'plugins' => $plugins
		]);
	}

	/**
	 * Get the most popular service
	 *
	 * @return array
	 */
	private function get_most_popular_service(): array {
		if ( !$this->user_can_manage()) {
			return [];
		}

		$to = time();
		$one_month_ago = strtotime('-1 month', $to);
		$bookings = $this->api->get_bookings($one_month_ago, $to );

		$services = [];
		$service_names = [];
		foreach ( $bookings as $booking ){
			$service_id = $booking['service']['id'];
			$service_names[$service_id] = $booking['service']['name'];
			if (isset($services[$service_id])){
				$services[$service_id]++;
			}else{
				$services[$service_id] = 1;
			}
		}

		//sort services by bookings count
		arsort($services);
		$most_popular_service_id = key($services);
		$bookings_count = count($bookings);
		if ($bookings_count === 0 || $services[$most_popular_service_id] ===0 ){
			return [
				'name' => __("Most popular service", 'simplybook'),
				'percentage' => 0
			];
		}

		return [
			'name' => $service_names[$most_popular_service_id],
			'percentage' => round($services[$most_popular_service_id] / $bookings_count * 100, 0)
		];
	}

	/**
	 * Get the most popular provider.
	 *
	 * @return array
	 */
	private function get_most_popular_provider(): array {
		if ( !$this->user_can_manage()) {
			return [];
		}
		$to = time();
		$one_month_ago = strtotime('-1 month', $to);
		$bookings = $this->api->get_bookings($one_month_ago, $to );
		$providers = [];
		$provider_names = [];
		foreach ( $bookings as $booking ){
			$provider_id = $booking['provider']['id'];
			$provider_names[$provider_id] = $booking['provider']['name'];
			if (isset($providers[$provider_id])){
				$providers[$provider_id]++;
			}else{
				$providers[$provider_id] = 1;
			}
		}

		//sort providers by bookings count
		arsort($providers);
		$most_popular_provider_id = key($providers);
		$bookings_count = count($bookings);
		if ($bookings_count === 0 || $providers[$most_popular_provider_id] ===0 ){
			return [
				'name' => __("Most popular provider", 'simplybook'),
				'percentage' => 0
			];
		}

		return [
			'name' => $provider_names[$most_popular_provider_id],
			'percentage' => round($providers[$most_popular_provider_id] / $bookings_count * 100, 0)
		];
	}

	/**
	 * Get the bookings count for the last month.
	 *
	 * @param $request
	 *
	 * @return WP_REST_Response
	 */
	public function get_dashboard_data($request): WP_REST_Response {
		$to = time();
		$one_month_ago = strtotime('-1 month', $to);
		//get unix for last night 00:00
		$midnight_last_night = strtotime('midnight', strtotime('-1 day'));
		return $this->response([
			'bookings_count_month' => $this->api->get_bookings_count($one_month_ago, $to),
			'bookings_count_day' => $this->api->get_bookings_count($midnight_last_night, $to),
			'most_popular_provider' => $this->get_most_popular_provider(),
			'most_popular_service' => $this->get_most_popular_service(),
		]);
	}
}
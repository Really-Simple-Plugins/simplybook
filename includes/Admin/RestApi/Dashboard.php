<?php
namespace Simplybook\Admin\RestApi;

use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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






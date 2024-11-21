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

class Onboarding extends RestApi {
    use Helper;
    use Save;

    public function register_rest_route(): void
    {
        register_rest_route(
            'simplybook/v1',
            'onboarding/register_email',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'register_email' ),
                'permission_callback' => function ( $request ) {
	                return $this->validate_request( $request );
                },
            )
        );

        register_rest_route(
            'simplybook/v1',
            'onboarding/tipstricks',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'tipstricks' ),
                'permission_callback' => function ( $request ) {
                    return $this->validate_request( $request );
                },
            )
        );
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param [] $ajax_data
     * @return WP_REST_Response
     */
    public function register_email($request, $ajax_data = [] ): WP_REST_Response
    {
		$data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
		$data = $data['data'] ?? [];
	    $this->update_option('email', sanitize_email( $data['email'] ) );
	    $this->update_option('terms-and-conditions', (bool) $data['terms-and-conditions'] );

        return $this->response([
            'message' => __('Email registered successfully', 'simplybook'),
        ]);
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param array $ajax_data
     * @return WP_REST_Response
     */
    public function tipstricks($request, $ajax_data = [] ): WP_REST_Response
    {
	    $data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
	    $data = $data['data'] ?? [];
		error_log("tips tricks resposne");
		error_log(print_r($data, true));
		$tipstricks = (bool) ( $data['tipstricks'] );

        //de api registration
        $this->update_option('tipstricks', $tipstricks);

        return $this->response([
            'message' => __('Success', 'simplybook'),
        ]);
    }
}

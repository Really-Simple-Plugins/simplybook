<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Settings extends RestApi {
    use Helper;
    use Save;

    public function register_rest_route(): void
    {
        register_rest_route(
            'simplybook/v1',
            'save',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'save' ),
                'permission_callback' => function () {
                    return $this->user_can_manage();
                },
            )
        );

        register_rest_route(
            'simplybook/v1',
            'get',
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'get' ),
                'permission_callback' => function () {
                    return $this->user_can_manage();
                },
            )
        );
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param bool $ajax_data
     * @return WP_Error|WP_REST_Response
     */
    public function save($request, $ajax_data = false ): WP_Error|WP_REST_Response
    {
        $data = $ajax_data ?: $request->get_json_params();
        $email = sanitize_email( $data['email'] );

        $validated_response = $this->validate_request( $data );
        if ( is_wp_error( $validated_response ) ) {
            return $validated_response;
        }

        //de api registration
        $this->update_option('email', $email);

        return $this->response([
            'message' => __('Email registered successfully', 'simplybook'),
        ]);
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param bool $ajax_data
     * @return WP_Error|WP_REST_Response
     */
    public function get($request, $ajax_data = false ): WP_Error|WP_REST_Response
    {
        $data = $ajax_data ?: $request->get_json_params();
        $tipstricks = (bool) ( $data['tipstricks'] );

        $validated_response = $this->validate_request( $data );
        if ( is_wp_error( $validated_response ) ) {
            return $validated_response;
        }

        //de api registration
        $this->update_option('tipstricks', $tipstricks);

        return $this->response([
            'message' => __('Success', 'simplybook'),
        ]);
    }

}

<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use Simplybook\Traits\Load;
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
            'get_fields',
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
     * @param $ajax_data
     * @return WP_Error|WP_REST_Response
     */
    public function save($request, $ajax_data = false ): WP_Error|WP_REST_Response
    {
        $data = $ajax_data ?: $request->get_json_params();

        $validated_response = $this->validate_request( $data );
        if ( is_wp_error( $validated_response ) ) {
            return $validated_response;
        }

        if ( ! $this->user_can_manage() ) {
            return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', [ 'status' => 403 ] );
        }

        $data = $ajax_data ?: $request->get_json_params();
        if ( ! $ajax_data ) {
            //burst_remove_fallback_notice();
        }
        // get the nonce
        $nonce  = $data['nonce'];
        $fields = $data['fields'];

        if ( ! wp_verify_nonce( $nonce, 'simplybook_nonce' ) ) {
            return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', [ 'status' => 400 ] );
        }

        $this->update_options( $fields );

        $data = [
            'fields'          => $this->fields( true ),
        ];
        if ( ob_get_length() ) {
            ob_clean();
        }

        return $this->response( $data );
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param mixed $ajax_data
     * @return WP_Error|WP_REST_Response
     */
    public function get($request, $ajax_data = false ): WP_Error|WP_REST_Response
    {
        $data = $ajax_data ?: $request->get_json_params();

        $validated_response = $this->validate_request( $data );
        if ( is_wp_error( $validated_response ) ) {
            return $validated_response;
        }

        $fields = $this->fields();
        return $this->response([
            'fields' => $fields,
        ]);
    }

}

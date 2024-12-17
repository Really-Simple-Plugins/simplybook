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
            'simplybook/v1/settings',
            'save',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'save' ),
                'permission_callback' => function ( $request ) {
	                return $this->validate_request( $request );
                },
            )
        );

        register_rest_route(
            'simplybook/v1/settings',
            'get_fields',
            array(
                'methods' => 'POST',
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
     * Get the fields array
     *
     * @param $request
     * @param mixed $ajax_data
     * @return WP_REST_Response
     */
    public function get($request, $ajax_data = false ): WP_Error|WP_REST_Response
    {
		$this->log('get fields');
		error_log("get fields");

        $data = $ajax_data ?: $request->get_json_params();
	    $this->log($data);

		$with_values = $data['withValues'] === 1;
		$this->log('with_values');
		$this->log($data['withValues']);
        $fields = $this->fields($with_values);
		error_log(print_r($fields, true));
        return $this->response( $fields );
    }

}

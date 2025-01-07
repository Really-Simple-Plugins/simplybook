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
            'get',
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
		unset($data['nonce']);
        $fields = $data;

		if (count($fields) === 0) {
			return $this->response( ['error' => 'No data to save'] );
		}

		//check the data format. If it is [id => value], convert it to [ ['id' => 'the-id', 'value' => 'the-value'], ...]
	    if ( !isset($fields[0]['id']) ) {
		    //convert [id => value, format to [ ['id' => 'the-id', 'value' => 'the-value'], ...]
		    $fields = array_map(function($key, $value) {
			    return ['id' => $key, 'value' => $value];
		    }, array_keys($fields), $fields);
	    }

		//filter out all fields where the 'value' key is not set
        $fields = array_filter($fields, function($field) {
			return isset($field['value']);
		    }
		);

        $this->update_options( $fields );

        $data = [
            'data' => $this->fields( true, true ),
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
        $data = $ajax_data ?: $request->get_json_params();
	    $this->log($data);

		$with_values = $data['withValues'] === 1;
		$this->log('with_values');
		$this->log($data['withValues']);
        $fields = $this->fields($with_values);
        return $this->response( $fields );
    }

}

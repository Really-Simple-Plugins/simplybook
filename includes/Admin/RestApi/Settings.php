<?php
namespace Simplybook_old\Admin\RestApi;
use Simplybook_old\Traits\Helper;
use Simplybook_old\Traits\Save;
use Simplybook_old\Traits\Load;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * @deprecated 3.0.0 Use SettingEndpoints instead:
 * {@see \SimplyBook\App\Endpoints\SettingEndpoints}
 */
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
     * @return WP_REST_Response
     */
    public function save($request, $ajax_data = false ): WP_REST_Response
    {
	    $fields = $ajax_data ?: $request->get_json_params();
		unset($fields['nonce']);

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
        $fields = $this->fields( true );

        if ( ob_get_length() ) {
            ob_clean();
        }

        return $this->response( $fields );
    }

    /**
     * Get the fields array
     *
     * @param $request
     * @param mixed $ajax_data
     * @return WP_REST_Response
     */
    public function get($request, $ajax_data = false ): WP_REST_Response
    {
        $data = $ajax_data ?: $request->get_json_params();
		$with_values = (int) $data['withValues'] === 1;
        $fields = $this->fields($with_values);
	    if ( ob_get_length() ) {
		    ob_clean();
	    }
        return $this->response( $fields );
    }

}
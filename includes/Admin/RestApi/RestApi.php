<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use WP_REST_Request;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RestApi {
    use Helper;
	public $api = null;

    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_rest_route') );
		if ( ! $this->api ) {
			$this->api = new Api();
		}
    }

    /**
     * Validate a Rest Request
     *
     * @param $request WP_REST_Request
     *
     * @return bool
     */
    protected function validate_request( WP_REST_Request $request ): bool
    {
	    $data = $request->get_json_params();
		if ( !isset( $data['nonce']) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $data[ 'nonce' ] ) ), 'simplybook_nonce' ) ) {
			error_log("missing nonce");
		    return false;
	    }

        if ( ! $this->user_can_manage() ) {
           return false;
        }
        return true;
    }

    /**
     * Standardized response format
     * @param array $data - Data to return
     * @param string $status - If this action has completed successfully
     * @param string $message - Message to return
     * @param int $code - HTTP status code
     * @return WP_REST_Response
     */
	protected function response(array $data = [], string $status = 'success', string $message = '', int $code = 200): WP_REST_Response
	{
		if (ob_get_length()) {
			ob_clean();
		}

		return new WP_REST_Response(
			[
				'message' => $message,
				'status'  => $status ? 'success' : 'error',
				'data'    => $data,
				'request_success' => true, // can be used to check if the response in react actually contains this array.
			],
			$code
		);
	}
}

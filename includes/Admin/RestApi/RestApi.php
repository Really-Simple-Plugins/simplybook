<?php
namespace Simplybook\Admin\RestApi;
use Simplybook\Traits\Helper;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RestApi {
    use Helper;

    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_rest_route') );
    }

    /**
     * Validate a Rest Request
     * @param $data
     * @return bool|WP_Error
     */
    protected function validate_request($data ): bool|WP_Error
    {
        if ( ! $this->user_can_manage() ) {
            return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', [ 'status' => 403 ] );
        }

        if ( !isset( $data['nonce']) || ! wp_verify_nonce( $data['nonce'], 'simplybook_nonce' ) ) {
            return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', [ 'status' => 400 ] );
        }
        return true;
    }

    /**
     * Standardized response format
     * @param mixed $data - Data to return
     * @param string $status - Status of the response
     * @param int $code - HTTP status code
     * @return WP_REST_Response
     */
    protected function response(mixed $data, string $status = 'success', int $code = 200): WP_REST_Response
    {
        if ( ob_get_length() ) {
            ob_clean();
        }

        return new WP_REST_Response(
            [
                'status'  => $status,
                'data'    => $data,
            ],
            $code
        );
    }
}

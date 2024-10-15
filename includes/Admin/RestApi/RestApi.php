<?php
namespace Simplybook\Admin\RestApi;

use Simplybook\Traits\Admin\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class RestApi {
    use Helper;

    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_rest_route') );
    }

    public function register_rest_route(): void
    {
        register_rest_route(
            'simplybook/v1',
            'menu',
            array(
                'methods' => 'GET',
                'callback' => array( $this, 'menu' ),
                'permission_callback' => function () {
                    return $this->user_can_manage();
                },
            )
        );
    }
}

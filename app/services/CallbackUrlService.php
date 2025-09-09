<?php
namespace SimplyBook\Services;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use SimplyBook\Traits\HasAllowlistControl;

class CallbackUrlService
{
    use HasAllowlistControl;

    /**
     * Get the temporary callback URL. Return empty string if the URL is expired
     *
     * @return string
     */
    public function get_callback_url(): string {
        $callback_url = get_option('simplybook_callback_url', '' );
        $expires = get_option('simplybook_callback_url_expires' );
        if ( $expires > time() ) {
            return $callback_url;
        }

        //expired URL
        delete_option('simplybook_callback_url');
        return '';
    }

    public function cleanup_callback_url() {
        delete_option('simplybook_callback_url' );
        delete_option('simplybook_callback_url_expires' );
    }
}
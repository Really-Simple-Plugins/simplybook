<?php
namespace Simplybook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 *
 * @since   3.0
 *
 */
trait Helper {
    /**
     * Check manage capability
     *
     * @return bool
     */
    public function user_can_manage(): bool {
        if ( defined( 'WP_CLI' ) && WP_CLI ){
            return true;
        }
        return current_user_can( 'simplybook_manage' );
    }

    /**
     * Check if this is an authenticated rest request
     *
     * @return bool
     */
    public function is_logged_in_rest(): bool
    {
        $is_settings_page_request = isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/simplybook/v1/' ) !== false;
        if ( ! $is_settings_page_request ) {
            return false;
        }

        return current_user_can( 'simplybook_manage' );
    }

    /**
     * Get the admin url
     *
     * @return string
     */
    public function admin_url(): string {
        return admin_url( 'admin.php?page=simplybook' );
    }

    /**
     * Log a message if WP_DEBUG is enabled
     *
     * @param string $message
     *
     * @return void
     */
    public function log( string $message ): void {
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
            error_log( "Simplybook: ".$message );
        }
    }

}

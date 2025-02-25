<?php
/**
 * @package SimplyBook global functions
 * @internal Add all used global functions here but refactor those to use
 * new or existing traits so we can remove this file prior to release.
 */

if ( ! function_exists( 'simplybook_has_admin_access' ) ) {
    /**
     * Check if current request is authenticated, which is in case:
     * - user is logged in and has manage_options capability
     * - this is a REST API request and user is logged in
     * - this is a WPCLI request
     * - this is a cron request
     *
     * This ensures that auto updates can run, and cron jobs can complete.
     *
     * @deprecated Use HasAllowlistControl::adminAccessAllowed() instead
     * @return bool
     */
    function simplybook_has_admin_access(): bool
    {
        //during activation, we need to allow access
        if ( get_option('simplybook_run_activation') ) {
            return true;
        }
        $wpcli = defined( 'WP_CLI' ) && WP_CLI;
        return ( is_admin() && current_user_can('simplybook_manage') )
            || simplybook_is_logged_in_rest() || wp_doing_cron() || $wpcli;
    }
}

if ( ! function_exists( 'simplybook_is_logged_in_rest' ) ) {
    /**
     * Check if current request is authenticated, for a REST API request
     *
     * @deprecated Use HasAllowlistControl::restRequestIsAllowed() instead
     * @return bool
     */
    function simplybook_is_logged_in_rest(): bool
    {
        $valid_request = isset( $_SERVER['REQUEST_URI'] ) && str_contains($_SERVER['REQUEST_URI'], '/simplybook/v');
        if ( ! $valid_request ) {
            return false;
        }

        //if and the callback url is still active, we need to allow access so the simplybook callback can execute
        $expires = get_option('simplybook_callback_url_expires' );
        $callback_url = get_option('simplybook_callback_url', '' );
        if ( $expires > time() && !empty( $callback_url ) && strpos( $_SERVER['REQUEST_URI'], 'company_registration/'.$callback_url ) !== false ) {
            return true;
        }

        return is_user_logged_in() && current_user_can('simplybook_manage');
    }
}
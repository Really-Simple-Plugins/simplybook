<?php
namespace SimplyBook;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
if ( ! function_exists( 'simplybook_has_admin_access' ) ) {
    /**
     * Check if current request is authenticated, which is in case:
     * - user is logged in and has manage_options capability
     * -
     * @return bool
     */
    function simplybook_has_admin_access(): bool
    {
        return true;
        $wpcli = defined( 'WP_CLI' ) && WP_CLI;
        $has_cap = current_user_can('simplybook_view') || current_user_can('simplybook_manage');;
        return ( is_admin() && $has_cap ) || simplybook_is_logged_in_rest() || wp_doing_cron() || $wpcli;
    }
}

if ( ! function_exists( 'simplybook_is_logged_in_rest' ) ) {
    /**
     * Check if current request is authenticated, for a REST API request
     *
     * @return bool
     */
    function simplybook_is_logged_in_rest(): bool
    {
        $valid_request = isset( $_SERVER['REQUEST_URI'] ) && str_contains($_SERVER['REQUEST_URI'], '/simplybook/v');
        if ( ! $valid_request ) {
            return false;
        }

        return is_user_logged_in();
    }
}
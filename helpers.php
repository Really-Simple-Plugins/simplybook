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
        if ( get_option('simplybook_activating_flag') ) {
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

if (!function_exists('simplybookMePl_getAllowedHtmlEntities')) {
    function simplybookMePl_getAllowedHtmlEntities() {
        $allowedEnt = array(
            'a'=>array('href'=>array(),'title'=>array(),'target'=>array(), 'role'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'script'=>array('src'=>array(),'type'=>array(),),
            'br'=>array(),'em'=>array(),'strong'=>array(),'p'=>array(),'b'=>array(),'div'=>array(),
            'label'=>array('for'=>array(),),'select'=>array('name'=>array(),'value'=>array(),),
            'option'=>array('value'=>array(),'selected'=>array(),),
            'input'=>array('type'=>array(),'name'=>array(),'value'=>array(),'checked'=>array(),'placeholder'=>array(),'required'=>array(),),
            'form'=>array('action'=>array(),'method'=>array(),'enctype'=>array(),'name'=>array(),),
            'button'=>array('type'=>array(),'name'=>array(),'value'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'span'=>array('type'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'h1'=>array(),'h2'=>array(),'h3'=>array(),'h4'=>array(),'h5'=>array(),'h6'=>array(),
            'img'=>array('src'=>array(),'alt'=>array(),'title'=>array(),),'ul'=>array(),'li'=>array(),
            'ol'=>array(),'table'=>array(),'tr'=>array(),'td'=>array(),'th'=>array(),'tbody'=>array(),
            'thead'=>array(),'tfoot'=>array(),
            'iframe'=>array('src'=>array(), 'data-src'=>array(),'scrolling'=>array(),'width'=>array(),'height'=>array(),'name'=>array(),'action'=>array(),'frameborder'=>array(),'allowfullscreen'=>array(),),
            'picture'=>array(),
            'textarea'=>array('name'=>array(),'value'=>array(),'placeholder'=>array(),'required'=>array(),),
            'section'=>array(),
            'article'=>array(),
            'main'=>array(),
            'header'=>array(),
            'footer'=>array(),
            'i'=>array(),
            'svg'=>array('xmlns'=>array(), 'viewBox'=>array(), 'data-viewbox'=>array(),),
            'path'=>array('fill'=>array(), 'd'=>array(),),
        );

        foreach ($allowedEnt as $key => $value){
            $allowedEnt[$key] = array_merge($value, array(
                'style' => array(),
                'class' => array(),
                'id' => array(),
                'scope' => array(),
                'data-*' => array(),
                'title' => array(),
                'data' => array(),
                'data-mce-id' => array(),
                'data-mce-style' => array(),
                'data-mce-bogus' => array(),
            ));
        }

        return $allowedEnt;
    }
}

if (!function_exists('simplybook_is_wp_json_request')) {
    /**
     * Check if the current request is a WP JSON request. This is better than
     * the WordPress native function `wp_is_json_request()`, because that
     * returns false when visiting /wp-json/ endpoint. We need a true value
     * there to activate features that register REST routes. For example
     * {@see \SimplyBook\Features\Onboarding\OnboardingController}
     */
    function simplybook_is_wp_json_request(): bool {
        $restUrlPrefix = trailingslashit(rest_get_url_prefix());
        $currentRequestUri = ($_SERVER['REQUEST_URI'] ?? '');
        return (strpos($currentRequestUri, $restUrlPrefix) !== false);
    }
}
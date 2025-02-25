<?php
namespace Simplybook_old\Admin\Capability;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Capability {
    public function __construct() {
        add_action( 'wp_initialize_site', array( $this, 'add_role_to_subsite'), 10, 1 );
    }

    /**
     * Add a user capability to WordPress and add to admin and editor role
     * @param string $capability
     * @param bool $handle_subsites
     */
    public static function add_capability( string $capability, bool $handle_subsites = true ): void
    {
        $roles      = apply_filters( 'simplybook_add_manage_capability', [ 'administrator' ] );
        foreach ( $roles as $role ) {
            $role = get_role( $role );
            if ( $role && ! $role->has_cap( $capability ) ) {
                $role->add_cap( $capability );
            }
        }

        // we need to add this role across subsites as well.
        if ( $handle_subsites && is_multisite() ) {
            $sites = get_sites();
            if ( count( $sites ) > 0 ) {
                foreach ( $sites as $site ) {
                    switch_to_blog( $site->blog_id );
                    self::add_capability( $capability, false );
                    restore_current_blog();
                }
            }
        }
    }

    /**
     * When a new site is added, add our capability
     *
     * @param $site
     *
     * @return void
     */
    public function add_role_to_subsite( $site ): void
    {
        switch_to_blog( $site->blog_id );
        $this->add_capability( 'simplybook_manage', false );
        restore_current_blog();
    }


}
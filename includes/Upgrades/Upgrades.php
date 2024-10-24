<?php
namespace Simplybook\Upgrades;

use Simplybook\Admin\Capability\Capability;
use Simplybook\Traits\Save;
use function Simplybook\simplybook_has_admin_access;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Upgrades {
    use Save;
    public function __construct() {
        add_action( 'plugins_loaded' , [ $this, 'check_for_upgrades' ] );
    }

    /**
     * Handle all upgrades required for the next version
     *
     * @return void
     */

    public function check_for_upgrades(): void
    {
        #only run upgrade check if cron, or if admin.
        if ( ! simplybook_has_admin_access() ) {
            return;
        }

//        $authData = [
//            "token" => "46f4518a0599a7aed9b98fba6ad7802611d544f1dd4d0b13b61ae61765ff9816",
//            "company" => "rsptest1",
//            "refresh_token" => "ea2c27ee61f123082acd52d06d022e60d003aefbf8d2f5870088f4d1d941c08a",
//            "domain" => "simplybook.me",
//            "login" => "rogier@really-simple-ssl.com",
//            "require2fa" => null,
//            "allowed2fa_providers" => [],
//            "auth_session_id" => null,
//            "id" => null,
//            "is_refreshed" => 1,
//            "refresh_time" => 1729756105
//        ];
//
//        $this->update_option('auth_data', $authData);
//        $this->update_option('auth_datetime', time());
//        $this->update_option('is_auth', true);

        $prev_version = get_option( 'simplybook_current_version', false );

        //no version change, skip upgrade.
        if ( $prev_version && version_compare( $prev_version, SIMPLYBOOK_VERSION, '==' ) ) {
            return;
        }

        if ( $prev_version && version_compare( $prev_version, '3.0', '<' ) ) {
            Capability::add_capability('simplybook_manage');
            $this->upgrade_options();
        }

        update_option( 'simplybook_current_version', SIMPLYBOOK_VERSION, false );
    }

}

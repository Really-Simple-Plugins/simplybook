<?php
namespace Simplybook\Upgrades;

use Simplybook\Admin\Capability\Capability;
use function Simplybook\simplybook_has_admin_access;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Upgrades {

    public function __construct() {
        add_action( 'plugins_loaded' , [ $this, 'check_for_upgrades' ] );
    }

    public function check_for_upgrades(): void
    {
        #only run upgrade check if cron, or if admin.
        if ( ! simplybook_has_admin_access() ) {
            return;
        }

        $prev_version = get_option( 'simplybook_current_version', false );

        //no version change, skip upgrade.
        if ( $prev_version && version_compare( $prev_version, SIMPLYBOOK_VERSION, '==' ) ) {
            return;
        }

        if ( $prev_version && version_compare( $prev_version, '3.0', '<' ) ) {
            Capability::add_capability('simplybook_manage');
        }

        update_option( 'simplybook_current_version', SIMPLYBOOK_VERSION, false );
    }

}

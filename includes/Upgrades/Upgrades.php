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

//        $this->update_option('auth_datetime', time());
//        $this->update_option('is_auth', true);
//
//
//        $data = [
//            "token" => "a02a894305827078fa2bf9311c1de206a8d32299942fed322bab4c29c77fa536",
//            "company" => "rsptest1",
//            "refresh_token" => "694a034a57b0b6b4866db35b592bf7003173252afb5dc454044cb4af15e6a303",
//            "domain" => "simplybook.me",
//            "login" => "rogier@really-simple-ssl.com",
//            "require2fa" => null,
//            "allowed2fa_providers" => [],
//            "auth_session_id" => null,
//            "id" => null,
//            "is_refreshed" => 1,
//            "refresh_time" => time(),
//            "template" => "default",
//            "server" => "rsptest1.simplybook.it",
//            "timeline_type" => "modern",
//            "datepicker_type" => "top_calendar",
//            "is_rtl" => null,
//            "allow_switch_to_ada" => null,
//            "clear_session" => null,
//            "timeline_modern_display" => "as_slots",
//            "display_item_mode" => "block",
//            "booking_nav_bg_color" => "#DD3649",
//            "body_bg_color" => "#F2F2F2",
//            "dark_font_color" => "#474747",
//            "light_font_color" => "#F5FCFF",
//            "btn_color_1" => "#DD3649",
//            "sb_company_label_color" => "#FFFFFF",
//            "sb_busy" => "#c7b3b3",
//            "sb_available" => "#D6EBFF",
//            "sb_base_color" => "#DD3649",
//            "timeline_show_end_time" => 0,
//            "timeline_hide_unavailable" => 1,
//            "hide_past_days" => 0,
//            "hide_img_mode" => 1,
//            "show_sidebar" => 1,
//            "predefined" => [
//                "provider" => null,
//                "service" => null
//            ]
//        ];
//        $this->upgrade_options_testing( $data );
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

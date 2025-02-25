<?php
namespace Simplybook_old\Frontend\Shortcodes;
use Simplybook_old\Frontend\Traits\Widget;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Shortcodes {
    use Widget;

    public function __construct() {

        add_shortcode( 'simplybook_widget', array( $this, 'calendar_widget' ) );
        add_shortcode( 'simplybook_reviews', array( $this, 'reviews_widget' ) );
        add_shortcode( 'simplybook_booking_button', array( $this, 'booking_button' ) );
    }

}
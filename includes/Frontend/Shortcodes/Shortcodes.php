<?php
namespace Simplybook\Frontend\Shortcodes;
use Simplybook\Frontend\Traits\Frontend;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Shortcodes {
    use Frontend;

    public function __construct() {
        add_shortcode( 'simplybook_widget', array( $this, 'load_widget' ) );
    }

}

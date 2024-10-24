<?php
namespace Simplybook\Frontend\Shortcodes;
use Simplybook\Frontend\Traits\Widget;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Shortcodes {
    use Widget;

    public function __construct() {

        add_shortcode( 'simplybook_widget', array( $this, 'load_widget' ) );
    }

}

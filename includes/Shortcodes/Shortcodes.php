<?php
namespace Simplybook\Shortcodes;

use Simplybook\Traits\Admin\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Shortcodes {
    use Helper;

    public function __construct() {
        add_shortcode( 'cmplz-document', array( $this, 'load_document' ) );

    }


}

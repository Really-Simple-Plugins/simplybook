<?php
namespace Simplybook_old\Frontend;
use Simplybook_old\Frontend\Blocks\Blocks;
use Simplybook_old\Frontend\Shortcodes\Shortcodes;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Frontend {
    protected array $cache = array();

    public function __construct() {
        ( new Blocks() );
        ( new Shortcodes() );
    }

}
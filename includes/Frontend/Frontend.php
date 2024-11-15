<?php
namespace Simplybook\Frontend;
use Simplybook\Api\Api;
use Simplybook\Frontend\Blocks\Blocks;
use Simplybook\Frontend\Shortcodes\Shortcodes;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Frontend {
    protected array $cache = array();

    public function __construct() {
        ( new Blocks() );
        ( new Shortcodes() );
        ( new API() );
    }

}

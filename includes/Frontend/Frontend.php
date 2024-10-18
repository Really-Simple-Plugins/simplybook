<?php
namespace Simplybook\Frontend;
use Simplybook\Frontend\Blocks\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Frontend {
    protected array $cache = array();

    public function __construct() {
        //( new Blocks() );
    }

}

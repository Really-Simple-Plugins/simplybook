<?php
namespace Simplybook\Frontend;
use Simplybook\Blocks\Blocks;
use Simplybook\Traits\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Frontend {
    use Helper;
    protected array $cache = array();

    public function __construct() {
        ( new Blocks() );
    }

}

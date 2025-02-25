<?php
namespace SimplyBook\App;

use Simplybook_old\Frontend\Blocks\Blocks;
use SimplyBook\Interfaces\ControllerInterface;
use Simplybook_old\Frontend\Shortcodes\Shortcodes;

class FrontendController implements ControllerInterface
{
    public function register()
    {
        ( new Blocks() );
        ( new Shortcodes() );
    }
}
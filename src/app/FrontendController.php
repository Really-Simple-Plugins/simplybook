<?php
namespace SimplyBook\App;

use Simplybook_old\Frontend\Frontend;
use SimplyBook\Interfaces\ControllerInterface;

class FrontendController implements ControllerInterface
{
    public function register()
    {
        ( new Frontend() );
    }
}
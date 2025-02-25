<?php
namespace Simplybook\App;

use Simplybook_old\Frontend\Frontend;
use Simplybook\Traits\HasAllowlistControl;
use Simplybook\Interfaces\ControllerInterface;

class FrontendController implements ControllerInterface
{
    public function register()
    {
        ( new Frontend() );
    }
}
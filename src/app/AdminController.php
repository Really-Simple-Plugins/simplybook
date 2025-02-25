<?php
namespace Simplybook\App;

use Simplybook_old\Admin\Admin;
use Simplybook_old\Frontend\Frontend;
use Simplybook\Traits\HasAllowlistControl;
use Simplybook\Interfaces\ControllerInterface;

class AdminController implements ControllerInterface
{
    use HasAllowlistControl;

    public function register()
    {
        if ($this->adminAccessAllowed()) {
            ( new Admin() );
        }
        ( new Frontend() );
    }

    public function addAdminMenu()
    {
//        add_menu_page(
//            'Really Simple Plugin',
//            'Really Simple Plugin',
//            'manage_options',
//            'really-simple-plugin',
//            [$this, 'renderAdminPage'],
//            'dashicons-admin-generic',
//            100
//        );
    }

    public function renderAdminPage()
    {
//        echo '<div class="wrap">';
//        echo '<h1>Really Simple Plugin</h1>';
//        echo '<p>This is a VERY basic example. Implement your React app here.</p>';
//        echo '</div>';
    }
}
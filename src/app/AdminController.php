<?php
namespace Simplybook\App;

use Simplybook\Interfaces\ControllerInterface;

class AdminController implements ControllerInterface
{
    public function register()
    {
        add_action('admin_menu', [$this, 'addAdminMenu']);
    }

    public function addAdminMenu()
    {
        add_menu_page(
            'Really Simple Plugin',
            'Really Simple Plugin',
            'manage_options',
            'really-simple-plugin',
            [$this, 'renderAdminPage'],
            'dashicons-admin-generic',
            100
        );
    }

    public function renderAdminPage()
    {
        echo '<div class="wrap">';
        echo '<h1>Really Simple Plugin</h1>';
        echo '<p>This is a VERY basic example. Implement your React app here.</p>';
        echo '</div>';
    }
}
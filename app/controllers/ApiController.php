<?php
namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Interfaces\ControllerInterface;

/**
 * todo
 * Does this still need a refactor? Its not really a literal ApiController s
 * maybe a rename is all that is needed
 */
class ApiController implements ControllerInterface
{
    public function register()
    {
        add_action('admin_init', [$this, 'maybeResetRegistration']);
    }

    public function maybeResetRegistration(): void
    {
        if (App::provide('request')->getString('reset_registration', 'false') !== 'true') {
            return;
        }

        App::provide('client')->reset_registration();
    }
}
<?php
namespace SimplyBook\App;

use SimplyBook\App;
use Simplybook_old\Api\Api;
use SimplyBook\Interfaces\ControllerInterface;

/**
 * todo
 * Is this a ApiFeature? Where we can add the Api class as a ApiService
 * dependency via the constructor?
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

        $api = new Api();
        $api->reset_registration();
    }
}
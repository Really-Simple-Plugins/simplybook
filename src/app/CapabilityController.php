<?php
namespace SimplyBook\App;

use SimplyBook\Interfaces\ControllerInterface;
use Simplybook_old\Admin\Capability\Capability;

class CapabilityController implements ControllerInterface
{
    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
    }

    public function handlePluginActivation()
    {
        Capability::add_capability('simplybook_manage');
    }
}
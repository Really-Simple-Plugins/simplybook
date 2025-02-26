<?php
namespace SimplyBook\App;

use SimplyBook\Interfaces\ControllerInterface;
use Simplybook_old\Admin\Capability\Capability;

class CapabilityController implements ControllerInterface
{
    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
        add_action('simplybook_plugin_version_upgrade', [$this, 'handlePluginUpgrade'], 10, 2);
    }

    public function handlePluginActivation(): void
    {
        Capability::add_capability('simplybook_manage');
    }

    /**
     * Handle plugin upgrades
     */
    public function handlePluginUpgrade(string $previousVersion, string $newVersion): void
    {
        // If someone upgrades from legacy version we need to add the capability
        if ($previousVersion && version_compare($previousVersion, '3.0', '<')) {
            Capability::add_capability('simplybook_manage');
        }
    }
}
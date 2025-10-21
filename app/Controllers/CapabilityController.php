<?php
namespace SimplyBook\Controllers;

use SimplyBook\Services\CapabilityService;
use SimplyBook\Interfaces\ControllerInterface;

class CapabilityController implements ControllerInterface
{
    private CapabilityService $service;

    public function __construct(CapabilityService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
        add_action('simplybook_plugin_version_upgrade', [$this, 'handlePluginUpgrade'], 10, 2);
        add_action('wp_initialize_site', [$this, 'addCapabilityToNewSubsite'], 10, 2);
    }

    public function handlePluginActivation(): void
    {
        $this->service->addSiteCapability('simplybook_manage');
    }

    /**
     * Handle plugin upgrades
     */
    public function handlePluginUpgrade(string $previousVersion, string $newVersion): void
    {
        // If someone upgrades from legacy version we need to add the capability
        if ($previousVersion && version_compare($previousVersion, '3.0', '<')) {
            $this->service->addSiteCapability('simplybook_manage');
        }
    }

    /**
     * When a new site is added, add our custom capability
     */
    public function addCapabilityToNewSubsite(\WP_Site $newSite, array $args): void
    {
        switch_to_blog($newSite->blog_id);
        $this->service->addSiteCapability('simplybook_manage', false);
        restore_current_blog();
    }
}
<?php namespace SimplyBook\App\Services;

class CapabilityService
{
    protected array $manageableRoles = [
        'administrator'
    ];

    /**
     * Add a user capability to WordPress and add to administrator role
     * @uses apply_filters simplybook_add_manage_capability
     */
    public function addCapability(string $capability, bool $handleSubsites = true): void
    {
        /**
         * Filter: simplybook_add_manage_capability
         * @param array $roles
         * @return array
         */
        $roles = apply_filters('simplybook_add_manage_capability', $this->manageableRoles);

        foreach ($roles as $roleName) {
            $role = get_role($roleName);
            if ($role && !$role->has_cap($capability)) {
                $role->add_cap($capability);
            }
        }

        if ($handleSubsites && is_multisite()) {
            $this->addCapabilityToSubsites($capability);
        }
    }

    /**
     * Recursively add a capability to all subsites
     */
    private function addCapabilityToSubsites(string $capability): void
    {
        $sites = get_sites();
        foreach ($sites as $site) {
            switch_to_blog($site->blog_id);
            $this->addCapability($capability, false);
            restore_current_blog();
        }
    }
}
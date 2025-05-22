<?php namespace SimplyBook\Services;

class CapabilityService
{
    /**
     * The default WordPress roles that are suitable for the custom
     * SimplyBook.me capabilities.
     */
    protected array $defaultCapabilityRoles = [
        'administrator'
    ];

    /**
     * Add a user capability to WordPress and add to administrator role
     * @uses apply_filters simplybook_add_manage_capability
     */
    public function addSiteCapability(string $capability, bool $handleSubsites = true, array $roles = []): void
    {
        $rolesToAddCapabilityTo = ($roles ?: $this->defaultCapabilityRoles);

        /**
         * Filter: simplybook_suitable_custom_capability_roles
         * @param array $rolesToAddCapabilityTo
         * @return array
         */
        $rolesToAddCapabilityTo = apply_filters('simplybook_suitable_custom_capability_roles', $rolesToAddCapabilityTo);

        foreach ($rolesToAddCapabilityTo as $roleName) {
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
            $this->addSiteCapability($capability, false);
            restore_current_blog();
        }
    }
}
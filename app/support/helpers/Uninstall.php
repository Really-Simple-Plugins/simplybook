<?php namespace SimplyBook\Helpers;

use SimplyBook\Traits\LegacySave;

class Uninstall
{
    use LegacySave;

    /**
     * Handle plugin uninstallation.
     * @internal Method is currently hooked as the uninstallation callback
     * {@see \SimplyBook\Plugin::boot}
     */
    public function handlePluginUninstall(): void
    {
        $instance = new self();
        if (method_exists($instance, 'delete_all_options')) {
            $instance->delete_all_options(true);
        }
    }

}
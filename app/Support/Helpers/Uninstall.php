<?php

namespace SimplyBook\Support\Helpers;

use SimplyBook\Traits\LegacySave;

class Uninstall
{
    use LegacySave;

    /**
     * Handle plugin uninstallation.
     * @internal Method is currently hooked as the uninstallation callback
     * {@see \SimplyBook\Bootstrap\Plugin::boot}
     */
    public function handlePluginUninstall(): void
    {
        $instance = new self();

        /** @phpstan-ignore-next-line Extra failsafe is needed because class is loaded in uninstall context */
        if (method_exists($instance, 'delete_all_options')) {
            $instance->delete_all_options(true);
        }
    }
}

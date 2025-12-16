<?php

declare(strict_types=1);

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class UpgradeController implements ControllerInterface
{
    private const LEGACY_VERSION = '2.3';

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    public function register(): void
    {
        add_action('simplybook_controllers_loaded', [$this, 'checkForUpgrades']);
    }

    /**
     * Fire an action when the plugin is upgraded from one version to another.
     *
     * @internal Note the starting underscore in the option name. This is to
     * prevent the option from being deleted when a user logs out. As if
     * it is a private SimplyBook option.
     *
     * @hooked simplybook_controllers_loaded to make sure Controllers can hook
     * into simplybook_plugin_version_upgrade. Even this one.
     *
     * @uses do_action simplybook_plugin_version_upgrade
     */
    public function checkForUpgrades(): void
    {
        $previousSavedVersion = (string) get_option('_simplybook_current_version', '');
        if ($previousSavedVersion === $this->env->getString('plugin.version')) {
            return; // Nothing to do
        }

        // This could be one if-statement, but this makes it readable that we
        // do not query the database if we do not need to.
        if (empty($previousSavedVersion)) {
            if ($this->isUpgradeFromLegacy()) {
                $previousSavedVersion = self::LEGACY_VERSION;
            }
        }

        // Trigger upgrade hook if we are upgrading from a previous version.
        // Action can be used by Controllers to hook into the upgrade process
        if (!empty($previousSavedVersion)) {
            do_action('simplybook_plugin_version_upgrade', $previousSavedVersion, $this->env->getString('plugin.version'));
        }

        // Also makes sure $previousSavedVersion will only be empty one time
        update_option('_simplybook_current_version', $this->env->getString('plugin.version'), false);
    }

    /**
     * Check if the plugin is being upgraded from a legacy version.
     * @internal Ideally this method should be removed in the future.
     * @since 3.0.0
     */
    private function isUpgradeFromLegacy(): bool
    {
        $cacheName = 'simplybook_was_legacy_plugin_active';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found) {
            return (bool) $cacheValue;
        }

        global $wpdb;

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
        $count = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->options} WHERE option_name LIKE %s",
                'simplybookMePl_%'
            )
        );

        wp_cache_set($cacheName, ($count > 0), 'simplybook', DAY_IN_SECONDS);
        return $count > 0;
    }
}

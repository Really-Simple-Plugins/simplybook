<?php

declare(strict_types=1);

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class UpgradeController implements ControllerInterface
{
    /**
     * The last version of the legacy plugin that did never safe the
     * _simplybook_current_version option.
     *
     * @since 3.0.0
     * @var string
     */
    private const LEGACY_VERSION = '2.3';

    /**
     * First version that did not save itself in _simplybook_current_version.
     * From 3.2.4 to 3.4.0 this controller was not registered in
     * {@see \SimplyBook\Bootstrap\Plugin}.
     *
     * @since 3.5.0
     * @var string
     */
    private const FIRST_UNSAVED_VERSION = '3.2.4';

    private EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    public function register(): void
    {
        add_action('simplybook_plugin_controllers_loaded', [$this, 'checkForUpgrades']);
    }

    /**
     * Fire an action when the plugin is upgraded from one version to another.
     *
     * @internal Note the starting underscore in the option name. This is to
     * prevent the option from being deleted when a user logs out. As if
     * it is a private SimplyBook option.
     *
     * @hooked simplybook_plugin_controllers_loaded to make sure Controllers
     * can hook into simplybook_plugin_version_upgrade. Even this one.
     *
     * @uses do_action simplybook_plugin_version_upgrade
     */
    public function checkForUpgrades(): void
    {
        $previousVersion = (string) get_option('_simplybook_current_version', '');
        if ($previousVersion === $this->env->getString('plugin.version')) {
            return; // Nothing to do
        }

        if (empty($previousVersion)) {
            $previousVersion = $this->getUnsavedVersion();
        }

        // Trigger upgrade hook if we are upgrading from a previous version.
        // Action can be used by Controllers to hook into the upgrade process
        if (!empty($previousVersion)) {
            do_action('simplybook_plugin_version_upgrade', $previousVersion, $this->env->getString('plugin.version'));
        }

        // Also makes sure $previousSavedVersion will only be empty one time
        update_option('_simplybook_current_version', $this->env->getString('plugin.version'), false);
    }

    /**
     * Method detects if the current upgrade is either from the legacy plugin,
     * a new install and if neither; the {@see FIRST_UNSAVED_VERSION} is used
     * to make sure migrations run for users who started using between version
     * 3.2.4 and 3.4.0.
     *
     * @since 3.5.0
     */
    private function getUnsavedVersion(): string
    {
        if ($this->isUpgradeFromLegacy()) {
            return self::LEGACY_VERSION;
        }

        if ($this->isNewInstall()) {
            return '';
        }

        return self::FIRST_UNSAVED_VERSION;
    }

    /**
     * The activation flag is set by
     * {@see \SimplyBook\Bootstrap\Plugin::activation} and removed on
     * admin_init. This controller saves the version before admin_init. So
     * when the flag exists, the plugin was not used before.
     * @since 3.5.0
     */
    private function isNewInstall(): bool
    {
        return get_option('simplybook_activation_flag', false) !== false;
    }

    /**
     * Check if the plugin is being upgraded from a legacy version.
     * @internal Ideally this method should be removed in the future.
     * @since 3.0.0
     */
    private function isUpgradeFromLegacy(): bool
    {
        $found = false;
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

<?php
namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Interfaces\ControllerInterface;

class SettingsController implements ControllerInterface
{
    // todo
    use LegacySave;

    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
        add_action('simplybook_plugin_version_upgrade', [$this, 'handlePluginUpgrade'], 10, 2);
    }

    /**
     * Handle plugin activation
     */
    public function handlePluginActivation(): void
    {
        $this->setupDefaults();
    }

    /**
     * Handle plugin upgrades
     */
    public function handlePluginUpgrade(string $previousVersion, string $newVersion): void
    {
        // If someone upgrades from legacy version we need to upgrade the
        // existing options
        if ($previousVersion && version_compare($previousVersion, '3.0', '<')) {
            $this->upgrade_legacy_options();
        }
    }

    /**
     * Set up some defaults
     * User does not have the capability yet, so bypass the default update_option method.
     */
    private function setupDefaults(): void
    {
        $user = wp_get_current_user();
        $options = get_option('simplybook_options', []);
        if ( empty($this->get_option('email') ) ) {
            $options['email'] = sanitize_email( $user->user_email );
        }
        if ( empty($this->get_option('company_name') ) ) {
            $options['company_name'] = get_bloginfo( 'name' );
        }
        if ( empty($this->get_option('country')) && !empty($this->getCountryByLocale()) ) {
            $options['country'] = $this->getCountryByLocale();
        }
        update_option('simplybook_options', $options);
    }

    /**
     * Get the country based on the locale
     * @todo - add to a trait?
     */
    private function getCountryByLocale(): string
    {
        $locale = get_locale();
        $locale = explode('_', $locale);

        if ( count($locale) < 2 ) {
            return '';
        }

        return strtoupper( $locale[1] );
    }
}
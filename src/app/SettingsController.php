<?php
namespace SimplyBook\App;

use Simplybook_old\Traits\Load;
use SimplyBook\Interfaces\ControllerInterface;

class SettingsController implements ControllerInterface
{
    use Load;

    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
    }

    /**
     * Handle plugin activation
     */
    public function handlePluginActivation(): void
    {
        $this->setupDefaults();
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
        if ( empty($this->get_option('country') ) ) {
            $options['country'] = $this->getCountryByLocale();
        }
        if ( empty($this->get_option('palette') ) ) {
            $options['palette'] = 'custom';
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
        return strtoupper( $locale[1] );
    }
}
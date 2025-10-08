<?php
namespace SimplyBook;

use SimplyBook\Managers\FeatureManager;
use SimplyBook\Managers\ProviderManager;
use SimplyBook\Managers\EndpointManager;
use SimplyBook\Managers\ControllerManager;

class Plugin
{
    private FeatureManager $featureManager;
    private ProviderManager $providerManager;
    private EndpointManager $endpointManager;
    private ControllerManager $controllerManager;

    /**
     * Plugin constructor
     */
    public function __construct()
    {
        $this->featureManager = new FeatureManager();
        $this->providerManager = new ProviderManager();
        $this->controllerManager = new ControllerManager();
        $this->endpointManager = new EndpointManager();
    }

    /**
     * Boot the plugin
     */
    public function boot()
    {
        register_activation_hook(App::env('plugin.base_file'), [$this, 'activation']);
        register_deactivation_hook(App::env('plugin.base_file'), [$this, 'deactivation']);
        register_uninstall_hook(App::env('plugin.base_file'), 'SimplyBook\Plugin::uninstall');

        $this->registerConstants();
        $this->registerEnvironment();

        add_action('plugins_loaded', [$this, 'loadPluginTextDomain']);
        add_action('plugins_loaded', [$this, 'registerProviders']); // Provide functionality to the plugin
        add_action('simplybook_providers_loaded', [$this, 'registerFeatures']); // Makes sure features exist when Controllers need them
        add_action('simplybook_features_loaded', [$this, 'registerControllers']); // Control the functionality of the plugin
        add_action('simplybook_controllers_loaded', [$this, 'checkForUpgrades']); // Makes sure Controllers can hook into the upgrade process
        add_action('rest_api_init', [$this, 'registerEndpoints']);
        add_action('admin_init', [$this, 'fireActivationHook']);
    }

    /**
     * Register the plugin environment. The value of the environment will
     * determine which domain and app_key are used for the API calls. The
     * default value is production and can be [production|development].
     * See {@see config/environment.php} for the actual values.
     */
    public function registerEnvironment()
    {
        if (!defined('SIMPLYBOOK_ENV')) {
            define('SIMPLYBOOK_ENV', 'development');
        }
    }

    /**
     * Load the plugin text domain for translations
     */
    public function loadPluginTextDomain()
    {
        load_plugin_textdomain('simplybook');
    }

    /**
     * Method that fires on activation. It creates a flag in the database
     * options table to indicate that the plugin is being activated. Flag is
     * used by {@see fireActivationHook} to run the activation hook only once.
     */
    public function activation()
    {
        global $pagenow;

        // Set the flag on activation
        update_option('simplybook_activation_flag', true, false);
        update_option('simplybook_activation_source_page', sanitize_text_field($pagenow), false);

        // Flush rewrite rules to ensure the new routes are available
        add_action('shutdown', 'flush_rewrite_rules');
    }

    /**
     * Method fires the activation hook. But only if the plugin is being
     * activated. The flag is set in the database options table
     * {@see activation} and is used to determine if the plugin is being
     * activated. This method removes the flag after it has been used.
     */
    public function fireActivationHook()
    {
        if (get_option('simplybook_activation_flag', false) === false) {
            return;
        }

        // Get the source page where the activation was triggered from
        $source = get_option('simplybook_activation_source_page', 'unknown');

        // Remove the activation flag so the action doesn't run again. Do it
        // before the action so its deleted before anything can go wrong.
        delete_option('simplybook_activation_flag');
        delete_option('simplybook_activation_source_page');

        // Gives possibility to hook into the activation process
        do_action('simplybook_activation', $source); // !important
    }

    /**
     * Method that fires on deactivation
     */
    public function deactivation()
    {
        // Silence is golden
    }

    /**
     * Method that fires on uninstall
     */
    public static function uninstall()
    {
        $uninstallInstance = new Helpers\Uninstall();
        $uninstallInstance->handlePluginUninstall();
    }

    /**
     * Register plugin constants
     * @deprecated 3.0.0
     */
    private function registerConstants()
    {
        /**
         * @deprecated 3.0.0 Use App::env('plugin.version') instead
         */
        define('SIMPLYBOOK_VERSION', '3.2.1');

        /**
         * @deprecated 3.0.0 Use App::env('plugin.path') instead
         */
        define('SIMPLYBOOK_PATH', plugin_dir_path(dirname(__FILE__)));

        /**
         * @deprecated 3.0.0 Use App::env('plugin.url') instead
         */
        define('SIMPLYBOOK_URL', plugin_dir_url(dirname(__FILE__)));

        /**
         * @deprecated 3.0.0 Use App::env('plugin.base_file') instead
         */
        define('SIMPLYBOOK_PLUGIN', plugin_basename(dirname(__FILE__, 2)). '/' . plugin_basename(dirname(__DIR__)) . '.php');
    }

    /**
     * Register Plugin providers. First step in the booting process of the
     * plugin. Is hooked into plugins_loaded to make sure we only boot the
     * plugin after all other plugins are loaded. This plugin depends on the
     * providerManager to fire the simplybook_providers_loaded action.
     * @uses do_action simplybook_providers_loaded
     */
    public function registerProviders()
    {
        $this->providerManager->registerProviders([
            new Providers\AppServiceProvider(),
        ]);
    }

    /**
     * Register Plugin features. Hooked into simplybook_providers_loaded to make
     * sure providers are already available to the whole app.
     * @uses do_action simplybook_features_loaded
     */
    public function registerFeatures()
    {
        $this->featureManager->registerFeatures(App::features());
    }

    /**
     * Register Controllers. Hooked into simplybook_features_loaded to make sure
     * features are available to the Controllers.
     * @uses do_action simplybook_controllers_loaded
     */
    public function registerControllers()
    {
        $this->controllerManager->registerControllers([
            new Controllers\DashboardController(),
            new Controllers\AdminController(),
            new Controllers\SettingsController(),
            new Controllers\CapabilityController(
                new Services\CapabilityService(),
            ),
            new Controllers\ScheduleController(),
            new Controllers\WidgetController(
                new Services\DesignSettingsService()
            ),
            new Controllers\BlockController(),
            new Controllers\DesignSettingsController(
                new Services\DesignSettingsService()
            ),
            new Controllers\ServicesController(
                new Http\Entities\Service(),
            ),
            new Controllers\ReviewController(
                new Services\NoticeDismissalService()
            ),
            new Controllers\TrialExpirationController(
                new Services\SubscriptionDataService(),
                new Services\NoticeDismissalService()
            ),
	        new Controllers\WidgetTrackingController(
		        new Services\WidgetTrackingService()
	        ),
        ]);
    }

    /**
     * Register the plugins REST API endpoint instances. Hooked into
     * rest_api_init to make sure the REST API is available.
     * @uses do_action simplybook_endpoints_loaded
     */
    public function registerEndpoints()
    {
        $this->endpointManager->registerEndpoints([
            new Http\Endpoints\LoginUrlEndpoint(
                new Services\LoginUrlService(),
            ),
            new Http\Endpoints\ServicesEndpoint(
                new Http\Entities\Service(),
            ),
            new Http\Endpoints\ServicesProvidersEndpoint(
                new Http\Entities\ServiceProvider(),
            ),
            new Http\Endpoints\SettingEndpoints(),
            new Http\Endpoints\WidgetEndpoint(
                new Services\DesignSettingsService()
            ),
            new Http\Endpoints\DomainEndpoint(),
            new Http\Endpoints\RemotePluginsEndpoint(),
            new Http\Endpoints\CompanyRegistrationEndpoint(
                new Services\CallbackUrlService()
            ),
            new Http\Endpoints\WaitForRegistrationEndpoint(),
            new Http\Endpoints\RelatedPluginEndpoints(
                new Services\RelatedPluginService(),
            ),
            new Http\Endpoints\BlockEndpoints(
                new Http\Entities\Service(),
                new Http\Entities\ServiceProvider(),
            ),
            new Http\Endpoints\LogOutEndpoint(),
            new Http\Endpoints\TipsTricksEndpoint(),
            new Http\Endpoints\StatisticsEndpoint(
                new Services\StatisticsService(),
            ),
            new Http\Endpoints\SubscriptionEndpoints(
                new Services\SubscriptionDataService(),
            ),
            new Http\Endpoints\PublicThemeListEndpoint(),
            new Http\Endpoints\ThemeColorEndpoint(
                new Services\ThemeColorService()
            ),
            new Http\Endpoints\NoticesDismissEndpoint(
                new Services\NoticeDismissalService()
            ),
        ]);
    }

    /**
     * Fire an action when the plugin is upgraded from one version to another.
     * Hooked into simplybook_controllers_loaded to make sure Controllers can
     * hook into simplybook_plugin_version_upgrade.
     *
     * @internal Note the starting underscore in the option name. This is to
     * prevent the option from being deleted when a user logs out. As if
     * it is a private SimplyBook option.
     *
     * @uses do_action simplybook_plugin_version_upgrade
     */
    public function checkForUpgrades(): void
    {
        $previousSavedVersion = (string) get_option('_simplybook_current_version', '');
        if ($previousSavedVersion === App::env('plugin.version')) {
            return; // Nothing to do
        }

        // This could be one if-statement, but this makes it readable that we
        // do not query the database if we do not need to.
        if (empty($previousSavedVersion)) {
            if ($this->isUpgradeFromLegacy()) {
                $previousSavedVersion = '2.3';
            }
        }

        // Trigger upgrade hook if we are upgrading from a previous version.
        // Action can be used by Controllers to hook into the upgrade process
        if (!empty($previousSavedVersion)) {
            do_action('simplybook_plugin_version_upgrade', $previousSavedVersion, App::env('plugin.version'));
        }

        // Also makes sure $previousSavedVersion will only be empty one time
        update_option('_simplybook_current_version', App::env('plugin.version'), false);
    }

    /**
     * Check if the plugin is being upgraded from a legacy version.
     * @internal Ideally this method should be removed in the future.
     * @since 3.0.0
     */
    private function isUpgradeFromLegacy(): bool
    {
        if ($cache = wp_cache_get('simplybook_was_legacy_plugin_active', 'simplybook')) {
            return $cache;
        }

        global $wpdb;

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
        $count = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->options} WHERE option_name LIKE %s",
                'simplybookMePl_%'
            )
        );

        wp_cache_set('simplybook_was_legacy_plugin_active', ($count > 0), 'simplybook');
        return $count > 0;
    }

}
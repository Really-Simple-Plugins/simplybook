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

        add_action('plugins_loaded', [$this, 'registerProviders']); // Provide functionality to the plugin
        add_action('simplybook_providers_loaded', [$this, 'registerFeatures']); // Makes sure features exist when controllers need them
        add_action('simplybook_features_loaded', [$this, 'registerControllers']); // Control the functionality of the plugin
        add_action('simplybook_controllers_loaded', [$this, 'checkForUpgrades']); // Makes sure controllers can hook into the upgrade process
        add_action('rest_api_init', [$this, 'registerEndpoints']);
    }

    /**
     * Method that fires on activation
     */
    public function activation()
    {
        // todo - please stop using this option..
        update_option('simplybook_run_activation', true, false);
        // But can we do that? See \SimplyBook\Traits\HasAllowlistControl::userCanManage

        do_action('simplybook_activation');

        // Flush rewrite rules to ensure the new routes are available
        add_action('shutdown', 'flush_rewrite_rules');
    }

    /**
     * Method that fires on deactivation
     */
    public function deactivation()
    {
    }

    /**
     * Method that fires on uninstall
     */
    public static function uninstall()
    {
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
        define('SIMPLYBOOK_VERSION', '3.0.0');

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
     * Register controllers. Hooked into simplybook_features_loaded to make sure
     * features are available to the controllers.
     * @uses do_action simplybook_controllers_loaded
     */
    public function registerControllers()
    {
        $this->controllerManager->registerControllers([
            new App\DashboardController(),
            new App\AdminController(),
            new App\SettingsController(),
            new App\FrontendController(),
            new App\CapabilityController(
                new App\Services\CapabilityService(),
            ),
            new App\TaskController(
                new App\Services\TaskService(),
            ),
            new App\ApiController(),
            new App\ScheduleController(),
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
            new App\Http\Endpoints\LoginUrlEndpoint(),
            new App\Http\Endpoints\ServicesEndpoint(),
            new App\Http\Endpoints\ProvidersEndpoint(),
            new App\Http\Endpoints\SettingEndpoints(),
            new App\Http\Endpoints\WidgetEndpoint(),
            new App\Http\Endpoints\TaskEndpoints(
                new App\Services\TaskService(),
            ),
            new App\Http\Endpoints\DomainEndpoint(),
            new App\Http\Endpoints\RemotePluginsEndpoint(),
            new App\Http\Endpoints\DashboardDataEndpoint(),
            new App\Http\Endpoints\CompanyRegistrationEndpoint(
                new App\Services\TaskService(),
            ),
            new App\Http\Endpoints\WaitForRegistrationEndpoint(),
            new App\Http\Endpoints\RelatedPluginEndpoints(
                new App\Services\RelatedPluginService(),
            ),
        ]);
    }

    /**
     * Fire an action when the plugin is upgraded from one version to another.
     * Hooked into simplybook_controllers_loaded to make sure controllers can
     * hook into simplybook_plugin_version_upgrade
     * @uses do_action simplybook_plugin_version_upgrade
     */
    public function checkForUpgrades(): void
    {
        // todo - in includes/Upgrades/Upgrades.php there was a check ong adminAccessAllowed. Is this even needed? Ifso, add it here.

        $previousVersion = (string) get_option('simplybook_current_version', false);
        if ($previousVersion && version_compare($previousVersion, App::env('plugin.version'), '==')) {
            return; // Nothing to do
        }

        // Action can be used by controllers to hook into the upgrade process
        do_action('simplybook_plugin_version_upgrade', $previousVersion, App::env('plugin.version'));
        update_option('simplybook_current_version', App::env('plugin.version'), false);
    }
}
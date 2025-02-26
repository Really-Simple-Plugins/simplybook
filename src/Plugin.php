<?php
namespace SimplyBook;

use SimplyBook\Managers\FeatureManager;
use SimplyBook\Managers\EndpointManager;
use SimplyBook\Managers\ProviderManager;
use SimplyBook\Managers\ControllerManager;

class Plugin
{
    private FeatureManager $featureManager;
    private EndpointManager $endpointManager;
    private ProviderManager $providerManager;
    private ControllerManager $controllerManager;

    /**
     * Plugin constructor
     */
    public function __construct()
    {
        $this->featureManager = new FeatureManager();
        $this->endpointManager = new EndpointManager();
        $this->providerManager = new ProviderManager();
        $this->controllerManager = new ControllerManager();
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

        add_action('plugins_loaded', [$this, 'init'], 1);
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
     * Add plugin actions
     */
    public function init()
    {
        $this->registerProviders(); // 1
        $this->registerFeatures(); // 2
        $this->registerControllers(); // 3
        add_action('rest_api_init', [$this, 'registerPluginEndpoints'], 30);
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
     * Register Plugin providers
     */
    public function registerProviders()
    {
        $this->providerManager->registerProviders([
            new Providers\AppServiceProvider(),
        ]);
    }

    /**
     * Register Plugin features
     */
    public function registerFeatures()
    {
        $this->featureManager->registerFeatures(App::features());
    }

    /**
     * Register controllers
     */
    public function registerControllers()
    {
        $this->controllerManager->registerControllers([
            new App\DashboardController(),
            new App\AdminController(),
            new App\SettingsController(),
            new App\FrontendController(),
            new App\CapabilityController(),
            new App\TaskController(),
            new App\ApiController(),
        ]);
    }

    /**
     * Register Plugin endpoints
     */
    public function registerPluginEndpoints()
    {
        $this->endpointManager->registerEndpoints([
            new Http\Endpoints\ExampleEndpoint(),
        ]);
    }
}
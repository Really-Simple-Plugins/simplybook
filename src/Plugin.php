<?php
namespace Simplybook;

use Simplybook\Managers\FeatureManager;
use Simplybook\Managers\EndpointManager;
use Simplybook\Managers\ProviderManager;
use Simplybook\Managers\ControllerManager;

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
        register_activation_hook(App::env('base_file'), [$this, 'activation']);
        register_deactivation_hook(App::env('base_file'), [$this, 'deactivation']);
        register_uninstall_hook(App::env('base_file'), 'Simplybook\Plugin::uninstall');

        add_action('plugins_loaded', [$this, 'init'], 1);
    }

    /**
     * Method that fires on activation
     */
    public function activation()
    {
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
            new App\AdminController(),
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
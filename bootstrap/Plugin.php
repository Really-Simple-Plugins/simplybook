<?php

declare(strict_types=1);

namespace SimplyBook\Bootstrap;

use SimplyBook\Managers\FeatureManager;
use SimplyBook\Managers\ProviderManager;
use SimplyBook\Managers\EndpointManager;
use SimplyBook\Managers\ControllerManager;

final class Plugin
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
        $app = App::getInstance();

        $this->featureManager = $app->make(FeatureManager::class);
        $this->providerManager = $app->make(ProviderManager::class);
        $this->endpointManager = $app->make(EndpointManager::class);
        $this->controllerManager = $app->make(ControllerManager::class);
    }

    /**
     * Boot the plugin
     */
    public function boot(): void
    {
        $this->registerEnvironment();

        $pluginBaseFile = (plugin_basename(dirname(__DIR__)) . DIRECTORY_SEPARATOR . plugin_basename(dirname(__DIR__)) . '.php');
        register_activation_hook($pluginBaseFile, [$this, 'activation']);
        register_deactivation_hook($pluginBaseFile, [$this, 'deactivation']);
        register_uninstall_hook($pluginBaseFile, 'SimplyBook\Bootstrap\Plugin::uninstall');

        add_action('plugins_loaded', [$this, 'loadPluginTextDomain']);
        add_action('plugins_loaded', [$this, 'registerProviders']); // Provide functionality to the plugin
        add_action('simplybook_providers_loaded', [$this->featureManager, 'registerFeatures']); // Makes sure features exist when Controllers need them
        add_action('simplybook_features_loaded', [$this, 'registerControllers']); // Control the functionality of the plugin
        add_action('rest_api_init', [$this, 'registerEndpoints']);
        add_action('admin_init', [$this, 'fireActivationHook']);
    }

    /**
     * Register the plugin environment. The value of the environment will
     * determine which domain is used for the API calls. The
     * default value is production and can be [production|development].
     * See {@see config/environment.php} for the actual values.
     */
    public function registerEnvironment(): void
    {
        if (!defined('SIMPLYBOOK_ENV')) {
            define('SIMPLYBOOK_ENV', 'development');
        }
    }

    /**
     * Load the plugin text domain for translations
     */
    public function loadPluginTextDomain(): void
    {
        load_plugin_textdomain('simplybook');
    }

    /**
     * Method that fires on activation. It creates a flag in the database
     * options table to indicate that the plugin is being activated. Flag is
     * used by {@see fireActivationHook} to run the activation hook only once.
     */
    public function activation(): void
    {
        global $pagenow;

        // Remember activation time
        update_option('simplybook_activation_unix_timestamp', time(), false);

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
    public function fireActivationHook(): void
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
    public function deactivation(): void
    {
        // Silence is golden
    }

    /**
     * Method that fires on uninstall
     */
    public static function uninstall(): void
    {
        $uninstallInstance = new \SimplyBook\Support\Helpers\Uninstall();
        $uninstallInstance->handlePluginUninstall();
    }

    /**
     * Register Plugin providers. First step in the booting process of the
     * plugin. Is hooked into plugins_loaded to make sure we only boot the
     * plugin after all other plugins are loaded. This plugin depends on the
     * providerManager to fire the simplybook_providers_loaded action.
     * @uses do_action simplybook_providers_loaded
     */
    public function registerProviders(): void
    {
        $this->providerManager->register([
            \SimplyBook\Providers\SimplyBookApiProvider::class,
        ]);
    }

    /**
     * Register Controllers. Hooked into simplybook_features_loaded to make sure
     * features are available to the Controllers.
     * @uses do_action simplybook_controllers_loaded
     */
    public function registerControllers(): void
    {
        $this->controllerManager->register([
            \SimplyBook\Controllers\DashboardController::class,
            \SimplyBook\Controllers\AdminController::class,
            \SimplyBook\Controllers\SettingsController::class,
            \SimplyBook\Controllers\CapabilityController::class,
            \SimplyBook\Controllers\ScheduleController::class,
            \SimplyBook\Controllers\WidgetController::class,
            \SimplyBook\Controllers\BlockController::class,
            \SimplyBook\Controllers\DesignSettingsController::class,
            \SimplyBook\Controllers\ServicesController::class,
            \SimplyBook\Controllers\ReviewController::class,
            \SimplyBook\Controllers\TrialExpirationController::class,
            \SimplyBook\Controllers\WidgetTrackingController::class,
            \SimplyBook\Controllers\OnboardingNoticeController::class,
            \SimplyBook\Controllers\BookingPageController::class,
        ]);
    }

    /**
     * Register the plugins REST API endpoint instances. Hooked into
     * rest_api_init to make sure the REST API is available.
     * @uses do_action simplybook_endpoints_loaded
     */
    public function registerEndpoints(): void
    {
        $this->endpointManager->register([
            \SimplyBook\Http\Endpoints\LoginUrlEndpoint::class,
            \SimplyBook\Http\Endpoints\ServicesEndpoint::class,
            \SimplyBook\Http\Endpoints\ServicesProvidersEndpoint::class,
            \SimplyBook\Http\Endpoints\SettingEndpoints::class,
            \SimplyBook\Http\Endpoints\WidgetEndpoint::class,
            \SimplyBook\Http\Endpoints\DomainEndpoint::class,
            \SimplyBook\Http\Endpoints\RemotePluginsEndpoint::class,
            \SimplyBook\Http\Endpoints\WaitForRegistrationEndpoint::class,
            \SimplyBook\Http\Endpoints\RelatedPluginEndpoints::class,
            \SimplyBook\Http\Endpoints\BlockEndpoints::class,
            \SimplyBook\Http\Endpoints\LogOutEndpoint::class,
            \SimplyBook\Http\Endpoints\TipsTricksEndpoint::class,
            \SimplyBook\Http\Endpoints\StatisticsEndpoint::class,
            \SimplyBook\Http\Endpoints\SubscriptionEndpoints::class,
            \SimplyBook\Http\Endpoints\PublicThemeListEndpoint::class,
            \SimplyBook\Http\Endpoints\ThemeColorEndpoint::class,
            \SimplyBook\Http\Endpoints\NoticesDismissEndpoint::class,
        ]);
    }
}

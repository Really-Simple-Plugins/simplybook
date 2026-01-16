<?php

namespace SimplyBook\Controllers;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasUserAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\ThemeColorService;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Features\Onboarding\OnboardingService;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;
use SimplyBook\Support\Helpers\Storages\RequestStorage;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class DashboardController implements ControllerInterface
{
    use LegacyLoad; // Needed for get_option
    use HasViews;
    use HasUserAccess;
    use HasAllowlistControl;

    private ApiClient $client;
    private EnvironmentConfig $env;
    private RequestStorage $request;
    private GeneralConfig $config;
    private ThemeColorService $themeColorService;
    private OnboardingService $onboardingService;

    public function __construct(ApiClient $client, EnvironmentConfig $env, GeneralConfig $config, RequestStorage $request, ThemeColorService $themeColorService, OnboardingService $onboardingService)
    {
        $this->client = $client;
        $this->env = $env;
        $this->request = $request;
        $this->config = $config;
        $this->themeColorService = $themeColorService;
        $this->onboardingService = $onboardingService;
    }

    public function register(): void
    {
        if ($this->userCanManage() === false) {
            return;
        }

        add_action('admin_menu', [$this, 'addDashboardPage']);
        add_action('admin_init', [$this, 'maybeResetRegistration']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueSimplyBookDashiconStyle']);

        // Redirect on the activation hook, but do it after anything else.
        add_action('simplybook_activation', [$this, 'maybeRedirectToDashboard'], 9999);
    }

    /**
     * Enqueue the SimplyBook Dashicon style, which makes dashicons-simplybook
     * available in the admin area. Also used by our Gutenberg block.
     */
    public function enqueueSimplyBookDashiconStyle(): void
    {
        $iconCss = $this->env->getUrl('plugin.assets_url') . 'css/simplybook-icon.css';
        wp_enqueue_style('simplybook-font', $iconCss, [], $this->env->getString('plugin.version'));
    }

    /**
     * Redirect to simplybook dashboard page on activation, but only if the user
     * manually activated the plugin via the plugins overview. React will handle
     * redirect to onboarding if needed.
     *
     * @param string $pageSource The page where the activation was triggered,
     * usually 'plugins.php' but can be other pages as well.
     */
    public function maybeRedirectToDashboard(string $pageSource = ''): void
    {
        if ($pageSource !== 'plugins.php') {
            return;
        }

        wp_safe_redirect($this->env->getUrl('plugin.dashboard_url'));
        exit;
    }

    /**
     * Add the dashboard page to the admin menu of WordPress. Also triggers the
     * action to enqueue scripts and styles
     * @uses apply_filters simplybook_menu_position
     */
    public function addDashboardPage(): void
    {
        /**
         * Filter: simplybook_menu_position
         * Can be used to change the position of the menu item in the admin menu.
         * @param int $menuPosition
         * @return int Default 59 to be positioned after "wp-menu-separator" and
         * before "Appearance".
         */
        $menuPosition = apply_filters('simplybook_menu_position', 59);

        $menuCounterHtml = '';
        $menuCounter = $this->getMenuCount();
        if ($menuCounter > 0) {
            $menuCounterHtml = "<span class='menu-counter' style='position: absolute; top: 2px; z-index: 0; right: 4px;'>{$menuCounter}</span>";
        }

        $pageHookSuffix = add_menu_page(
            esc_html__('SimplyBook.me', 'simplybook'),
            esc_html__('SimplyBook.me', 'simplybook') . $menuCounterHtml,
            'simplybook_manage',
            'simplybook-integration',
            [$this, 'renderReactApp'],
            'dashicons-simplybook',
            $menuPosition,
        );

        add_action("admin_print_styles-$pageHookSuffix", [$this, 'enqueueDashboardStyles']);
        add_action("admin_print_scripts-$pageHookSuffix", [$this, 'enqueueReactScripts']);
    }

    /**
     * Render the React app in the WordPress admin
     */
    public function renderReactApp(): void
    {
        $this->render('admin/dashboard');
    }

    /**
     * Enqueue the Tailwind CSS for the dashboard in the header
     */
    public function enqueueDashboardStyles(): void
    {
        $chunkTranslation = $this->getReactChunksAndTranslations();
        if (empty($chunkTranslation)) {
            return;
        }

        wp_enqueue_style(
            'simplybook-tailwind',
            $this->env->getUrl('plugin.assets_url') . '/css/tailwind.generated.css',
            [],
            ($chunkTranslation['version'] ?? '')
        );
    }

    /**
     * Enqueue the React scripts and styles for the dashboard:
     * - Tailwind CSS (tailwind.generated.css)
     * - React app (probably: index.js)
     *
     * Load translations for the React app
     */
    public function enqueueReactScripts(): void
    {
        $chunkTranslation = $this->getReactChunksAndTranslations();
        if (empty($chunkTranslation)) {
            return;
        }

        // Enqueue SimplyBook Widget script for preview functionality
        wp_enqueue_script(
            'simplybookMePl_widget_scripts',
            $this->env->getUrl('simplybook.widget_script_url'),
            [],
            $this->env->getString('simplybook.widget_script_version'),
            true
        );

        wp_enqueue_script(
            'simplybook-main-script',
            $this->env->getUrl('plugin.react_url') . '/build/' . ($chunkTranslation['js_file_name'] ?? ''),
            ($chunkTranslation['dependencies'] ?? ''),
            ($chunkTranslation['version'] ?? ''),
            true
        );

        wp_set_script_translations('simplybook-main-script', 'simplybook');

        wp_localize_script(
            'simplybook-main-script',
            'simplybook',
            $this->localizedReactSettings($chunkTranslation)
        );
    }

    /**
     * WordPress doesn't allow for translation of chunks resulting of code
     * splitting. Several workarounds have popped up in JetPack and Woocommerce.
     * Below is mainly based on the Woocommerce solution, which seems to be the
     * simplest approach. Simplicity is king here.
     * @see https://wordpress.com/blog/2022/01/06/wordpress-plugin-i18n-webpack-and-composer/
     */
    private function getReactChunksAndTranslations(): array
    {
        $cacheName = 'simplybook-react-chunk-and-translations';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        // get all files from the settings/build folder
        $buildDirPath = $this->env->getString('plugin.react_path') . '/build';
        $filenames = scandir($buildDirPath);

        $jsFileName = '';
        $assetFilename = '';
        $jsonTranslations = [];

        // filter the filenames to get the JavaScript and asset filenames
        foreach ($filenames as $filename) {
            if (strpos($filename, 'index.') === 0) {
                if (substr($filename, - 3) === '.js') {
                    $jsFileName = $filename;
                } elseif (substr($filename, - 10) === '.asset.php') {
                    $assetFilename = $filename;
                }
            }

            if (strpos($filename, '.js') === false) {
                continue;
            }

            // remove extension from $filename
            $chunkHandle = str_replace('.js', '', $filename);
            // temporarily register the script, so we can get a translations object.
            $chunkSource = $this->env->getUrl('plugin.react_url') . '/build/' . $filename;
            wp_register_script($chunkHandle, $chunkSource, [], $this->env->getString('plugin.version'), true);

            //as there is no pro version of this plugin, no need to declare a path
            $localeData = load_script_textdomain($chunkHandle, 'simplybook');
            if (!empty($localeData)) {
                $jsonTranslations[] = $localeData;
            }

            wp_deregister_script($chunkHandle);
        }

        if (empty($jsFileName)) {
            return [];
        }

        $assetFileData = require $buildDirPath . '/' . $assetFilename;
        $chunkTranslations = [
            'json_translations' => $jsonTranslations,
            'js_file_name' => $jsFileName,
            'dependencies' => $assetFileData['dependencies'] ?? [],
            'version' => $assetFileData['version'] ?? '',
        ];

        wp_cache_set($cacheName, $chunkTranslations, 'simplybook', (5 * MINUTE_IN_SECONDS));
        return $chunkTranslations;
    }

    /**
     * Build the localization array for the React script with the translations
     * @uses apply_filters simplybook_localize_dashboard_script
     */
    private function localizedReactSettings(array $chunkTranslation): array
    {
        return apply_filters(
            'simplybook_localize_dashboard_script',
            [
                'nonce' => wp_create_nonce('simplybook_nonce'),
                'x_wp_nonce' => wp_create_nonce('wp_rest'),
                'ajax_url' => admin_url('admin-ajax.php'),
                'rest_url' => get_rest_url(),
                'rest_namespace' => $this->env->getString('http.namespace'),
                'rest_version' => $this->env->getString('http.version'),
                'site_url' => site_url(),
                'dashboard_url' => $this->env->getUrl('plugin.dashboard_url'),
                'assets_url' => $this->env->getUrl('plugin.assets_url'),
                'debug' => defined('SIMPLYBOOK_DEBUG') && SIMPLYBOOK_DEBUG,
                'json_translations' => ($chunkTranslation['json_translations'] ?? []),
                'settings_menu' => $this->menu(),
                'settings_fields' => $this->fields(true),
                'is_onboarding_completed' => $this->isOnboardingCompleted(),
                'booking_page_url' => $this->onboardingService->getBookingPageUrl(),
                'first_name' => $this->getCurrentUserFirstName(),
                'completed_step' => get_option('simplybook_completed_step', 0),
                'simplybook_domains' => $this->env->get('simplybook.domains'),
                'simplybook_countries' => $this->config->get('countries'),
                'support' => $this->env->get('simplybook.support'),
                'fallback_colors' => $this->themeColorService->getFallbackColors(),
            ]
        );
    }

    private function isOnboardingCompleted(): bool
    {
        return get_option('simplybook_onboarding_completed', false);
    }

    /**
     * Reset the company registration if the user has requested it by setting
     * the `reset_registration` query parameter to `true`
     */
    public function maybeResetRegistration(): void
    {
        if ($this->request->getString('global.reset_registration', 'false') !== 'true') {
            return;
        }

        $this->client->reset_registration();
    }

    /**
     * Safe way to read the menu count from the options table. Returns 0 if
     * the Task Management feature is not available in the current context.
     */
    private function getMenuCount(): int
    {
        if (class_exists('\SimplyBook\Features\TaskManagement\Tasks\AbstractTask') === false) {
            return 0;
        }

        return get_option(\SimplyBook\Features\TaskManagement\Tasks\AbstractTask::MENU_BUBBLE_OPTION_KEY, 0);
    }
}

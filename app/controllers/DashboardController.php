<?php
namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Traits\HasViews;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\LegacyHelper;
use SimplyBook\Traits\HasUserAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;

class DashboardController implements ControllerInterface
{
    use LegacyHelper; // Needed for Load lol, bad stuffs
    use LegacyLoad; // Needed for get_option
    use HasViews;
    use HasUserAccess;
    use HasAllowlistControl;

    public function register()
    {
        if ($this->userCanManage() === false) {
            return;
        }

        add_action('simplybook_activation', [$this, 'maybeRedirectToDashboard']);
        add_action('admin_menu', [$this, 'addDashboardPage']);
        add_action('admin_init', [$this, 'maybeResetRegistration']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueDashboardStyles']);

    }

    /**
     * Redirect to simplybook dashboard page on activation. React side will
     * handle redirect to onboarding
     */
    public function maybeRedirectToDashboard(): void
    {
        if (App::provide('request')->getString('page') === 'simplybook') {
            return;
        }

        wp_safe_redirect(App::env('plugin.admin_url'));
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
         * @return int
         */
        $menuPosition = apply_filters('simplybook_menu_position', 3);

        $pageHookSuffix = add_menu_page(
            esc_html__('Bookings', 'simplybook'),
            esc_html__('Bookings', 'simplybook'),
            'simplybook_manage',
            'simplybook',
            [$this, 'renderReactApp'],
            'dashicons-calendar-alt',
            $menuPosition
        );

        add_action("admin_print_scripts-$pageHookSuffix", [$this, 'enqueueReactScripts']);
    }

    /**
     * Render the React app in the WordPress admin
     */
    public function renderReactApp(): void
    {
        $logoUrl = App::env('plugin.assets_url').'img/logo.svg';
        $navigation = $this->getNavigationItems();

        $this->render('admin/dashboard', compact('logoUrl', 'navigation'));
    }

    /**
     * Get the default navigation items for the dashboard.
     * @internal This is solely used in the skeleton view!
     * @uses apply_filters simplybook_dashboard_menu_items
     */
    private function getNavigationItems(): array
    {
        $menuItems = [
            [
                'title' => esc_html__('Dashboard', 'simplybook'),
            ],
            [
                'title' => esc_html__('Clients 0', 'simplybook'),
                'classes' => 'ml-2',
            ],
            [
                'title' => esc_html__('Calendar 0', 'simplybook'),
                'classes' => 'ml-2',
            ],
            [
                'title' => esc_html__('Settings', 'simplybook'),
                'classes' => 'ml-2',
            ],
        ];

        /**
         * Filter: simplybook_dashboard_menu_items
         * Can be used to add or remove menu items from the dashboard.
         * @param array $menuItems
         * @return array
         */
        return apply_filters('simplybook_dashboard_menu_items', $menuItems);
    }

    /**
     * Enqueue the Tailwind CSS for the dashboard in the header
     */
    public function enqueueDashboardStyles(string $hookSuffix)
    {
        $pageSimplyBook = App::provide('request')->getString('page') === 'simplybook';
        $hookContainsSimplyBook = strpos($hookSuffix, 'simplybook') !== false;
        $currentScreenIsSimplyBook = $pageSimplyBook || $hookContainsSimplyBook;

        if ($currentScreenIsSimplyBook === false) {
            return;
        }

        $chunkTranslation = $this->getReactChunkTranslations();
        if (empty($chunkTranslation)) {
            return;
        }

        wp_enqueue_style(
            'simplybook-tailwind',
            App::env('plugin.react_url') . '/src/tailwind.generated.css',
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
        $chunkTranslation = $this->getReactChunkTranslations();
        if (empty($chunkTranslation)) {
            return;
        }

        wp_enqueue_script(
            'simplybook',
            App::env('plugin.react_url') . '/build/' . ($chunkTranslation['js_file_name'] ?? ''),
            ($chunkTranslation['dependencies'] ?? ''),
            ($chunkTranslation['version'] ?? ''),
            true
        );

        wp_localize_script(
            'simplybook',
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
    private function getReactChunkTranslations(): array
    {
        $cacheName = 'simplybook-react-chunk-translations';
        if ($cache = wp_cache_get($cacheName, 'simplybook')) {
            return $cache;
        }

        // get all files from the settings/build folder
        $buildDirPath = App::env('plugin.react_path') . '/build';
        $filenames = scandir($buildDirPath);

        $jsFileName = '';
        $assetFilename = '';
        $jsonTranslations = [];

        // filter the filenames to get the JavaScript and asset filenames
        foreach ($filenames as $filename) {
            if (strpos($filename, 'index.') === 0) {
                if (substr($filename, - 3) === '.js') {
                    $jsFileName = $filename;
                } else if (substr($filename, - 10) === '.asset.php') {
                    $assetFilename = $filename;
                }
            }

            if (strpos($filename, '.js') === false) {
                continue;
            }

            // remove extension from $filename
            $chunkHandle = str_replace('.js', '', $filename);
            // temporarily register the script, so we can get a translations object.
            $chunkSource = App::env('plugin.react_url') . '/build/' . $filename;
            wp_register_script($chunkHandle, $chunkSource, [], true);

            //as there is no pro version of this plugin, no need to declare a path
            $localeData = load_script_textdomain($chunkHandle, 'simplybook', false);
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

        wp_cache_set($cacheName, $chunkTranslations, 'simplybook');
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
                'ajax_url' => admin_url('admin-ajax.php'),
                'rest_url' => get_rest_url(),
                'site_url' => site_url(),
                'assets_url' => App::env('plugin.assets_url'),
                'debug' => defined( 'SIMPLYBOOK_DEBUG' ) && SIMPLYBOOK_DEBUG,
                'json_translations' => ($chunkTranslation['json_translations'] ?? []),
                'settings_menu' => $this->menu(),
                'settings_fields' => $this->fields(true),
                 'is_onboarding_completed' => $this->onboarding_completed(),
                'first_name' => $this->getCurrentUserFirstName(),
                 'completed_step' => get_option('simplybook_completed_step', 0),
                'tips_and_tricks' => App::env('simplybook.tips_and_tricks'),
            ]
        );
    }

    private function onboarding_completed(): bool {
        return get_option('simplybook_onboarding_completed', false);
    }

    /**
     * Reset the company registration if the user has requested it by setting
     * the `reset_registration` query parameter to `true`
     */
    public function maybeResetRegistration(): void
    {
        if (App::provide('request')->getString('reset_registration', 'false') !== 'true') {
            return;
        }

        App::provide('client')->reset_registration();
    }
}
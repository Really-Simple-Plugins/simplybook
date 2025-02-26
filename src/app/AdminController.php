<?php
namespace SimplyBook\App;

use SimplyBook\App;
use Simplybook_old\Upgrades\Upgrades;
use SimplyBook\Traits\HasAllowlistControl;
use Simplybook_old\Admin\RestApi\LoginUrl;
use Simplybook_old\Admin\RestApi\Services;
use Simplybook_old\Admin\RestApi\Settings;
use Simplybook_old\Admin\RestApi\GetTasks;
use Simplybook_old\Admin\RestApi\Providers;
use Simplybook_old\Admin\RestApi\GetWidget;
use Simplybook_old\Admin\RestApi\Dashboard;
use Simplybook_old\Admin\RestApi\GetDomain;
use Simplybook_old\Admin\RestApi\Onboarding;
use Simplybook_old\Admin\RestApi\GetPlugins;
use SimplyBook\Interfaces\ControllerInterface;
use Simplybook_old\Admin\Capability\Capability;
use Simplybook_old\Admin\RestApi\CompanyRegistration;
use Simplybook_old\Admin\RestApi\WaitForRegistrationCallback;

class AdminController implements ControllerInterface
{
    use HasAllowlistControl;

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        ( new Capability() );
        ( new Onboarding() );
        ( new LoginUrl() );
        ( new Services() );
        ( new Providers() );
        ( new Settings() );
        ( new CompanyRegistration() );
        ( new WaitForRegistrationCallback() );
        ( new GetWidget() );
        ( new Dashboard() );
        ( new GetTasks() );
        ( new GetPlugins() );
        ( new GetDomain() );

        add_action('simplybook_activation', [$this, 'maybeRedirectToDashboard']);
        add_filter('plugin_action_links_' . App::env('plugin.base_file'), [$this, 'addPluginSettingsAction']);
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
     * Add settings and support link to the plugin page
     */
    public function addPluginSettingsAction(array $links): array
    {
        if ($this->userCanManage() === false) {
            return $links;
        }

        $settings_link = '<a href="' . App::env('plugin.admin_url') . '">' . esc_html__('Settings', 'simplybook') . '</a>';
        array_unshift($links, $settings_link);

        //support
        $support = '<a rel="noopener noreferrer" target="_blank" href="' . esc_attr(App::env('simplybook.support_link')) . '">' . esc_html__('Support', 'simplybook') . '</a>';
        array_unshift($links, $support);

        return $links;
    }
}
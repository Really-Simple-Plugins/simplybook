<?php
namespace SimplyBook\App;

use SimplyBook\App;
use SimplyBook\Traits\HasAllowlistControl;
use Simplybook_old\Admin\RestApi\Settings;
use Simplybook_old\Admin\RestApi\GetTasks;
use Simplybook_old\Admin\RestApi\Providers;
use Simplybook_old\Admin\RestApi\GetWidget;
use Simplybook_old\Admin\RestApi\Dashboard;
use Simplybook_old\Admin\RestApi\GetDomain;
use Simplybook_old\Admin\RestApi\GetPlugins;
use SimplyBook\Interfaces\ControllerInterface;
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

        // todo - START - refactor one by one
        ( new Providers() );
        ( new Settings() );
        ( new CompanyRegistration() );
        ( new WaitForRegistrationCallback() );
        ( new GetWidget() );
        ( new Dashboard() );
        ( new GetTasks() );
        ( new GetPlugins() );
        ( new GetDomain() );

        add_filter('plugin_action_links_' . App::env('plugin.base_file'), [$this, 'addPluginSettingsAction']);
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
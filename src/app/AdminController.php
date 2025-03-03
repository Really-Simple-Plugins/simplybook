<?php
namespace SimplyBook\App;

use SimplyBook\App;
use SimplyBook\Traits\HasAllowlistControl;
use Simplybook_old\Admin\RestApi\Dashboard;
use Simplybook_old\Admin\RestApi\GetDomain;
use Simplybook_old\Admin\RestApi\GetPlugins;
use SimplyBook\Interfaces\ControllerInterface;

class AdminController implements ControllerInterface
{
    use HasAllowlistControl;

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        // todo - START - refactor one by one
        ( new Dashboard() );
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
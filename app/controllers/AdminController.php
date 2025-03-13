<?php
namespace SimplyBook\Controllers;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\ControllerInterface;

class AdminController implements ControllerInterface
{
    use HasAllowlistControl;

    public function register(): void
    {
        if ($this->adminAccessAllowed() === false) {
            return;
        }

        $hardcodedLoginUrlCreationDate = '2025-03-13 08:44:31';
        $datetimeWithCarbonOneHourAgo = Carbon::now()->subHour();


        echo '<pre>';
        var_dump($hardcodedLoginUrlCreationDate);
        var_dump($datetimeWithCarbonOneHourAgo->toDateTimeString());
        var_dump(Carbon::parse($hardcodedLoginUrlCreationDate)->isBefore($datetimeWithCarbonOneHourAgo));
        var_dump(Carbon::parse($hardcodedLoginUrlCreationDate)->diffInMinutes($datetimeWithCarbonOneHourAgo));
        exit();

        try {
            echo '<pre>';
            var_export(App::provide('client')->createLoginHash());
            exit();
        } catch (\Exception $e) {
            echo '<pre>';
            var_export($e);
            exit();
        }

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
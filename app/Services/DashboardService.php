<?php

namespace SimplyBook\Services;

use SimplyBook\Support\Helpers\Storages\RequestStorage;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class DashboardService
{
    protected EnvironmentConfig $env;
    protected RequestStorage $request;

    public function __construct(EnvironmentConfig $env, RequestStorage $request)
    {
        $this->env = $env;
        $this->request = $request;
    }

    /**
     * Check if the current user is on the Dashboard page.
     */
    public function userIsOnDashboard(): bool
    {
        $pageVisitedByUser = $this->request->getString('global.page');
        $dashboardUrl = $this->env->getString('plugin.dashboard_url');

        $pluginPageQueryString = wp_parse_url($dashboardUrl, PHP_URL_QUERY);
        parse_str($pluginPageQueryString, $parsedQuery);
        $pluginDashboardPage = ($parsedQuery['page'] ?? '');

        return $pageVisitedByUser === $pluginDashboardPage;
    }
}

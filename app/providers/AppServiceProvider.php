<?php
namespace SimplyBook\Providers;

use SimplyBook\App;
use SimplyBook\Http\ApiClient;
use SimplyBook\Helpers\Request;
use SimplyBook\Http\JsonRpcClient;

class AppServiceProvider extends Provider
{
    protected array $provides = [
        'simplybook_env', // Prioritized so it can be used in other providers
        'request',
        'client',
        'simplybook_domains',
        'http_entities', // After 'client' so client can be used in entities
    ];

    /**
     * Provides the global request object for the application to use
     * @example App::provide('request')
     */
    public function provideRequest(): Request
    {
        return Request::fromGlobal();
    }

    /**
     * Provides the API client for the application to use
     * @example App::provide('client')
     */
    public function provideClient(): ApiClient
    {
        return new ApiClient(
            new JsonRpcClient(),
            $this->provideSimplybookEnv(),
        );
    }

    /**
     * Provides the SimplyBook API environment configuration based on the
     * value of the SIMPLYBOOK_ENV constant.
     * @example App::provide('simplybook_env')
     */
    public function provideSimplybookEnv(): array
    {
        $acceptedEnvs = ['production', 'development'];
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        if (!in_array($env, $acceptedEnvs)) {
            $env = 'production';
        }

        return App::env('simplybook.api.'.$env);
    }

    /**
     * Provides the SimplyBook domains based on the current environment.
     * If in development mode, it adds the staging domain.
     * @example App::provide('simplybook_domains')
     */
    public function provideSimplybookDomains(): array
    {
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';
        $environmentData = $this->provideSimplybookEnv();

        $domains = App::env('simplybook.domains');

        if (($env === 'development') && !empty($environmentData['domain'])) {
            $domains[] = [
                'value' => 'default:' . $environmentData['domain'],
                'label' => $environmentData['domain'],
            ];
        }

        return $domains;
    }
}
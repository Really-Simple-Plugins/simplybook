<?php
namespace SimplyBook\Providers;

use SimplyBook\App;
use SimplyBook\Http\ApiClient;
use SimplyBook\Helpers\Request;
use SimplyBook\Http\JsonRpcClient;

class AppServiceProvider extends Provider
{
    protected array $provides = [
        'request',
        'client',
        'simplybook_env',
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
}
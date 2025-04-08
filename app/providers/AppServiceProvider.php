<?php
namespace SimplyBook\Providers;

use SimplyBook\Http\ApiClient;
use SimplyBook\Helpers\Request;
use SimplyBook\Http\JsonRpcClient;

class AppServiceProvider extends Provider
{
    protected array $provides = [
        'request',
        'client',
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
            new JsonRpcClient()
        );
    }
}
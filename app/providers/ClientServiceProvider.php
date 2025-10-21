<?php
namespace SimplyBook\Providers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Http\ApiClient;

class ClientServiceProvider extends Provider
{
    protected array $provides = [
        'client',
    ];

    /**
     * Provides the API client for the application to use
     * @example $this->app->client || $this->app->get('client')
     */
    public function provideClient(): ApiClient
    {
        return App::getInstance()->make(ApiClient::class);
    }
}

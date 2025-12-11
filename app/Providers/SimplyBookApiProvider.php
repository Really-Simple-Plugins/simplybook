<?php

namespace SimplyBook\Providers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Http\ApiClient;

class SimplyBookApiProvider extends Provider
{
    /**
     * @inheritDoc
     */
    protected array $singletons = [
        'client' => ApiClient::class,
    ];

    /**
     * Provides the API client for the application to use
     * Example: $this->app->get(ApiClient::clas)
     * Example DI: public function __construct(ApiClient $client) { ... }
     */
    public static function provideClientSingleton(): ApiClient
    {
        return App::getInstance()->make(ApiClient::class);
    }
}

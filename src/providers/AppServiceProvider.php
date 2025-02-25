<?php
namespace SimplyBook\Providers;

use SimplyBook\Helpers\Request;

class AppServiceProvider extends Provider
{
    protected array $provides = [
        'request',
    ];

    /**
     * Provides the global request object for the application to use
     * @example App::provide('request')
     */
    public function provideRequest(): Request
    {
        return Request::fromGlobal();
    }
}
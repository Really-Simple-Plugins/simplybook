<?php

namespace SimplyBook\Providers;

use SimplyBook\Support\Helpers\Storage;

class RequestServiceProvider extends Provider
{
    protected array $provides = [
        'request',
        'files',
    ];

    /**
     * Provides the global request object for the application to use
     * @example $this->app->request->get('key.key', 'default');
     */
    public function provideRequest(): Storage
    {
        return new Storage($_REQUEST);
    }

    /**
     * Provides the global files object for the application to use
     * @example $this->app->files->get('key.key', 'default');
     */
    public function provideFiles(): Storage
    {
        return new Storage($_FILES);
    }
}

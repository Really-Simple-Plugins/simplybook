<?php
namespace SimplyBook\Providers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Interfaces\ProviderInterface;
use SimplyBook\Support\Utility\StringUtility;

class Provider implements ProviderInterface
{
    /**
     * Register the provided services. Will be used to find and call the
     * provide{Service} methods. You can use lowercase for the service name.
     */
    protected array $provides = [];

    /**
     * Method will be called by the ProviderManager to serve the provided
     * services.
     */
    public function provide(): void
    {
        foreach ($this->provides as $provide) {
            $method = 'provide' . StringUtility::snakeToUpperCamelCase($provide);
            if (method_exists($this, $method) === false) {
                continue;
            }

            App::register($provide, $this->$method());
        }
    }
}
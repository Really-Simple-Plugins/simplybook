<?php
namespace SimplyBook\Providers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Interfaces\ProviderInterface;
use SimplyBook\Support\Utility\StringUtility;

/**
 * Providers are classes that provide functionality to the container. Child
 * classes should never use the container instance themselves to prevent
 * recursion in the container registry. Therefor child Providers should
 * always return the provided functionality directly in the
 * provide{Function} method instead of setting it in the
 * container {@see App}
 */
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
    final public function provide(): void
    {
        foreach ($this->provides as $provide) {
            $method = 'provide' . StringUtility::snakeToPascalCase($provide);
            if (method_exists($this, $method) === false) {
                continue;
            }

            App::getInstance()->set($provide, function() use ($method) {
                return $this->$method();
            });
        }
    }
}
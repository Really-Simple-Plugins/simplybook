<?php namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ControllerInterface;

class ControllerManager
{
    /**
     * Register a single controller as long as it implements the
     * ControllerInterface
     */
    public function registerControllers(array $controllers)
    {
        // Reject all given providers when they do not implement the ProviderInterface
        $controllers = array_filter($controllers, function ($controller) {
            return $controller instanceof ControllerInterface;
        });

        // Serve each provider
        foreach ($controllers as $controller) {
            $controller->register();
        }

        do_action('simplybook_controllers_loaded');
    }
}
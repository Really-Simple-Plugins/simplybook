<?php namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ControllerInterface;

final class ControllerManager
{
    /**
     * Register a single controller as long as it implements the
     * ControllerInterface.
     * @uses do_action simplybook_controllers_loaded
     */
    public function registerControllers(array $controllers)
    {
        // Reject all controllers when they do not implement ControllerInterface
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
<?php namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ControllerInterface;

final class ControllerManager
{
    /**
     * Register a single controller as long as it implements the
     * ControllerInterface.
     * @uses do_action simplybook_Controllers_loaded
     */
    public function registerControllers(array $Controllers)
    {
        // Reject all given providers when they do not implement the ProviderInterface
        $Controllers = array_filter($Controllers, function ($controller) {
            return $controller instanceof ControllerInterface;
        });

        // Serve each provider
        foreach ($Controllers as $controller) {
            $controller->register();
        }

        do_action('simplybook_Controllers_loaded');
    }
}
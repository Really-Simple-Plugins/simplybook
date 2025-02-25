<?php namespace SimplyBook\Managers;

use SimplyBook\Interfaces\ProviderInterface;

class ProviderManager
{
    /**
     * Register a providers as long as it implements the ProviderInterface
     */
    public function registerProviders(array $providers)
    {
        // Reject all given providers when they do not implement the ProviderInterface
        $providers = array_filter($providers, function ($provider) {
            return $provider instanceof ProviderInterface;
        });

        // Serve each provider
        foreach ($providers as $provider) {
            $provider->serve();
        }

        do_action('rsp_providers_loaded');
    }
}
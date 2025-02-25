<?php namespace Simplybook\Interfaces;

interface ProviderInterface
{
    /**
     * The method that gets called by the ProviderManager to serve the provided
     * functionality.
     */
    public function serve();
}
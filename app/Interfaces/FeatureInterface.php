<?php

namespace SimplyBook\Interfaces;

/**
 * This interface can be used to boot a feature. Features will only be accepted
 * and booted by {@see FeatureManagerNew} when they implement this interface.
 */
interface FeatureInterface
{
    /**
     * This method should be used to boot the complete feature. The
     * {@see FeatureManagerNew} will make sure the method is called in the boot
     * process of the plugin. Will most likely contain all the hooks and
     * filters to boot controllers, listeners, endpoints, providers, etc.
     */
    public function boot(): void;

    /**
     * Method should return true if the feature is enabled. This can check
     * setting values or user capabilities for example. Only files of features
     * that are enabled will be loaded into the memory.
     */
    public function isEnabled(): bool;

    /**
     * Method should return true if the context of the user is in the scope of
     * the feature to be loaded. For example: some features only need to load
     * on our dashboard and others also in each REST API request. Only files of
     * features that are in scope will be loaded into the memory.
     */
    public function inScope(): bool;
}

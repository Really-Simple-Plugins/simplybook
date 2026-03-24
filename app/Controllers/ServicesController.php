<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Http\Entities\Service;
use SimplyBook\Services\ExtendifyDataService;
use SimplyBook\Interfaces\ControllerInterface;

class ServicesController implements ControllerInterface
{
    use LegacyLoad;

    /**
     * The service entity that this controller uses to do requests.
     */
    protected Service $service;

    /**
     * The Extendify data service for accessing Extendify integration data.
     */
    protected ExtendifyDataService $extendifyDataService;

    public function __construct(Service $service, ExtendifyDataService $extendifyDataService)
    {
        $this->service = $service;
        $this->extendifyDataService = $extendifyDataService;
    }

    public function register(): void
    {
        add_action('simplybook_after_company_registered', [$this, 'setInitialServiceName']);
    }

    /**
     * After the company is registered, we need to set the name for the initial
     * service(s). We create a Service for all the services saved in the
     * database. For the default Service we only have to update the name.
     */
    public function setInitialServiceName(): void
    {
        $extendifyServices = $this->extendifyDataService->getServices();
        if (!empty($extendifyServices)) {
            $this->createMultipleServices($extendifyServices);
            return;
        }

        $this->createExampleService();
    }

    /**
     * Get the first existing service from the remote, or null if none exists.
     */
    private function getFirstExistingService(): ?array
    {
        $currentServices = $this->service->all();
        $hasDefaultService = (count($currentServices) >= 1 && !empty($currentServices[0]) && is_array($currentServices[0]));

        return $hasDefaultService ? $currentServices[0] : null;
    }

    private function createMultipleServices(array $serviceNames): void
    {
        if (empty($serviceNames)) {
            return;
        }

        $serviceToUpdate = $this->getFirstExistingService();

        foreach ($serviceNames as $index => $serviceName) {
            $serviceName = sanitize_text_field($serviceName);
            if (empty($serviceName)) {
                continue;
            }

            // Only update the first service
            if ($index !== 0) {
                $serviceToUpdate = null;
            }

            $this->processServiceName($serviceName, $serviceToUpdate);
        }
    }

    /**
     * Method to process a service name and either create or update a service
     * on the remote. Before processing, we always make sure to clean up the
     * service model to avoid leftover state.
     */
    private function processServiceName(string $serviceName, ?array $serviceToUpdate): bool
    {
        $this->service->reset();

        if (!empty($serviceToUpdate)) {
            return $this->updateExistingService($serviceToUpdate, $serviceName);
        }

        return $this->createNewService($serviceName);
    }

    /**
     * When there is no Extendify data we set the name of the initial Service,
     * after creating a new account, to "Example Service".
     */
    private function createExampleService(): bool
    {
        $currentServices = $this->service->all();

        // There are NO services or more than 1. Both wouldn't give us the
        // option to set the initial service name.
        if ((count($currentServices) !== 1) || empty($currentServices[0]) || !is_array($currentServices[0])) {
            return false;
        }

        $initialServiceName = __('Example Service', 'simplybook');
        return $this->updateExistingService($currentServices[0], $initialServiceName);
    }

    /**
     * Update an existing service with a new name. Silently fails so the
     * onboarding process can continue even if service update fails.
     */
    private function updateExistingService(array $serviceData, string $serviceName): bool
    {
        try {
            $this->service->fill($serviceData);
            $this->service->name = $serviceName;
            $this->service->update();
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }

    /**
     * Create a new service with default settings. Silently fails so the
     * onboarding process can continue even if service creation fails.
     */
    private function createNewService(string $serviceName): bool
    {
        try {
            $this->service->reset();
            $this->service->name = $serviceName;
            $this->service->duration = 60; // Default: 1 hour
            $this->service->is_visible = true;
            $this->service->create();
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }
}

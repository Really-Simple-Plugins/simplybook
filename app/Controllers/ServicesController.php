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
    public function setInitialServiceName(): bool
    {
        $extendifyServices = $this->extendifyDataService->getServices();
        if (empty($extendifyServices)) {
            return false;
        }

        return $this->createMultipleServices($extendifyServices);
    }

    /**
     * Create multiple services from an array of service names.
     * Updates the first existing service and creates additional ones as needed.
     */
    private function createMultipleServices(array $serviceNames): bool
    {
        if (empty($serviceNames)) {
            return false;
        }

        $currentServices = $this->service->all();
        $hasDefaultService = (count($currentServices) === 1 && !empty($currentServices[0]) && is_array($currentServices[0]));
        $allSuccessful = true;

        foreach ($serviceNames as $index => $serviceName) {
            $serviceName = sanitize_text_field($serviceName);
            if (empty($serviceName)) {
                continue;
            }

            // First service: update existing default if available
            if ($index === 0 && $hasDefaultService) {
                $allSuccessful = $this->updateExistingService($currentServices[0], $serviceName) && $allSuccessful;
            } else {
                // Create new service
                $allSuccessful = $this->createNewService($serviceName) && $allSuccessful;
            }
        }

        return $allSuccessful;
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

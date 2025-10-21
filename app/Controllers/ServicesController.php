<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Http\Entities\Service;
use SimplyBook\Interfaces\ControllerInterface;

class ServicesController implements ControllerInterface
{
    use LegacyLoad;

    /**
     * The service entity that this controller uses to do requests.
     */
    protected Service $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_action('simplybook_after_company_registered', [$this, 'setInitialServiceName']);
    }

    /**
     * After the company is registered, we need to set the initial service name
     * to the name of the service that was set during the onboarding process.
     * We do that by collecting the current services and checking if there is
     * only one service. If there is, we update the name of that service to
     * the name that was set during the onboarding process. Some fields
     * are mandatory, and we keep that in mind here too.
     */
    public function setInitialServiceName(): bool
    {
        $initialServiceName = $this->get_company('service');
        if (empty($initialServiceName)) {
            return false; // abort if no service name is set
        }

        $currentServices = $this->service->all();

        // There are NO services or more than 1. Both wouldn't give us the
        // option to set the initial service name.
        if ((count($currentServices) !== 1) || empty($currentServices[0]) || !is_array($currentServices[0])) {
            return false;
        }

        try {
            $this->service->fill($currentServices[0]);
            $this->service->name = sanitize_text_field($initialServiceName);
            $this->service->update();
        } catch (\Exception $e) {
            return false; // abort updating invalid service
        }

        return true;
    }
}
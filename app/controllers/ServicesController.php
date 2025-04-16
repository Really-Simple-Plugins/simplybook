<?php

namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Helpers\Storage;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Interfaces\ControllerInterface;

class ServicesController implements ControllerInterface
{
    use LegacyLoad;

    public function register() {
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

        $currentServices = App::provide('client')->get_services();

        // There are NO services or more than 1. Both wouldn't give us the
        // option to set the initial service name.
        if ((count($currentServices) !== 1) || empty($currentServices[0])) {
            return false;
        }

        $mandatoryFields = [
            'id',
            'duration',
            'is_visible',
        ];

        $initialService = new Storage($currentServices[0]);

        foreach ($mandatoryFields as $field) {
            if ($initialService->isEmpty($field)) {
                return false; // abort updating invalid service
            }
        }

        $updatedService = [
            'name' => sanitize_text_field($initialServiceName),
            'duration' => $initialService->getInt('duration'),
            'is_visible' => $initialService->getBoolean('is_visible'),
        ];

        try {
            App::provide('client')->updateService(
                $initialService->getString('id'),
                $updatedService
            );
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }
}
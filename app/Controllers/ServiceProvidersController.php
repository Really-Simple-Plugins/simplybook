<?php

namespace SimplyBook\Controllers;

use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Http\Entities\ServiceProvider;
use SimplyBook\Interfaces\ControllerInterface;

class ServiceProvidersController implements ControllerInterface
{
    use LegacyLoad;

    /**
     * The Service Provider entity that this controller uses to do requests.
     */
    protected ServiceProvider $provider;

    public function __construct(ServiceProvider $provider)
    {
        $this->provider = $provider;
    }

    public function register(): void
    {
        add_action('simplybook_after_company_registered', [$this, 'setInitialServiceProviderName']);
    }

    /**
     * After the company is registered, we need to set the initial name to
     * "Example Service Provider" for the default Service Provider. We do that
     * by collecting the current service providers and checking if there is
     * only one service providers. If there is, we update the name of that
     * entity. Some fields are mandatory, and we keep that in mind here too.
     */
    public function setInitialServiceProviderName(): bool
    {
        $currentProviders = $this->provider->all();

        // There are NO providers or more than 1. Both wouldn't give us the
        // option to set the initial service name.
        if ((count($currentProviders) !== 1) || empty($currentProviders[0]) || !is_array($currentProviders[0])) {
            return false;
        }

        $initialProviderName = __('Example Service Provider', 'simplybook');

        try {
            $this->provider->fill($currentProviders[0]);
            $this->provider->name = sanitize_text_field($initialProviderName);
            $this->provider->update();
        } catch (\Exception $e) {
            return false; // abort updating invalid provider
        }

        return true;
    }
}

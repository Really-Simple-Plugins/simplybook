<?php

namespace SimplyBook\Traits;

use SimplyBook\Bootstrap\App;
use SimplyBook\Http\ApiClient;

trait HasApiAccess
{
    /**
     * Checks if SimplyBook registration is complete
     * Delegates to ApiClient
     * @throws \ReflectionException
     */
    public function companyRegistrationIsCompleted(): bool
    {
        return App::getInstance()->get(ApiClient::class)->company_registration_complete();
    }
}

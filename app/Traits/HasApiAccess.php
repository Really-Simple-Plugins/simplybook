<?php

namespace SimplyBook\Traits;

use SimplyBook\Bootstrap\App;

trait HasApiAccess
{
    /**
     * Checks if SimplyBook registration is complete
     * Delegates to ApiClient
     */
    public function companyRegistrationIsCompleted(): bool
    {
        return App::client()->company_registration_complete();
    }
}

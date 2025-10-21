<?php

declare(strict_types=1);

namespace SimplyBook\Features\Onboarding;

use SimplyBook\Features\AbstractLoader;

class OnboardingLoader extends AbstractLoader
{
    /**
     * @inheritDoc
     */
    public function isEnabled(): bool
    {
        return get_option('simplybook_onboarding_completed', false) === false;
    }

    /**
     * @inheritDoc
     */
    public function inScope(): bool
    {
        return (is_admin() && $this->userIsOnDashboard()) || $this->requestIsRestRequest();
    }
}

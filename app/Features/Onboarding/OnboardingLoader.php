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
        $extendifySiteIdExists = get_option('extendify_site_id', false) !== false;

        return (is_admin() && $this->userIsOnDashboard())
            || (is_admin() && $extendifySiteIdExists)
            || $this->requestIsRestRequest();
    }
}

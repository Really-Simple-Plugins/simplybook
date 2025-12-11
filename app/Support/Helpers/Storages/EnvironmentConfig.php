<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SimplyBook\Support\Helpers\Storage;

/**
 * Environment configuration helper used in DI container.
 */
final class EnvironmentConfig extends Storage
{
    public function __construct()
    {
        parent::__construct(
            require dirname(__FILE__, 5) . '/config/env.php'
        );

        if ($this->isNotEmpty('simplybook.api')) {
            $this->exposeCorrectSimplyBookEnvironment();
        }

        if ($this->isNotEmpty('simplybook.domains')) {
            $this->addStagingSimplybookDomainToDomains();
        }
    }

    /**
     * Provides the SimplyBook API environment configuration based on the
     * value of the SIMPLYBOOK_ENV constant.
     */
    private function exposeCorrectSimplyBookEnvironment()
    {
        $acceptedEnvs = ['production', 'development'];
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        if (!in_array($env, $acceptedEnvs)) {
            $env = 'production';
        }

        $correctEnv = $this->get('simplybook.api.' . $env);
        $this->set('simplybook.api', $correctEnv);
    }

    /**
     * Provides the SimplyBook domains based on the current environment.
     * If in development mode, it adds the staging domain.
     */
    public function addStagingSimplybookDomainToDomains()
    {
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        $environmentData = $this->get('simplybook.api');
        $domains = $this->get('simplybook.domains');

        if (($env === 'development') && !empty($environmentData['domain'])) {
            $domains[] = [
                'value' => 'default:' . $environmentData['domain'],
                'label' => $environmentData['domain'],
            ];
            $this->set('simplybook.domains', $domains);
        }
    }
}

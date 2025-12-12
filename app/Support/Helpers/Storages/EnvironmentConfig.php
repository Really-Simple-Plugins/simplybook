<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Helpers\DeferredObject;

/**
 * Environment configuration helper used in DI container.
 *
 * @mixin Storage This class acts as a proxy to Storage. All method calls are
 * resolved dynamically through {@see DeferredObject::__get()}
 */
final class EnvironmentConfig extends DeferredObject
{
    /**
     * @inheritDoc
     */
    protected function deferredClassString(): string
    {
        return Storage::class;
    }

    /**
     * @inheritDoc
     */
    protected function deferredConstructArguments(): array
    {
        return [
            'items' => $this->getStorageItems(),
        ];
    }

    private function getStorageItems(): array
    {
        $items = require dirname(__FILE__, 5) . '/config/env.php';

        if (isset($items['simplybook']['api'])) {
            $items = $this->exposeCorrectSimplyBookEnvironment($items);
        }

        if (isset($items['simplybook']['domains'])) {
            $items = $this->addStagingSimplybookDomainToDomains($items);
        }

        return $items;
    }

    /**
     * Provides the SimplyBook API environment configuration based on the
     * value of the SIMPLYBOOK_ENV constant.
     */
    private function exposeCorrectSimplyBookEnvironment(array $items): array
    {
        $acceptedEnvs = ['production', 'development'];
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        if (!in_array($env, $acceptedEnvs)) {
            $env = 'production';
        }

        $correctEnv = ($items['simplybook']['api'][$env] ?? []);
        $items['simplybook']['api'] = $correctEnv;
        return $items;
    }

    /**
     * Provides the SimplyBook domains based on the current environment.
     * If in development mode, it adds the staging domain.
     */
    public function addStagingSimplybookDomainToDomains(array $items): array
    {
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        $environmentData = $items['simplybook']['api'];
        $domains = $items['simplybook']['domains'];

        if (($env === 'development') && !empty($environmentData['domain'])) {
            $domains[] = [
                'value' => 'default:' . $environmentData['domain'],
                'label' => $environmentData['domain'],
            ];

            $items['simplybook']['domains'] = $domains;
        }

        return $items;
    }
}

<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Interfaces\FeatureInterface;

/**
 * This manager dynamically fetches the features of the plugin. It differs from
 * other manager classes due to this nature. By preventing any class usage of
 * features we prevent composer from loading the feature file entirely until
 * first use. This prevents overhead from loading features that are no longer
 * needed. We prevent loading feature files by utilizing the
 * {@see AbstractLoader} class at {@see FeatureManager:92}
 */
final class FeatureManager extends AbstractManager
{
    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'features';
    }

    /**
     * @inheritDoc
     */
    protected function path(): string
    {
        return $this->env->getString('plugin.features_path');
    }

    /**
     * @inheritDoc
     */
    protected function namespace(): string
    {
        return 'SimplyBook\Features\\';
    }

    /**
     * @inheritDoc
     */
    protected function suffix(): string
    {
        return 'Feature';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof FeatureInterface;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        if ($class->isEnabled() && $class->inScope()) {
            $class->boot();
        }
    }

    /**
     * @inheritDoc
     */
    public function afterRegister(): void
    {
        do_action('simplybook_features_loaded');
    }
}

<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Bootstrap\App;
use SimplyBook\Interfaces\FeatureInterface;

/**
 * This manager dynamically fetches the features of the plugin. It differs from
 * other manager classes due to this nature. By preventing any class usage of
 * features we prevent composer from loading the feature file entirely until
 * first use. This prevents overhead from loading features that are no longer
 * needed. We prevent loading feature files by utilizing the
 * {@see AbstractLoader} class at {@see FeatureManager:92}
 */
final class FeatureManager extends AbstractDynamicManager
{
    /**
     * @inheritDoc
     */
    protected function getDynamicLookupPath(): string
    {
        return $this->env->getString('plugin.features_path');
    }

    /**
     * @inheritDoc
     */
    protected function getFullQualifiedRootClass(string $namespacedPrefix): string
    {
        return $namespacedPrefix . 'Controller';
    }

    /**
     * @inheritDoc
     */
    protected function getDynamicNamespace(): string
    {
        return 'SimplyBook\Features\\';
    }

    /**
     * Override default check from parent to ensure the {Feature}Loader class
     * exists and accepts the current context.
     */
    protected function isFullDirectoryRegistrable(string $fqRootClass, string $namespacedPrefix): bool
    {
        $loaderClassString = $namespacedPrefix . 'Loader';
        if (class_exists($loaderClassString) === false) {
            return false;
        }

        $loader = App::getInstance()->make($loaderClassString, false, false);
        if (!$loader->isEnabled() || !$loader->inScope()) {
            return false;
        }

        return true;
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
        $class->register();
    }

    /**
     * @inheritDoc
     */
    public function afterRegister(): void
    {
        do_action('simplybook_features_loaded');
    }
}

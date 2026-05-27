<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\AbilityInterface;

/**
 * This manager loads Ability classes automatically from the registered
 * abilities_path from the environment configuration. To boot this process
 * call the {@see findAndRegister} method on 'init' and it will do the rest.
 *
 * To make an Ability class registrable, it must implement the naming format:
 * {AbilityName}/{AbilityName}Ability.php and implement the
 * {@see AbilityInterface} interface. For example:
 * - app/Abilities/Example/ExampleAbility.php
 * - app/Abilities/Pro/AdvancedExample/AdvancedExampleAbility.php
 */
final class AbilitiesManager extends AbstractDynamicManager
{
    use HasAllowlistControl;

    /**
     * All the registered abilities
     * @var array<string, array> name => arguments
     */
    private array $abilities = [];

    /**
     * @inheritDoc
     */
    protected function getDynamicLookupPath(): string
    {
        return $this->env->getString('plugin.abilities_path');
    }

    /**
     * @inheritDoc
     */
    protected function getFullQualifiedRootClass(string $namespacedPrefix): string
    {
        return $namespacedPrefix . 'Ability';
    }

    /**
     * @inheritDoc
     */
    protected function getDynamicNamespace(): string
    {
        return 'SimplyBook\Abilities\\';
    }

    /**
     * Ensure that the AbilitiesManager is initialized during the "init" action
     * to enable it to hook into the WP Abilities API via {@see afterRegister}
     * correctly.
     * @throws \LogicException if not called during the "init" action
     */
    protected function beforeFindAndRegister(): void
    {
        if (current_filter() !== 'init') {
            throw new \LogicException('The AbilitiesManager must be initialized during the "init" action.');
        }
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof AbilityInterface;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        $this->abilities[$class->getName()] = $class->toArray();
    }

    /**
     * Hook into the WP Abilities API. This is done here to ensure that all
     * abilities have been registered before hooking.
     */
    public function afterRegister(): void
    {
        add_action('wp_abilities_api_categories_init', [$this, 'registerAbilitiesCategory']);
        add_action('wp_abilities_api_init', [$this, 'registerAbilities']);

        do_action('simplybook_abilities_loaded');
    }

    /**
     * Register the SimplyBook abilities category that we use for all the
     * plugin abilities
     * @internal Should be called from wp_abilities_api_categories_init action
     */
    public function registerAbilitiesCategory(): void
    {
        wp_register_ability_category( // @phpstan-ignore-line function.notFound
            $this->config->getString('abilities.category', 'simplybook'),
            [
                'label' => __('SimplyBook plugin abilities', 'simplybook'),
                'description' => __('Abilities related to the SimplyBook plugin.', 'simplybook'),
            ]
        );
    }

    /**
     * Register all the SimplyBook plugin abilities with the WP Abilities API,
     * using the registered abilities from the {@see registerClass} method.
     * @internal Should be called from wp_abilities_api_init action
     */
    public function registerAbilities(): void
    {
        foreach ($this->abilities as $name => $arguments) {
            $arguments['category'] ??= $this->config->getString('abilities.category', 'simplybook');
            $prefixedAbilityName = ($this->config->getString('abilities.namespace', 'simplybook') . '/' . $name);
            wp_register_ability($prefixedAbilityName, $arguments); // @phpstan-ignore-line function.notFound
        }
    }
}

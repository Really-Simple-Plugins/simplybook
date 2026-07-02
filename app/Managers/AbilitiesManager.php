<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use LogicException;
use WP_Abilities_Registry;
use WP_Ability_Categories_Registry;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;

/**
 * To boot this manager call the {@see register} method on 'init' and it will
 * do the rest.
 */
final class AbilitiesManager extends AbstractManager
{
    use HasAllowlistControl;

    /**
     * Config used to read ability information
     */
    private GeneralConfig $config;

    /**
     * All the registered abilities
     * @var array<string, array> name => arguments
     */
    private array $abilities = [];

    /**
     * Bind the config
     */
    public function __construct(GeneralConfig $config)
    {
        $this->config = $config;
    }

    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'abilities';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return $class instanceof AbstractAbility;
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        $this->abilities[$class->getName()] = $class->toArray();
    }

    /**
     * Ensure that the AbilitiesManager is initialized during the "init" action
     * to enable it to hook into the WP Abilities API via {@see afterRegister}
     * correctly.
     * @throws LogicException if not called during the "init" action
     */
    protected function beforeRegister(): void
    {
        if (current_filter() !== 'init') {
            throw new LogicException('The AbilitiesManager must be initialized during the "init" action.');
        }
    }

    /**
     * Hook into the WP Abilities API. This is done here to ensure that all
     * abilities have been registered before hooking.
     */
    public function afterRegister(): void
    {
        add_action('wp_abilities_api_categories_init', [$this, 'registerAbilitiesCategory']);
        add_action('wp_abilities_api_init', [$this, 'registerAbilities']);
    }

    /**
     * Register the SimplyBook abilities category that we use for all the
     * plugin abilities
     * @internal Should be called from wp_abilities_api_categories_init action
     */
    public function registerAbilitiesCategory(WP_Ability_Categories_Registry $registry): void
    {
        $registry->register(
            $this->config->getString('abilities.category', 'simplybook'),
            [
                'label' => __('SimplyBook.me plugin abilities', 'simplybook'),
                'description' => __('Abilities related to the SimplyBook.me plugin.', 'simplybook'),
            ]
        );
    }

    /**
     * Register all the SimplyBook plugin abilities with the WP Abilities API,
     * using the registered abilities from the {@see registerClass} method.
     * @internal Should be called from wp_abilities_api_init action
     */
    public function registerAbilities(WP_Abilities_Registry $registry): void
    {
        foreach ($this->abilities as $name => $arguments) {
            $arguments['category'] ??= $this->config->getString('abilities.category', 'simplybook');
            $prefixedAbilityName = ($this->config->getString('abilities.namespace', 'simplybook') . '/' . $name);
            $registry->register($prefixedAbilityName, $arguments);
        }
    }
}

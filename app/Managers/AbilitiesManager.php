<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use LogicException;
use WP_Abilities_Registry;
use WP_Ability_Categories_Registry;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Abilities\AbstractAbilityCategory;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * To boot this manager call the {@see register} method on 'init' and it will
 * do the rest.
 */
final class AbilitiesManager extends AbstractManager
{
    use HasAllowlistControl;

    /**
     * Used to read environment variables
     */
    private EnvironmentConfig $env;

    /**
     * All the registered abilities
     * @var array<string, array> name => arguments
     */
    private array $abilities = [];

    /**
     * All the categories of the registered abilities
     * @var array<string, AbstractAbilityCategory>
     */
    private array $categories = [];

    /**
     * Bind the config
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
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
     * Method is used to store the given classes in the {@see abilities}
     * property. Each {@see AbstractAbility} class registers their category in
     * the {@see categories} property.
     */
    public function registerClass(object $class): void
    {
        $name = sanitize_key($class->getName());
        $categorySlug = sanitize_key($class->getCategorySlug());

        $this->abilities[$name] = $class->toArray();
        $this->categories[$categorySlug] = $class->getCategoryInstance();
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
     * Register the {@see AbstractAbilityCategory} categories stored in the
     * {@see categories} property.
     * @internal Should be called from wp_abilities_api_categories_init action
     */
    public function registerAbilitiesCategory(WP_Ability_Categories_Registry $registry): void
    {
        foreach ($this->categories as $category) {
            $categorySlug = sanitize_title($category->getSlug());
            $registry->register($categorySlug, [
                'label' => sanitize_text_field($category->getLabel()),
                'description' => sanitize_text_field($category->getDescription()),
            ]);
        }
    }

    /**
     * Register all the plugin abilities with the WP Abilities API, using the
     * registered abilities from the {@see registerClass} method.
     * @internal Should be called from wp_abilities_api_init action
     */
    public function registerAbilities(WP_Abilities_Registry $registry): void
    {
        foreach ($this->abilities as $arguments) {
            $name = sanitize_text_field($arguments['name']);
            $namespace = $this->env->getString('plugin.namespace', 'simplybook');

            $registry->register(($namespace . '/' . $name), $arguments);
        }
    }
}

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
     * All the categories of the registered abilities
     * @var array<string, array> slug => arguments. Arguments documented
     * here: {@see AbstractAbility::getCategory()}
     */
    private array $categories = [];

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

        $this->registerCategory(
            $class->getCategory()
        );
    }

    /**
     * Register the given category if it is valid.
     */
    private function registerCategory(?array $category): void
    {
        if ($this->isValidCategory($category)) {
            return;
        }

        $slug = sanitize_title($category['slug']);
        $this->categories[$slug] = $category;
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
     * Register the default plugin category and register the specific categories
     * defined by the ability classes.
     * @internal Should be called from wp_abilities_api_categories_init action
     * @throws LogicException if the default abilities category is not valid
     */
    public function registerAbilitiesCategory(WP_Ability_Categories_Registry $categories): void
    {
        if (!$this->isValidCategory($this->config->get('abilities.category'))) {
            throw new LogicException('The default abilities category is not valid.');
        }

        $categories->register(
            $this->config->getTitle('abilities.category.slug', 'simplybook'),
            [
                'label' => $this->config->getString('abilities.category.label', 'simplybook'),
                'description' => $this->config->getString('abilities.category.description', 'simplybook'),
            ]
        );

        foreach ($this->categories as $category) {
            if (!$this->isValidCategory($category)) {
                continue;
            }

            $slug = sanitize_title($category['slug']);
            $categories->register($slug, [
                'label' => sanitize_text_field($category['label']),
                'description' => sanitize_text_field($category['description']),
            ]);
        }
    }

    /**
     * Register all the plugin abilities with the WP Abilities API, using the
     * registered abilities from the {@see registerClass} method.
     * @internal Should be called from wp_abilities_api_init action
     */
    public function registerAbilities(WP_Abilities_Registry $abilities): void
    {
        foreach ($this->abilities as $name => $arguments) {
            $arguments['category'] ??= $this->config->getTitle('abilities.category.slug', 'simplybook');
            $prefixedAbilityName = ($this->config->getString('abilities.namespace', 'simplybook') . '/' . $name);
            $abilities->register($prefixedAbilityName, $arguments);
        }
    }

    /**
     * A category is valid if it has a name, label and description. As per
     * documentation: {@see AbstractAbility::getCategory}
     */
    private function isValidCategory(?array $category): bool
    {
        if (is_null($category)) {
            return false;
        }

        return isset($category['slug'], $category['label'], $category['description']);
    }
}

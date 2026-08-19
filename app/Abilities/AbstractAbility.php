<?php

declare(strict_types=1);

namespace SimplyBook\Abilities;

use Throwable;
use RuntimeException;
use ReflectionException;
use InvalidArgumentException;
use SimplyBook\Bootstrap\App;

abstract class AbstractAbility
{
    /**
     * Get the singleton instance of the Ability class from the container.
     * @uses App::get()
     * @throws ReflectionException If class cannot be resolved from container.
     */
    public static function instance(): AbstractAbility
    {
        return App::getInstance()->get(static::class);
    }

    /**
     * Required. Return the human-readable label for the ability.
     * @see wp_register_ability For details about the label usage.
     */
    abstract public function getLabel(): string;

    /**
     * Required. A detailed description of what the ability does and when it
     * should be used.
     * @see wp_register_ability For details about the description usage.
     */
    abstract public function getDescription(): string;

    /**
     * Optional. JSON Schema definition for the ability's output. Describes the
     * structure of successful return values from `execute_callback`. Used for
     * documentation and validation.
     * @see wp_register_ability For details about the schema array structure.
     */
    abstract public function getOutputSchema(): ?array;

    /**
     * Subclasses must provide the execute-callable for this ability.
     *
     * Example:
     *
     *      return static function () {
     *          return true;// Your logic here
     *      }
     */
    abstract protected function getExecuteCallback(): ?callable;

    /**
     * Subclasses must provide the permission callable for this ability.
     *
     * Example:
     *
     *      return static function () {
     *          return true; // Your logic here
     *      };
     */
    abstract protected function getPermissionCallback(): ?callable;

    /**
     * Get the ability name defined in the subclass constant NAME. Can only
     * contain lowercase letters and hyphens. Documented here:
     * {@see wp_register_ability}
     *
     * Example
     *
     *     const NAME = 'my-ability-name';
     */
    final public function getName(): string
    {
        if (!defined('static::NAME')) {
            throw new RuntimeException('Ability NAME constant not defined in class: ' . static::class);
        }

        return static::NAME;
    }

    /**
     * Optional input schema for the ability. Only needed if the ability
     * requires input arguments. A subclass may override to provide specific
     * input schema.
     * @see wp_register_ability For details about the schema array structure.
     */
    public function getInputSchema(): ?array
    {
        return null;
    }

    /**
     * Optional meta information about the ability. A subclass may override
     * to provide specific metadata.
     * @see wp_register_ability For details about the meta array structure.
     */
    public function getMeta(): ?array
    {
        return null;
    }

    /**
     * Optional. A child class may provide a specific category for the ability.
     * Is automatically detected and registered, in time, by the
     * {@see AbilitiesManager::registerAbilitiesCategory} method. If not
     * provided, the default category is used.
     *
     * @return class-string<AbstractAbilityCategory>
     */
    public function getCategory(): string
    {
        return DefaultAbilityCategory::class;
    }

    /**
     * Get the category instance from the container. If the category is not
     * resolvable from the container, a new instance is created.
     * @uses App::get()
     */
    final public function getCategoryInstance(): AbstractAbilityCategory
    {
        try {
            return App::getInstance()->get($this->getCategory());
        } catch (Throwable $e) {
            $class = $this->getCategory();
            return new $class();
        }
    }

    /**
     * Method is used in the {@see toArray} method to get the category slug for
     * registration in {@see AbilitiesManager::registerAbilities}.
     *
     * @throws InvalidArgumentException If category misses slug.
     */
    final public function getCategorySlug(): string
    {
        $category = $this->getCategoryInstance();
        return $category->getSlug();
    }

    /**
     * Convert the ability to an array suitable for registration with the
     * WP Abilities API. Empty values are omitted from the array. Registration
     * is done in {@see AbilitiesManager::registerAbilities}.
     */
    final public function toArray(): array
    {
        return array_filter([
            'category' => $this->getCategorySlug(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'input_schema' => $this->getInputSchema(),
            'output_schema' => $this->getOutputSchema(),
            'meta' => $this->getMeta(),
            'execute_callback' => $this->getExecuteCallback(),
            'permission_callback' => $this->getPermissionCallback(),
        ]);
    }
}

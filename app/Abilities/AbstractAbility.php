<?php

declare(strict_types=1);

namespace SimplyBook\Abilities;

use WP_Error;
use RuntimeException;
use InvalidArgumentException;
use SimplyBook\Bootstrap\App;
use SimplyBook\Exceptions\AbilityFailedException;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;
use SimplyBook\Exceptions\AbilityApiUnavailableException;

abstract class AbstractAbility
{
    /**
     * Property may be overridden child-classes via dependency-injection. If
     * that is not done, the config is lazy-loaded in the {@see config()}
     * method and used in {@see execute()} and {@see abilityAlreadyRegistered()}.
     */
    protected GeneralConfig $config;

    /**
     * @var callable|null
     */
    protected $executeCallback = null;

    /**
     * @var callable|null
     */
    protected $permissionCallback = null;

    /**
     * Get the singleton instance of the Ability class from the container.
     * @uses App::get()
     * @throws \ReflectionException If class cannot be resolved from container.
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
     * Get the ability name defined in the subclass constant NAME. Can only
     * contain lowercase letters and hyphens.
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

        $name = static::NAME;

        if (preg_match('/^[a-z\-]+$/', $name) !== 1) {
            throw new RuntimeException('Ability NAME constant must contain only lowercase letters and hyphens: ' . static::class);
        }

        return $name;
    }

    /**
     * Subclasses may override to provide a (static) default execute callable.
     */
    protected function executeCallback(): ?callable
    {
        return $this->executeCallback;
    }

    /**
     * Set the execute callback for this ability. Can be used by classes like
     * Controllers or Endpoints to set custom callbacks.
     *
     * Example usage to set custom callbacks:
     *
     *     // Hook in the register (or a similar) method
     *     add_filter('simplybook_plugin_abilities', [$this, 'registerAbilities']);
     *
     *     // Register the ability with custom callbacks
     *     public function registerAbilities(array $abilities = []): array
     *     {
     *         $customAbility = App::getInstance()->get(CustomAbility::class);
     *         $customAbility->setExecuteCallback([$this, 'customExecuteFunction']);
     *
     *         $abilities[$customAbility->getName()] = $customAbility->toArray();
     *         return $abilities;
     *     }
     *
     *     // Custom execute function
     *     public function customExecuteFunction($arguments)
     *     {
     *        // Logic here is executed when the CustomAbility is executed
     *        // via: CustomAbility::instance()->execute($arguments);
     *     }
     *
     * @throws RuntimeException If the ability is already registered.
     * @throws InvalidArgumentException If provided callback is not callable.
     */
    public function setExecuteCallback(callable $callback): void
    {
        if ($this->abilityAlreadyRegistered()) {
            throw new RuntimeException('Cannot set execute callback after ability is registered: ' . static::class);
        }

        $this->executeCallback = $callback;
    }

    /**
     * Prefer instance-set callback; fall back to a static default provided by
     * the subclass.
     * @throws RuntimeException If no execute callback is available.
     */
    private function getExecuteCallback(): callable
    {
        if (is_callable($this->executeCallback)) {
            return $this->executeCallback;
        }

        $default = $this->executeCallback();
        if (is_callable($default)) {
            return $default;
        }

        throw new RuntimeException('Execute callback not set for ability: ' . static::class);
    }

    /**
     * Subclasses may override to provide a (static) default permission callable.
     */
    protected function permissionCallback(): ?callable
    {
        return $this->permissionCallback;
    }

    /**
     * Set the permission callback for this ability. Can be used by classes
     * like Controllers or Endpoints to set custom callbacks.
     *
     * Example usage to set custom callbacks:
     *
     *     // Hook in the register (or a similar) method
     *     add_filter('simplybook_plugin_abilities', [$this, 'registerAbilities']);
     *
     *     // Register the ability with custom callbacks
     *     public function registerAbilities(array $abilities = []): array
     *     {
     *         $customAbility = App::getInstance()->get(CustomAbility::class);
     *         $customAbility->setPermissionCallback([$this, 'customPermissionFunction']);
     *
     *         $abilities[$customAbility->getName()] = $customAbility->toArray();
     *         return $abilities;
     *     }
     *
     *     // Custom permission function
     *     public function customPermissionFunction()
     *     {
     *        // Logic here is executed when checking permissions for the
     *        // CustomAbility via: CustomAbility::instance()->execute($arguments);
     *     }
     *
     * @throws RuntimeException If the ability is already registered.
     * @throws InvalidArgumentException If provided callback is not callable.
     */
    public function setPermissionCallback(callable $callback): void
    {
        if ($this->abilityAlreadyRegistered()) {
            throw new RuntimeException('Cannot set permission callback after ability is registered: ' . static::class);
        }

        $this->permissionCallback = $callback;
    }

    /**
     * Prefer instance-set permission callback; fall back to a static default.
     * @throws RuntimeException If no permission callback is available.
     */
    private function getPermissionCallback(): callable
    {
        if (is_callable($this->permissionCallback)) {
            return $this->permissionCallback;
        }

        $default = $this->permissionCallback();
        if (is_callable($default)) {
            return $default;
        }

        throw new RuntimeException('Permission callback not set for ability: ' . static::class);
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
     * Default category is set in {@see AbilitiesManager::registerAbilities},
     * but a subclass may override to provide a specific category. Make sure
     * to register the category earlier in the WordPress lifecycle if using
     * a custom one.
     */
    public function getCategory(): ?string
    {
        return null;
    }

    /**
     * Convert the ability to an array suitable for registration with the
     * WP Abilities API. Registration is done in
     * {@see AbilitiesManager::registerAbilities}.
     */
    final public function toArray(): array
    {
        return array_filter([
            'category' => $this->getCategory(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'input_schema' => $this->getInputSchema(),
            'output_schema' => $this->getOutputSchema(),
            'meta' => $this->getMeta(),
            'execute_callback' => $this->getExecuteCallback(),
            'permission_callback' => $this->getPermissionCallback(),
        ]);
    }

    /**
     * Execute the ability via the WP Abilities API.
     *
     * @param mixed|null $arguments Arguments to pass to the execute callback.
     * Should follow the input schema defined by {@see static::getInputSchema()}.
     *
     * @return mixed|WP_Error The result of the ability execution, `null` if the
     * ability is not registered, `false` if the WP Abilities API is not
     * available.
     *
     * @throws AbilityFailedException|AbilityApiUnavailableException
     */
    final public function execute($arguments = null)
    {
        if (!function_exists('wp_has_ability') || !function_exists('wp_get_ability')) {
            throw new AbilityApiUnavailableException('WP Abilities API not available.');
        }

        $namespacedAbilityName = $this->getNamespacedName();
        if (wp_has_ability($namespacedAbilityName) === false) {
            throw new AbilityFailedException('Ability not registered: ' . $namespacedAbilityName);
        }

        $ability = wp_get_ability($namespacedAbilityName);
        $result = $ability->execute($arguments);

        if (is_wp_error($result)) {
            throw (
                new AbilityFailedException($result->get_error_message())
            )->setWpError($result);
        }

        return $result;
    }

    /**
     * Method is used to build and return the full namespace of the ability.
     * @uses config()->getString('abilities.namespace', 'simplybook')
     * @uses getName()
     */
    private function getNamespacedName(): string
    {
        return ($this->config()->getString('abilities.namespace', 'simplybook') . '/' . $this->getName());
    }

    /**
     * Helper method to check if the ability is already registered in the
     * WP Abilities API. Useful to prevent manipulating the ability after
     * registration.
     */
    private function abilityAlreadyRegistered(): bool
    {
        if (!function_exists('wp_has_ability')) {
            return false;
        }

        return wp_has_ability($this->getNamespacedName());
    }

    /**
     * Get the GeneralConfig instance from the container. Not via a construct
     * (dependency-injection) to allow child-classes to have a constructor
     * without needing to call parent::__construct().
     */
    private function config(): GeneralConfig
    {
        if (!isset($this->config)) {
            $this->config = App::getInstance()->get(GeneralConfig::class);
        }

        return $this->config;
    }
}

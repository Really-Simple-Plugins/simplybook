<?php
namespace SimplyBook\Http\Entities;

use SimplyBook\App;
use SimplyBook\Http\ApiClient;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Exceptions\FormException;

abstract class AbstractEntity
{
    /**
     * Get the remote endpoint URL for this entity. Used internally in the
     * entity class for easy access.
     */
    abstract public function getEndpoint(): string;

    /**
     * Get the internal endpoint URL for this entity. Used for registering
     * the REST API routes. For an example see:
     * {@see \SimplyBook\Http\Endpoints\AbstractCrudEndpoint::registerRoutes}
     */
    abstract public function getInternalEndpoint(): string;

    /**
     * Method should return an array of known errors per attribute. When an
     * entity is updates or created the remote could return error messages
     * per attribute that are not user-friendly. In those cases we translate
     * known errors this way. For the implementation
     * {@see \SimplyBook\Http\Endpoints\AbstractCrudEndpoint::buildTranslatedErrors}
     *
     * @example:
     * [
     *      'attribute_x' => [
     *          'not dynamic part of error string' => esc_html__('User friendly translation of error.', 'simplybook'),
     *      ],
     *      // Real example from the {@see Service} class:
     *      'duration' => [
     *          // "Duration is not multiple of '60' minutes"
     *          'is not multiple of' => esc_html__('Duration invalid. Please enter a valid number that is a multiple of your selected timeframe.', 'simplybook'),
     *       ]
     * ]
     */
    abstract public function getKnownErrors(): array;

    /**
     * The client to do API requests with.
     */
    protected ApiClient $client;

    /**
     * The entity's fillable attributes
     */
    protected array $fillable = [];

    /**
     * The entity's required attributes
     */
    protected array $required = [];

    /**
     * The entity's attributes
     */
    protected array $attributes = [];

    /**
     * The entity's changed attributes
     */
    protected array $attribute_changes = [];

    /**
     * Register the initialized state of this entity for dirty attributes
     * registration
     */
    protected bool $initializing = false;

    /**
     * Name of the primary key for this entity
     */
    protected string $primaryKey = 'id';

    /**
     * Entity constructor. Will always provide the API client to the child
     * entity class. It is used to do API requests.
     */
    public function __construct()
    {
        $this->client = App::provide('client');
        $this->registerConditionalProperties();
    }

    /**
     * Method is used to register conditional properties or attributes
     * that should be available in the entity. It is called after the
     * constructor.
     *
     * @internal This method is intended to be overridden by child classes. For
     * example, when the entity has properties that should only be registered
     * when a special feature is used by the user in SimplyBook.me.
     */
    public function registerConditionalProperties(): void
    {
        /**
         *  @example
         *  if ($this->client->isSpecialFeatureEnabled('paid_events')) {
         *      $this->fillable[] = 'price';
         *      $this->required[] = 'price';
         *  }
         */
    }

    /**
     * Get the entity's attributes.
     */
    public function attributes(): array
    {
        return $this->attributes;
    }

    /**
     * Fill the entity from an array. Use `$first_initialize` to determine if
     * this is the first time the entity is being initialized. If it is, the
     * `reset()` method will be called to clear any previous attributes
     * and changes to make sure the entity is in a clean state.
     */
    public function fill(array $attributes, bool $first_initialize = true): void
    {
        if ($first_initialize) {
            $this->reset();
            $this->enableFirstInitialize();
        }

        foreach ($this->fillableFromArray($attributes) as $key => $value) {
            if ($this->isFillable($key)) {
                $this->setAttribute($key, $value);
            }
        }

        if ($first_initialize) {
            $this->disableFirstInitialize();
        }
    }

    /**
     * Register the current entity as initializing.
     */
    protected function enableFirstInitialize()
    {
        $this->initializing = true;
    }

    /**
     * Register the current entity as initialized.
     */
    protected function disableFirstInitialize()
    {
        $this->initializing = false;
    }

    /**
     * Get the fillable attributes of an array.
     */
    protected function fillableFromArray(array $attributes): array
    {
        if (count($this->fillable) > 0) {
            return array_intersect_key($attributes, array_flip($this->fillable));
        }

        return $attributes;
    }

    /**
     * Check if the key is fillable.
     */
    protected function isFillable($key): bool
    {
        return in_array($key, $this->fillable, true);
    }

    /**
     * Set an attribute and register it as changed if it is different from the
     * previous value.
     */
    protected function setAttribute(string $key, $value): void
    {
        $setterMethod = 'set' . StringUtility::snakeToUpperCamelCase($key) . 'Attribute';

        if (method_exists($this, $setterMethod)) {
            $value = $this->$setterMethod($value);
        }

        // If the entity is initializing, we do not register changes
        if ($this->initializing) {
            $this->attributes[$key] = $value;
            return;
        }

        if (! isset($this->attribute_changes[$key])) {
            $from = null;

            if (isset($this->attributes[$key])) {
                $from = $this->attributes[$key];
            }

            $this->attribute_changes[$key] = [
                'from' => $from,
                'to' => $value,
            ];
        } else {
            $this->attribute_changes[$key]['to'] = $value;
        }

        $this->attributes[$key] = $value;
    }

    /**
     * Check if the entity exists by checking if the primary key is set in
     * the attributes and is not empty.
     * @internal This does NOT check if the entity exists in the API!
     */
    public function exists(): bool
    {
        if (!array_key_exists($this->primaryKey, $this->attributes)) {
            return false;
        }

        return !empty($this->attributes[$this->primaryKey]);
    }

    /**
     * Determine if an attribute exists on the entity.
     */
    public function has(string $name): bool
    {
        return isset($this->attributes[$name]) && null !== $this->attributes[$name];
    }

    /**
     * Convert the entity to a JSON string.
     */
    public function json(): string
    {
        return json_encode($this->attributes());
    }

    /**
     * Validate the required attributes of the entity. Errors format should be
     * consistent with
     * {@see \SimplyBook\Http\Endpoints\AbstractCrudEndpoint::processAttributesException}
     *
     * @throws FormException
     */
    public function validate(): bool
    {
        $errors = [];

        if ($this->exists()) {
            $this->required[] = $this->primaryKey;
        }

        foreach ($this->required as $attribute) {
            $requiredFieldIsEmpty = (
                !isset($this->attributes[$attribute])
                || ($this->attributes[$attribute] === null || $this->attributes[$attribute] === '')
            );

            if ($requiredFieldIsEmpty) {
                $errors[$attribute] = [
                    esc_html__('Field is required.', 'simplybook'),
                ];
            }
        }

        if (!empty($errors)) {
            throw (new FormException())->setErrors($errors);
        }

        return true;
    }

    /**
     * Check if the entity has any dirty attributes.
     */
    public function isDirty(): bool
    {
        return !empty($this->attribute_changes);
    }

    /**
     * All keys that are changed in this entity.
     */
    public function getDirty(): array
    {
        return array_keys($this->attribute_changes);
    }

    /**
     * All changed keys with it values.
     */
    public function getDirtyValues(): array
    {
        return $this->attribute_changes;
    }

    /**
     * Clear the changed/dirty attribute in this entity.
     */
    public function clearDirty(): void
    {
        $this->attribute_changes = [];
    }

    /**
     * Check if the attribute is changed since the last save/update/create
     * action.
     */
    public function isAttributeDirty(string $attributeName): bool
    {
        if (array_key_exists($attributeName, $this->attribute_changes)) {
            return true;
        }

        return false;
    }

    /**
     * Reset all attributes and changes in this entity. This is useful when you
     * want to reset the entity to a clean state.
     */
    public function reset(): void
    {
        $this->attributes = [];
        $this->attribute_changes = [];
        $this->initializing = false;
    }

    /**
     * Get an attribute value.
     * @return mixed
     */
    public function __get(string $key)
    {
        if (isset($this->attributes[$key]) === false) {
            return null;
        }

        $getterMethod = 'get' . StringUtility::snakeToUpperCamelCase($key) . 'Attribute';
        if (method_exists($this, $getterMethod)) {
            return $this->$getterMethod($this->attributes[$key]);
        }

        return $this->attributes[$key];
    }

    /**
     * Set an attribute value.
     * @param mixed $value
     */
    public function __set(string $key, $value): void
    {
        if ($this->isFillable($key)) {
            $this->setAttribute($key, $value);
        }
    }

    /**
     * Find a entity by ID. If no ID is provided, use the current instance.
     * Throws an exception if the entity is not found.
     * @throws \Exception|RestDataException
     */
    public function find(string $id = ''): AbstractEntity
    {
        $id = ($id ?: $this->id);

        $endpoint = trailingslashit($this->getEndpoint()) . sanitize_text_field($id);
        $entityData = $this->client->get($endpoint);

        if (empty($entityData)) {
            throw new RestDataException('Entity not found');
        }

        $this->fill($entityData);
        return $this;
    }

    /**
     * Get all entities from the SimplyBook API.
     * @internal Override this method if you want to customize the logic.
     */
    public function all(): array
    {
        try {
            $response = $this->client->get($this->getEndpoint());
        } catch (\Throwable $e) {
            return [];
        }

        return ($response['data'] ?? []);
    }

    /**
     * Update the entity in the SimplyBook API. Exceptions should be handled
     * by the caller for specific error handling.
     * @throws FormException|RestDataException
     * @internal Override this method if you want to customize the logic.
     */
    public function update(): bool
    {
        $this->validate();

        $endpoint = trailingslashit($this->getEndpoint()) . sanitize_text_field($this->id);
        $this->client->put($endpoint, $this->json());

        return true;
    }

    /**
     * Delete the entity from the SimplyBook API. Either delete the current
     * instance or a specific entity by ID. Exceptions should be handled
     * by the caller for specific error handling.
     * @throws \InvalidArgumentException|RestDataException
     * @internal Override this method if you want to customize the logic.
     */
    public function delete(string $id = ''): bool
    {
        $id = ($id ?: $this->id);
        if (empty($id)) {
            throw new \InvalidArgumentException('Entity ID is required for deletion');
        }

        $endpoint = trailingslashit($this->getEndpoint()) . $id;
        $this->client->delete($endpoint);

        return true;
    }

    /**
     * Create a new entity in the SimplyBook API. Use the attributes to
     * build the entity before validating and sending the request.
     * @throws \InvalidArgumentException|RestDataException
     * @internal Override this method if you want to customize the logic.
     */
    public function create(array $attributes = []): AbstractEntity
    {
        if (!empty($attributes)) {
            $this->fill($attributes);
        }

        $this->validate();

        $response = $this->client->post(
            $this->getEndpoint(),
            $this->json()
        );

        if (empty($response[$this->primaryKey])) {
            throw new RestDataException('Failed to create new entity');
        }

        $this->{$this->primaryKey} = $response[$this->primaryKey];
        return $this;
    }
}
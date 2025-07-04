<?php
namespace SimplyBook\Models;

/**
 * Base model class for SimplyBook entities.
 * Provides common functionality for model classes.
 */
abstract class BaseModel
{
    protected array $attributes = [];
    protected array $fillable = [];
    protected array $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->fill($attributes);
    }

    /**
     * Fill the model with an array of attributes
     */
    public function fill(array $attributes): static
    {
        foreach ($attributes as $key => $value) {
            if (in_array($key, $this->fillable) || empty($this->fillable)) {
                $this->setAttribute($key, $value);
            }
        }

        return $this;
    }

    /**
     * Set an attribute
     */
    public function setAttribute(string $key, $value): void
    {
        $this->attributes[$key] = $this->castAttribute($key, $value);
    }

    /**
     * Get an attribute
     */
    public function getAttribute(string $key)
    {
        return $this->attributes[$key] ?? null;
    }

    /**
     * Cast an attribute to its proper type
     */
    protected function castAttribute(string $key, $value)
    {
        if (isset($this->casts[$key])) {
            return match ($this->casts[$key]) {
                'int', 'integer' => (int) $value,
                'float' => (float) $value,
                'bool', 'boolean' => (bool) $value,
                'string' => (string) $value,
                'array' => is_array($value) ? $value : [],
                default => $value,
            };
        }

        return $value;
    }

    /**
     * Magic getter
     */
    public function __get(string $key)
    {
        return $this->getAttribute($key);
    }

    /**
     * Magic setter
     */
    public function __set(string $key, $value): void
    {
        $this->setAttribute($key, $value);
    }

    /**
     * Check if attribute exists
     */
    public function __isset(string $key): bool
    {
        return isset($this->attributes[$key]);
    }

    /**
     * Convert to array
     */
    public function toArray(): array
    {
        return $this->attributes;
    }

    /**
     * Get the model's ID
     */
    public function getId(): ?int
    {
        return $this->getAttribute('id');
    }

    /**
     * Check if model has been persisted (has ID)
     */
    public function exists(): bool
    {
        return !is_null($this->getId());
    }

    /**
     * Update the model with new attributes and save
     * Usage: $provider->update(['name' => 'FooBar'])
     */
    public function update(array $attributes): static
    {
        $this->fill($attributes);
        
        // Get the repository instance to save the model
        $client = \SimplyBook\App::provide('client');
        $resourceName = strtolower(class_basename(static::class));
        
        if (method_exists($client, $resourceName)) {
            $repository = $client->$resourceName();
            return $repository->save($this);
        }
        
        throw new \RuntimeException("Cannot update model: repository method '{$resourceName}' not found on client");
    }
}
<?php
namespace SimplyBook\Models;

/**
 * Simple base model for SimplyBook resources
 * 
 * This is a greatly simplified version that just wraps the API client methods
 * and provides a clean interface for CRUD operations.
 * 
 * @package SimplyBook\Models
 */
abstract class AbstractModel
{
    protected $attributes = [];
    protected $fillable = [];
    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->fill($attributes);
    }

    /**
     * Fill the model with attributes
     */
    public function fill(array $attributes)
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
    public function setAttribute(string $key, $value)
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
     * Cast an attribute to the correct type
     */
    protected function castAttribute(string $key, $value)
    {
        if (!isset($this->casts[$key])) {
            return $value;
        }

        $cast = $this->casts[$key];
        
        if ($cast === 'int') {
            return (int) $value;
        } elseif ($cast === 'float') {
            return (float) $value;
        } elseif ($cast === 'bool') {
            return (bool) $value;
        } elseif ($cast === 'string') {
            return (string) $value;
        }
        
        return $value;
    }

    /**
     * Magic getter - allows $model->attribute access
     */
    public function __get(string $key)
    {
        $method = 'get' . ucfirst($key) . 'Attribute';
        if (method_exists($this, $method)) {
            return $this->$method();
        }
        return $this->getAttribute($key);
    }

    /**
     * Magic setter - allows $model->attribute = value
     */
    public function __set(string $key, $value)
    {
        $this->setAttribute($key, $value);
    }

    /**
     * Check if attribute exists
     */
    public function has(string $key): bool
    {
        return array_key_exists($key, $this->attributes);
    }

    /**
     * Check if model exists (has ID)
     */
    public function exists(): bool
    {
        return !empty($this->getAttribute('id'));
    }

    /**
     * Convert model to array
     */
    public function toArray(): array
    {
        return $this->attributes;
    }

    /**
     * Get all models of this type
     */
    public static function all(): array
    {
        $className = get_called_class();
        $singular = strtolower(basename(str_replace('\\', '/', $className)));
        
        // Convert singular class names to plural API method names
        // Model classes are named Provider/Service (singular)
        // But ApiClient methods are get_providers/get_services (plural)
        if ($singular === 'provider') {
            $resourceName = 'providers';
        } elseif ($singular === 'service') {
            $resourceName = 'services';
        }
        
        $client = \SimplyBook\App::provide('client');
        $methodName = 'get_' . $resourceName;
        
        if (!method_exists($client, $methodName)) {
            throw new \RuntimeException("Cannot fetch models: API method '{$methodName}' not found on client");
        }
        
        $data = $client->$methodName();
        
        $models = [];
        foreach ($data as $item) {
            $models[] = new static($item);
        }
        
        return $models;
    }

    /**
     * Find a model by ID
     */
    public static function find(int $id)
    {
        $items = static::all();
        
        foreach ($items as $item) {
            if ($item->id === $id) {
                return $item;
            }
        }
        
        return null;
    }

    /**
     * Create a new model
     */
    public static function create(array $attributes)
    {
        $model = new static($attributes);
        return $model->save();
    }

    /**
     * Update the model
     */
    public function update(array $attributes)
    {
        $this->fill($attributes);
        return $this->save();
    }

    /**
     * Save the model (create or update)
     */
    public function save()
    {
        $className = get_called_class();
        $singular = strtolower(basename(str_replace('\\', '/', $className)));
        $resourceName = ucfirst($singular); // Provider or Service
        
        $client = \SimplyBook\App::provide('client');
        
        if ($this->exists()) {
            // Update existing model (call updateProvider or updateService)
            $methodName = 'update' . $resourceName;
            if (!method_exists($client, $methodName)) {
                throw new \RuntimeException("Cannot update model: API method '{$methodName}' not found on client");
            }
            $result = $client->$methodName($this->id, $this->toArray());
        } else {
            // Create new model (call createProvider or createService)
            $methodName = 'create' . $resourceName;
            if (!method_exists($client, $methodName)) {
                throw new \RuntimeException("Cannot create model: API method '{$methodName}' not found on client");
            }
            $result = $client->$methodName($this->toArray());
        }
        
        // Update model with result from API
        $this->fill($result);
        return $this;
    }

    /**
     * Delete the model
     */
    public function delete(): bool
    {
        if (!$this->exists()) {
            throw new \InvalidArgumentException('Cannot delete model without ID');
        }
        
        $className = get_called_class();
        $singular = strtolower(basename(str_replace('\\', '/', $className)));
        $resourceName = ucfirst($singular); // Provider or Service
        
        $client = \SimplyBook\App::provide('client');
		// call deleteProvider or deleteService
        $methodName = 'delete' . $resourceName;
        
        if (!method_exists($client, $methodName)) {
            throw new \RuntimeException("Cannot delete model: API method '{$methodName}' not found on client");
        }
        
        return $client->$methodName($this->id);
    }
}
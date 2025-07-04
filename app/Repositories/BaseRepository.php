<?php
namespace SimplyBook\Repositories;

use SimplyBook\Http\ApiClient;
use SimplyBook\Models\BaseModel;

/**
 * Base repository class for CRUD operations
 */
abstract class BaseRepository
{
    protected ApiClient $client;
    protected string $resourceName;
    protected string $modelClass;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
    }

    /**
     * Get the model class name
     */
    abstract protected function getModelClass(): string;
    
    /**
     * Get the resource name derived from model class
     */
    protected function getResourceName(): string
    {
        $modelClass = $this->getModelClass();
        // Extract the class name from the fully qualified class name
        $parts = explode('\\', $modelClass);
        return end($parts);
    }

    /**
     * Find all resources
     * @return BaseModel[]
     */
    public function all(): array
    {
        $methodName = 'get' . $this->getResourceName() . 's';
        $modelClass = $this->getModelClass();
        $data = $this->client->$methodName();
        
        return array_map(fn($item) => new $modelClass($item), $data);
    }

    /**
     * Find a resource by ID
     */
    public function find(int $id): ?BaseModel
    {
        $items = $this->all();
        
        foreach ($items as $item) {
            if ($item->getId() === $id) {
                return $item;
            }
        }
        
        return null;
    }

    /**
     * Create a new resource
     */
    public function create(BaseModel $model): BaseModel
    {
        $methodName = 'create' . $this->getResourceName();
        $modelClass = $this->getModelClass();
        $result = $this->client->$methodName($model->toArray());
        
        return new $modelClass($result);
    }

    /**
     * Update an existing resource
     */
    public function update(BaseModel $model): BaseModel
    {
        if (!$model->exists()) {
            throw new \InvalidArgumentException('Cannot update model without ID');
        }
        
        $methodName = 'update' . $this->getResourceName();
        $modelClass = $this->getModelClass();
        $result = $this->client->$methodName($model->getId(), $model->toArray());
        
        return new $modelClass($result);
    }

    /**
     * Delete a resource
     */
    public function delete(BaseModel $model): bool
    {
        if (!$model->exists()) {
            throw new \InvalidArgumentException('Cannot delete model without ID');
        }
        
        $methodName = 'delete' . $this->getResourceName();
        return $this->client->$methodName($model->getId());
    }

    /**
     * Save a model (create or update based on existence)
     */
    public function save(BaseModel $model): BaseModel
    {
        if ($model->exists()) {
            return $this->update($model);
        } else {
            return $this->create($model);
        }
    }
}
<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Interfaces\MultiEndpointInterface;

abstract class AbstractBaseEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;
    use HasNonces;

    abstract protected function getRoute(): string;

    abstract protected function getResource(): string;

    /**
     * Sanitize input data for this specific resource type
     * @abstract
     */
    abstract protected function sanitizeInputData(array $data): array;

    /**
     * Escape output data for this specific resource type  
     * @abstract
     */
    abstract protected function escapeOutputData(array $data): array;

    /**
     * Get the API client method prefix (e.g., 'Provider', 'Service')
     * Generated from getResource() with ucfirst
     */
    protected function getResourceType(): string
    {
        return ucfirst($this->getResource());
    }

    /**
     * Get the resource name for logging (e.g., 'provider', 'service')
     * Uses getResource() directly
     */
    protected function getResourceName(): string
    {
        return $this->getResource();
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        $route = $this->getRoute();
        
        
        return [
            $route => [
                'methods' => \WP_REST_Server::READABLE . ',' . \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'handleCollectionRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
            $route . '/(?P<id>[0-9]+)' => [
                'methods' => \WP_REST_Server::READABLE . ',' . \WP_REST_Server::CREATABLE . ',' . \WP_REST_Server::EDITABLE . ',' . \WP_REST_Server::DELETABLE,
                'callback' => [$this, 'handleSingleRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
        ];
    }

    /**
     * Generic permission callback for all CRUD operations.
     */
    public function permissionCallback(\WP_REST_Request $request): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * Handle collection requests (GET /resource, POST /resource)
     */
    public function handleCollectionRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        $method = $request->get_method();

        try {
            switch ($method) {
                case 'GET':
                    return $this->getItems($request);
                case 'POST':
                    return $this->createItem($request);
                default:
                    return $this->sendHttpResponse(['error' => 'Method not allowed'], 405);
            }
        } catch (\Exception $e) {
            return $this->sendHttpResponse(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle single item requests (GET /resource/1, PUT /resource/1, DELETE /resource/1)
     */
    public function handleSingleRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        $method = $request->get_method();
        $itemId = $request->get_param('id');


        try {
            switch ($method) {
                case 'GET':
                    return $this->getItem($request, $itemId);
                case 'PUT':
                case 'PATCH':
                case 'POST':
                    return $this->updateItem($request, $itemId);
                case 'DELETE':
                    return $this->deleteItem($request, $itemId);
                default:
                    return $this->sendHttpResponse(['error' => 'Method not allowed'], 405);
            }
        } catch (\Exception $e) {
            return $this->sendHttpResponse(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * GET /resource - Get all items
     */
    protected function getItems(\WP_REST_Request $request): \WP_REST_Response
    {
        $client = \SimplyBook\App::provide('client');
        $resource = $this->getResource();
        
        $models = $client->$resource()->all();
        $result = array_map(fn($model) => $model->toArray(), $models);
        
        $escapedResult = $this->escapeOutputData($result);
        return $this->sendHttpResponse($escapedResult);
    }

    /**
     * GET /resource/1 - Get single item
     */
    protected function getItem(\WP_REST_Request $request, string $itemId): \WP_REST_Response
    {
        $client = \SimplyBook\App::provide('client');
        $resource = $this->getResource();
        
        $item = $client->$resource()->find($itemId);
        
        if (!$item) {
            return $this->sendHttpResponse(['error' => ucfirst($this->getResourceName()) . ' not found'], 404);
        }
        
        $escapedItem = $this->escapeOutputData([$item->toArray()]);
        return $this->sendHttpResponse($escapedItem[0]);
    }

    /**
     * POST /resource - Create new item
     */
    protected function createItem(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = $request->get_json_params();
        $resourceName = $this->getResourceName();

        if (empty($data)) {
            return $this->sendHttpResponse(['error' => "No {$resourceName} data provided"], 400);
        }

        $sanitizedData = $this->sanitizeInputData($data);
        $client = \SimplyBook\App::provide('client');
        $resource = $this->getResource();
        
        $result = $client->$resource()->create($sanitizedData);
        return $this->sendHttpResponse($result->toArray(), 201);
    }

    /**
     * PUT /resource/1 - Update item
     */
    protected function updateItem(\WP_REST_Request $request, string $itemId): \WP_REST_Response
    {
        $data = $request->get_json_params();
        $resourceName = $this->getResourceName();

        if (empty($itemId)) {
            return $this->sendHttpResponse(['error' => ucfirst($resourceName) . ' ID is required'], 400);
        }
        
        if (empty($data)) {
            return $this->sendHttpResponse(['error' => "No {$resourceName} data provided"], 400);
        }

        $sanitizedData = $this->sanitizeInputData($data);
        $client = \SimplyBook\App::provide('client');
        $resource = $this->getResource();
        
        $item = $client->$resource()->find($itemId);
        
        if (!$item) {
            return $this->sendHttpResponse(['error' => ucfirst($resourceName) . ' not found'], 404);
        }
        
        $result = $item->update($sanitizedData);
        return $this->sendHttpResponse($result->toArray());
    }

    /**
     * DELETE /resource/1 - Delete item
     */
    protected function deleteItem(\WP_REST_Request $request, string $itemId): \WP_REST_Response
    {
        $resourceName = $this->getResourceName();
        
        if (empty($itemId)) {
            return $this->sendHttpResponse(['error' => ucfirst($resourceName) . ' ID is required'], 400);
        }

        $client = \SimplyBook\App::provide('client');
        $resource = $this->getResource();
        
        $item = $client->$resource()->find($itemId);
        
        if (!$item) {
            return $this->sendHttpResponse(['error' => ucfirst($resourceName) . ' not found'], 404);
        }
        
        $result = $item->delete();
        return $this->sendHttpResponse(['success' => $result]);
    }
}
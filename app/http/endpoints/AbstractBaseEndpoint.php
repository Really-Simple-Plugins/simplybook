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
     * Generic permission callback for all CRUD operations
     * Uses the extended defaultPermissionCallback with additional admin access check
     */
    public function permissionCallback(\WP_REST_Request $request): bool
    {
        if (!$this->adminAccessAllowed()) {
            return false;
        }

        $method = $request->get_method();
        
        // For GET requests, check if user can manage options
        if ($method === 'GET') {
            return current_user_can('manage_options');
        }
        
        // For POST/PUT/DELETE requests, use defaultPermissionCallback
        // which now handles all data-modifying methods
        $endpointManager = new \SimplyBook\Managers\EndpointManager();
        $result = $endpointManager->defaultPermissionCallback($request);
        
        // Handle WP_Error return type
        if (is_wp_error($result)) {
            return false;
        }
        
        return $result;
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
        $methodName = 'get' . $this->getResourceType() . 's';
        
        // Validate that the method exists on the client
        if (!method_exists($client, $methodName)) {
            return $this->sendHttpResponse([
                'error' => "API method {$methodName} not found"
            ], 500);
        }
        
        $result = $client->$methodName();
        
        // Escape output data for security
        $escapedResult = $this->escapeOutputData($result ?: []);
        
        return $this->sendHttpResponse($escapedResult, true, 'Data retrieved successfully');
    }

    /**
     * GET /resource/1 - Get single item
     */
    protected function getItem(\WP_REST_Request $request, string $itemId): \WP_REST_Response
    {
        $client = \SimplyBook\App::provide('client');
        $methodName = 'get' . $this->getResourceType() . 's';
        
        // Validate that the method exists on the client
        if (!method_exists($client, $methodName)) {
            return $this->sendHttpResponse([
                'error' => "API method {$methodName} not found"
            ], 500);
        }
        
        $items = $client->$methodName();
        
        // Filter to get the specific item
        $item = array_filter($items, function($item) use ($itemId) {
            return isset($item['id']) && $item['id'] == $itemId;
        });
        
        if (empty($item)) {
            return $this->sendHttpResponse(['error' => ucfirst($this->getResourceName()) . ' not found'], 404);
        }
        
        // Escape output data for security
        $escapedItem = $this->escapeOutputData([array_values($item)[0]]);
        
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
        $methodName = 'create' . $this->getResourceType();
        
        // Validate that the method exists on the client
        if (!method_exists($client, $methodName)) {
            return $this->sendHttpResponse([
                'error' => "API method {$methodName} not found"
            ], 500);
        }
        
        $result = $client->$methodName($sanitizedData);
        
        return $this->sendHttpResponse($result, 201);
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
        $methodName = 'update' . $this->getResourceType();
        
        // Validate that the method exists on the client
        if (!method_exists($client, $methodName)) {
            return $this->sendHttpResponse([
                'error' => "API method {$methodName} not found"
            ], 500);
        }
        
        $result = $client->$methodName($itemId, $sanitizedData);
        
        return $this->sendHttpResponse($result);
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
        $methodName = 'delete' . $this->getResourceType();
        
        // Validate that the method exists on the client
        if (!method_exists($client, $methodName)) {
            return $this->sendHttpResponse([
                'error' => "API method {$methodName} not found"
            ], 500);
        }
        
        $result = $client->$methodName($itemId);
        
        return $this->sendHttpResponse(['success' => $result]);
    }
}
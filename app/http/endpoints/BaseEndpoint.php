<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Interfaces\MultiEndpointInterface;

class BaseEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;
    use HasNonces;

    const ROUTE = 'base';

    /**
     * Get the route name for this endpoint
     */
    protected function getRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * Get the API client method prefix (e.g., 'Provider', 'Service')
     */
    protected function getResourceType(): string
    {
        return 'Base';
    }

    /**
     * Get the resource name for logging (e.g., 'provider', 'service')
     */
    protected function getResourceName(): string
    {
        return 'base';
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
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'handleCollectionRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
            $route . '/(?P<id>[0-9]+)' => [
                'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                'callback' => [$this, 'handleSingleRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
        ];
    }

    /**
     * Generic permission callback for all CRUD operations
     */
    public function permissionCallback(\WP_REST_Request $request): bool
    {
        if (!$this->adminAccessAllowed()) {
            return false;
        }

        $method = $request->get_method();
        
        // For GET requests, use WordPress REST API nonce validation
        if ($method === 'GET') {
            return current_user_can('manage_options');
        }
        
        // For POST/PUT/DELETE requests, verify the SimplyBook nonce
        $nonce = $request->get_param('nonce');
        return $this->verifyNonce($nonce);
    }

    /**
     * Handle collection requests (GET /resource, POST /resource)
     */
    public function handleCollectionRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        $method = $request->get_method();
        $route = $this->getRoute();
        $resourceName = $this->getResourceName();
        

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
        $route = $this->getRoute();
        $resourceName = $this->getResourceName();
        

        try {
            switch ($method) {
                case 'GET':
                    return $this->getItem($request, $itemId);
                case 'PUT':
                case 'PATCH':
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
        $result = $client->$methodName();
        
        // Escape output data for security
        $escapedResult = $this->escapeOutputData($result ?: [], $this->getResourceType());
        
        return $this->sendHttpResponse($escapedResult, true, 'Data retrieved successfully');
    }

    /**
     * GET /resource/1 - Get single item
     */
    protected function getItem(\WP_REST_Request $request, string $itemId): \WP_REST_Response
    {
        $client = \SimplyBook\App::provide('client');
        $methodName = 'get' . $this->getResourceType() . 's';
        $items = $client->$methodName();
        
        // Filter to get the specific item
        $item = array_filter($items, function($item) use ($itemId) {
            return isset($item['id']) && $item['id'] == $itemId;
        });
        
        if (empty($item)) {
            return $this->sendHttpResponse(['error' => ucfirst($this->getResourceName()) . ' not found'], 404);
        }
        
        // Escape output data for security
        $escapedItem = $this->escapeOutputData([array_values($item)[0]], $this->getResourceType());
        
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

        $sanitizedData = $this->sanitizeInputData($data, $this->getResourceType());

        $client = \SimplyBook\App::provide('client');
        $methodName = 'create' . $this->getResourceType();
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

        $sanitizedData = $this->sanitizeInputData($data, $this->getResourceType());

        $client = \SimplyBook\App::provide('client');
        $methodName = 'update' . $this->getResourceType();
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
        $result = $client->$methodName($itemId);
        
        return $this->sendHttpResponse(['success' => $result]);
    }

    /**
     * Sanitize input data based on resource type
     */
    protected function sanitizeInputData(array $data, string $resourceType): array
    {
        $sanitized = [];
        
        if ($resourceType === 'Service') {
            return $this->sanitizeServiceData($data);
        } elseif ($resourceType === 'Provider') {
            return $this->sanitizeProviderData($data);
        }
        
        // Default sanitization for unknown resource types
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = sanitize_text_field($value);
            } else {
                $sanitized[$key] = $value;
            }
        }
        
        return $sanitized;
    }

    /**
     * Sanitize service-specific data
     */
    protected function sanitizeServiceData(array $data): array
    {
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            switch ($key) {
                case 'name':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'description':
                    $sanitized[$key] = sanitize_textarea_field($value);
                    break;
                case 'price':
                case 'deposit_price':
                    $sanitized[$key] = $this->sanitizePrice($value);
                    break;
                case 'duration':
                    $sanitized[$key] = $this->sanitizeDuration($value);
                    break;
                case 'tax_id':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'is_visible':
                    $sanitized[$key] = (bool) $value;
                    break;
                default:
                    // Remove any unexpected fields
                    if (!in_array($key, ['nonce', '_method'])) {
                        $sanitized[$key] = is_string($value) ? sanitize_text_field($value) : $value;
                    }
                    break;
            }
        }
        
        return $sanitized;
    }

    /**
     * Sanitize provider-specific data
     */
    protected function sanitizeProviderData(array $data): array
    {
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            switch ($key) {
                case 'name':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'description':
                    $sanitized[$key] = sanitize_textarea_field($value);
                    break;
                case 'email':
                    $sanitized[$key] = sanitize_email($value);
                    break;
                case 'phone':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'qty':
                case 'quantity':
                    $sanitized[$key] = $this->sanitizeQuantity($value);
                    break;
                case 'color':
                    $sanitized[$key] = sanitize_hex_color($value) ?: '#3b82f6';
                    break;
                case 'is_visible':
                    $sanitized[$key] = (bool) $value;
                    break;
                default:
                    // Remove any unexpected fields
                    if (!in_array($key, ['nonce', '_method'])) {
                        $sanitized[$key] = is_string($value) ? sanitize_text_field($value) : $value;
                    }
                    break;
            }
        }
        
        return $sanitized;
    }

    /**
     * Sanitize price values
     */
    protected function sanitizePrice($value): float
    {
        $price = floatval($value);
        return max(0, $price); // Ensure non-negative
    }

    /**
     * Sanitize duration values (in minutes)
     */
    protected function sanitizeDuration($value): int
    {
        $duration = intval($value);
        return max(1, $duration); // Minimum 1 minute
    }

    /**
     * Sanitize quantity values
     */
    protected function sanitizeQuantity($value): int
    {
        $qty = intval($value);
        return max(1, $qty); // Minimum 1
    }

    /**
     * Escape output data for safe display in frontend
     */
    protected function escapeOutputData(array $data, string $resourceType): array
    {
        if (empty($data)) {
            return $data;
        }
        
        $escaped = [];
        
        foreach ($data as $key => $item) {
            if (is_array($item)) {
                $escaped[$key] = $this->escapeItemData($item, $resourceType);
            } else {
                $escaped[$key] = $item;
            }
        }
        
        return $escaped;
    }

    /**
     * Escape individual item data
     */
    protected function escapeItemData(array $item, string $resourceType): array
    {
        $escaped = [];
        
        foreach ($item as $key => $value) {
            if ($resourceType === 'Service') {
                $escaped[$key] = $this->escapeServiceField($key, $value);
            } elseif ($resourceType === 'Provider') {
                $escaped[$key] = $this->escapeProviderField($key, $value);
            } else {
                // Default escaping for unknown resource types
                $escaped[$key] = is_string($value) ? esc_html($value) : $value;
            }
        }
        
        return $escaped;
    }

    /**
     * Escape service-specific fields
     */
    protected function escapeServiceField(string $key, $value)
    {
        switch ($key) {
            case 'name':
            case 'tax_id':
                return is_string($value) ? esc_html($value) : $value;
            case 'description':
                return is_string($value) ? esc_textarea($value) : $value;
            case 'price':
            case 'deposit_price':
            case 'duration':
            case 'is_visible':
            case 'id':
                return (int) $value;
            default:
                return is_string($value) ? esc_html($value) : $value;
        }
    }

    /**
     * Escape provider-specific fields
     */
    protected function escapeProviderField(string $key, $value)
    {
        switch ($key) {
            case 'name':
            case 'phone':
                return is_string($value) ? esc_html($value) : $value;
            case 'description':
                return is_string($value) ? esc_textarea($value) : $value;
            case 'email':
                return is_string($value) ? esc_html($value) : $value;
            case 'color':
                return is_string($value) ? esc_attr($value) : $value;
            case 'qty':
            case 'quantity':
            case 'is_visible':
            case 'id':
                return (int) $value;
            default:
                return is_string($value) ? esc_html($value) : $value;
        }
    }
}
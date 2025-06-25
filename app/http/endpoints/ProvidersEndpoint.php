<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Interfaces\MultiEndpointInterface;

class ProvidersEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;
    use HasNonces;

    const ROUTE = 'providers';

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
        $routes = [
            // Collection endpoint for listing all providers and creating new ones
            self::ROUTE => [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'handleCollectionRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
            // Single item endpoint for getting, updating, or deleting a specific provider
            self::ROUTE . '/(?P<id>[0-9]+)' => [
                'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                'callback' => [$this, 'handleSingleRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
        ];
        
        return $routes;
    }

    /**
     * Permission callback to ensure admin access for all operations
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
     * Handle requests to the collection endpoint (/providers)
     */
    public function handleCollectionRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $method = $request->get_method();
            $route = $request->get_route();
            
            error_log("SIMPLYBOOK DEBUG: Collection request - Method: {$method}, Route: {$route}");
            error_log("SIMPLYBOOK DEBUG: Request params: " . print_r($request->get_params(), true));
            
            switch($method) {
                case 'GET':
                    error_log("SIMPLYBOOK DEBUG: Handling GET providers request");
                    return $this->getProviders($request);
                case 'POST':
                    error_log("SIMPLYBOOK DEBUG: Handling POST providers request");
                    return $this->createProvider($request);
                default:
                    error_log("SIMPLYBOOK DEBUG: Method not allowed: {$method}");
                    return $this->sendHttpResponse(
                        ['error' => 'Method not allowed'], 
                        405
                    );
            }
        } catch (\Exception $e) {
            error_log("SIMPLYBOOK DEBUG: Exception in collection request: " . $e->getMessage());
            return $this->sendHttpResponse([
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ], 500);
        }
    }

    /**
     * Handle requests to the single item endpoint (/providers/{id})
     */
    public function handleSingleRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $method = $request->get_method();
            $route = $request->get_route();
            $providerId = $request->get_param('id');
            
            error_log("SIMPLYBOOK DEBUG: Single request - Method: {$method}, Route: {$route}, ID: {$providerId}");
            error_log("SIMPLYBOOK DEBUG: Request params: " . print_r($request->get_params(), true));
            
            switch($method) {
                case 'GET':
                    error_log("SIMPLYBOOK DEBUG: Handling GET single provider request");
                    return $this->getProvider($request);
                case 'PUT':
                    error_log("SIMPLYBOOK DEBUG: Handling PUT provider request");
                    return $this->updateProvider($request);
                case 'DELETE':
                    error_log("SIMPLYBOOK DEBUG: Handling DELETE provider request");
                    return $this->deleteProvider($request);
                default:
                    error_log("SIMPLYBOOK DEBUG: Method not allowed for single request: {$method}");
                    return $this->sendHttpResponse(
                        ['error' => 'Method not allowed'], 
                        405
                    );
            }
        } catch (\Exception $e) {
            error_log("SIMPLYBOOK DEBUG: Exception in single request: " . $e->getMessage());
            return $this->sendHttpResponse([
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ], 500);
        }
    }

    /**
     * GET - Return all providers as a WP_REST_Response.
     * @example [
     *      ['id'=>1,'name'=>'test'],
     *      ['id'=>2,'name'=>'Karel'],
     * ];
     * @see https://simplybook.me/en/api/developer-api/tab/rest_api#method_GET_/admin/providers
     */
    public function getProviders(\WP_REST_Request $request): \WP_REST_Response
    {
        $result = App::provide('client')->get_providers();
        
        // Handle different return formats from ApiClient
        if (is_array($result) && isset($result['data'])) {
            // Standard API response format
            return $this->sendHttpResponse($result['data'], true, $result['message'] ?? '');
        } else {
            // Empty array or different format (e.g., when registration incomplete)
            return $this->sendHttpResponse($result ?: [], true, 'Providers retrieved successfully');
        }
    }

    /**
     * GET - Return a single provider by ID as a WP_REST_Response.
     */
    private function getProvider(\WP_REST_Request $request): \WP_REST_Response
    {
        $providerId = $request->get_param('id');
        
        if (empty($providerId)) {
            return $this->sendHttpResponse([], false, 'Provider ID is required', 400);
        }

        // Get all providers and filter by ID (SimplyBook API doesn't have single provider endpoint)
        $result = App::provide('client')->get_providers();
        
        // Handle different return formats from ApiClient
        $providers = [];
        if (is_array($result) && isset($result['data'])) {
            $providers = $result['data'];
        } else {
            $providers = $result ?: [];
        }
        
        $provider = array_filter($providers, function($p) use ($providerId) {
            return isset($p['id']) && $p['id'] == $providerId;
        });
        
        if (!empty($provider)) {
            return $this->sendHttpResponse(array_values($provider)[0], true, 'Provider retrieved successfully');
        }
        
        return $this->sendHttpResponse([], false, 'Provider not found', 404);
    }

    /**
     * POST - Create a new provider
     */
    private function createProvider(\WP_REST_Request $request): \WP_REST_Response
    {
        $providerData = $request->get_json_params();
        
        error_log("SIMPLYBOOK DEBUG: CREATE provider data: " . print_r($providerData, true));
        
        if (empty($providerData)) {
            error_log("SIMPLYBOOK DEBUG: No provider data provided");
            return $this->sendHttpResponse(['error' => 'No provider data provided'], 400);
        }

        try {
            $result = App::provide('client')->createProvider($providerData);
            error_log("SIMPLYBOOK DEBUG: CREATE provider result: " . print_r($result, true));
            return $this->sendHttpResponse($result, 201);
        } catch (\Exception $e) {
            error_log("SIMPLYBOOK DEBUG: CREATE provider exception: " . $e->getMessage());
            return $this->sendHttpResponse(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * PUT - Update an existing provider
     */
    private function updateProvider(\WP_REST_Request $request): \WP_REST_Response
    {
        $providerId = $request->get_param('id');
        $providerData = $request->get_json_params();
        
        error_log("SIMPLYBOOK DEBUG: UPDATE provider ID: {$providerId}");
        error_log("SIMPLYBOOK DEBUG: UPDATE provider data: " . print_r($providerData, true));
        
        if (empty($providerId)) {
            error_log("SIMPLYBOOK DEBUG: Provider ID is required for update");
            return $this->sendHttpResponse(['error' => 'Provider ID is required'], 400);
        }
        
        if (empty($providerData)) {
            error_log("SIMPLYBOOK DEBUG: No provider data provided for update");
            return $this->sendHttpResponse(['error' => 'No provider data provided'], 400);
        }

        try {
            $result = App::provide('client')->updateProvider($providerId, $providerData);
            error_log("SIMPLYBOOK DEBUG: UPDATE provider result: " . print_r($result, true));
            return $this->sendHttpResponse($result);
        } catch (\Exception $e) {
            error_log("SIMPLYBOOK DEBUG: UPDATE provider exception: " . $e->getMessage());
            return $this->sendHttpResponse(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * DELETE - Delete a provider
     */
    private function deleteProvider(\WP_REST_Request $request): \WP_REST_Response
    {
        $providerId = $request->get_param('id');
        
        error_log("SIMPLYBOOK DEBUG: DELETE provider ID: {$providerId}");
        
        if (empty($providerId)) {
            error_log("SIMPLYBOOK DEBUG: Provider ID is required for delete");
            return $this->sendHttpResponse(['error' => 'Provider ID is required'], 400);
        }

        try {
            $result = App::provide('client')->deleteProvider($providerId);
            error_log("SIMPLYBOOK DEBUG: DELETE provider result: " . print_r($result, true));
            return $this->sendHttpResponse([
                'success' => true,
                'message' => 'Provider deleted successfully',
                'provider_id' => $providerId
            ]);
        } catch (\Exception $e) {
            error_log("SIMPLYBOOK DEBUG: DELETE provider exception: " . $e->getMessage());
            return $this->sendHttpResponse([
                'error' => 'Failed to delete provider: ' . $e->getMessage(),
                'provider_id' => $providerId
            ], 500);
        }
    }
}
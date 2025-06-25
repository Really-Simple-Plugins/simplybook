<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Interfaces\MultiEndpointInterface;

class ServicesEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;
    use HasNonces;

    const ROUTE = 'services';

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
        return [
            // Collection endpoint for listing all services and creating new ones
            self::ROUTE => [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'handleCollectionRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
            // Single item endpoint for getting, updating, or deleting a specific service
            self::ROUTE . '/(?P<id>[0-9]+)' => [
                'methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                'callback' => [$this, 'handleSingleRequest'],
                'permission_callback' => [$this, 'permissionCallback'],
            ],
        ];
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
     * Handle requests to the collection endpoint (/services)
     */
    public function handleCollectionRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $method = $request->get_method();
            
            switch($method) {
                case 'GET':
                    return $this->getServices($request);
                case 'POST':
                    return $this->createService($request);
                default:
                    return $this->sendHttpResponse(
                        ['error' => 'Method not allowed'], 
                        405
                    );
            }
        } catch (\Exception $e) {
            return $this->sendHttpResponse([
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ], 500);
        }
    }

    /**
     * Handle requests to the single item endpoint (/services/{id})
     */
    public function handleSingleRequest(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $method = $request->get_method();
            
            switch($method) {
                case 'GET':
                    return $this->getService($request);
                case 'PUT':
                    return $this->updateService($request);
                case 'DELETE':
                    return $this->deleteService($request);
                default:
                    return $this->sendHttpResponse(
                        ['error' => 'Method not allowed'], 
                        405
                    );
            }
        } catch (\Exception $e) {
            return $this->sendHttpResponse([
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ], 500);
        }
    }

    /**
     * GET - Return all services as a WP_REST_Response.
     * @example [
     *      ['id'=>1,'name'=>'test'],
     *      ['id'=>2,'name'=>'Autobanden wissel'],
     * ];
     * @see https://simplybook.me/en/api/developer-api/tab/rest_api#method_GET_/admin/services
     */
    public function getServices(\WP_REST_Request $request): \WP_REST_Response
    {
        $result = App::provide('client')->get_services();
        
        // Handle different return formats from ApiClient
        if (is_array($result) && isset($result['data'])) {
            // Standard API response format
            return $this->sendHttpResponse($result['data'], true, $result['message'] ?? '');
        } else {
            // Empty array or different format (e.g., when registration incomplete)
            return $this->sendHttpResponse($result ?: [], true, 'Services retrieved successfully');
        }
    }

    /**
     * GET - Return a single service by ID as a WP_REST_Response.
     */
    private function getService(\WP_REST_Request $request): \WP_REST_Response
    {
        $serviceId = $request->get_param('id');
        
        if (empty($serviceId)) {
            return $this->sendHttpResponse([], false, 'Service ID is required', 400);
        }

        // Get all services and filter by ID (SimplyBook API doesn't have single service endpoint)
        $result = App::provide('client')->get_services();
        
        // Handle different return formats from ApiClient
        $services = [];
        if (is_array($result) && isset($result['data'])) {
            $services = $result['data'];
        } else {
            $services = $result ?: [];
        }
        
        $service = array_filter($services, function($s) use ($serviceId) {
            return isset($s['id']) && $s['id'] == $serviceId;
        });
        
        if (!empty($service)) {
            return $this->sendHttpResponse(array_values($service)[0], true, 'Service retrieved successfully');
        }
        
        return $this->sendHttpResponse([], false, 'Service not found', 404);
    }

    /**
     * POST - Create a new service
     */
    private function createService(\WP_REST_Request $request): \WP_REST_Response
    {
        $serviceData = $request->get_json_params();
        
        if (empty($serviceData)) {
            return $this->sendHttpResponse(['error' => 'No service data provided'], 400);
        }

        $result = App::provide('client')->createService($serviceData);
        return $this->sendHttpResponse($result, 201);
    }

    /**
     * PUT - Update an existing service
     */
    private function updateService(\WP_REST_Request $request): \WP_REST_Response
    {
        $serviceId = $request->get_param('id');
        $serviceData = $request->get_json_params();
        
        if (empty($serviceId)) {
            return $this->sendHttpResponse(['error' => 'Service ID is required'], 400);
        }
        
        if (empty($serviceData)) {
            return $this->sendHttpResponse(['error' => 'No service data provided'], 400);
        }

        $result = App::provide('client')->updateService($serviceId, $serviceData);
        return $this->sendHttpResponse($result);
    }

    /**
     * DELETE - Delete a service
     */
    private function deleteService(\WP_REST_Request $request): \WP_REST_Response
    {
        $serviceId = $request->get_param('id');
        
        if (empty($serviceId)) {
            return $this->sendHttpResponse(['error' => 'Service ID is required'], 400);
        }

        $result = App::provide('client')->deleteService($serviceId);
        return $this->sendHttpResponse(['success' => $result]);
    }
}
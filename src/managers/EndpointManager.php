<?php namespace SimplyBook\Managers;

use SimplyBook\App;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\EndpointInterface;
use SimplyBook\Interfaces\MultiEndpointInterface;

final class EndpointManager
{
    use HasNonces;
    use HasAllowlistControl;

    private string $version;
    private string $namespace;

    public function __construct()
    {
        $this->version = App::env('http.version');
        $this->namespace = App::env('http.namespace');
    }

    /**
     * Register a single endpoint as long as it implements the
     * EndpointInterface or MultiEndpointInterface.
     * @uses do_action simplybook_endpoints_loaded
     */
    public function registerEndpoints(array $endpoints)
    {
        $routes = [];
        foreach ($endpoints as $endpoint) {
            if ($endpoint instanceof EndpointInterface) {
                $routes[$endpoint->registerRoute()] = $endpoint->registerArguments();
            }

            if ($endpoint instanceof MultiEndpointInterface) {
                $routeEndpoints = $endpoint->registerRoutes();
                foreach ($routeEndpoints as $route => $arguments) {
                    $routes[$route] = $arguments;
                }
            }

            // Skip endpoints not implementing any interface
        }

        $this->registerRoutes($routes);
        do_action('simplybook_endpoints_loaded');
    }

    /**
     * This method provides a way to register custom REST routes via the
     * simplybook_rest_routes filter. A controller of feature should be
     * instantiated before this manager is called and the controller should
     * hook into the simplybook_rest_routes filter to add its own routes.
     * @uses apply_filters simplybook_rest_routes
     */
    public function registerRoutes(array $routes): void
    {
        $routes = $this->getPluginRoutes($routes);

        foreach ($routes as $route => $data) {
            $version = ($data['version'] ?? $this->version);

            $arguments = [
                'methods' => ($data['methods'] ?? 'GET'),
                'callback' => ($data['callback'] ?? null),
                'permission_callback' => ($data['permission_callback'] ?? [$this, 'defaultPermissionCallback']),
            ];

            register_rest_route($this->namespace . '/' . $version, $route, $arguments);
        }
    }

    /**
     * Get the plugins REST routes
     * @uses apply_filters simplybook_rest_routes
     */
    private function getPluginRoutes(array $routes): array
    {
        /**
         * Filter: simplybook_rest_routes
         * Can be used to add or modify the REST routes
         *
         * @param array $routes
         * @return array
         * @example [
         *      'route' => [ // key is the route name
         *          'methods' => 'GET', // required
         *          'callback' => 'callback_function', // required
         *          'permission_callback' => 'permission_callback_function', // optional to override the default permission callback
         *          'version' => 'v1' // optional to override the default version
         *      ]
         * ]
         */
        return apply_filters('simplybook_rest_routes', $routes);
    }

    /**
     * The default permission callback, will check if the nonce is valid and if
     * the user has the required permissions to do a request.
     * @return bool|\WP_Error
     */
    public function defaultPermissionCallback(\WP_REST_Request $request)
    {
        $nonce = $request->get_param('nonce');
        if ($this->verifyNonce($nonce) === false) {
            return new \WP_Error(
                'rest_forbidden',
                esc_html__('Forbidden.', 'simplybook'),
                ['status' => 403]
            );
        }

        // todo - should we create a custom method instead of adminAccessAllowed?
        if ($this->adminAccessAllowed() === false) {
            return new \WP_Error(
                'rest_forbidden',
                esc_html__('You are not allowed to do this.', 'simplybook'),
                ['status' => 403]
            );
        }

        return true;
    }
}
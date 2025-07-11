<?php namespace SimplyBook\Managers;

use SimplyBook\App;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;
use SimplyBook\Interfaces\MultiEndpointInterface;

final class EndpointManager
{
    use HasNonces;
    use HasAllowlistControl;

    private string $version;
    private string $namespace;
    private array $routes = [];

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
        foreach ($endpoints as $endpoint) {
            if ($endpoint instanceof SingleEndpointInterface) {
                $this->registerSingleEndpointRoute($endpoint);
            }

            if ($endpoint instanceof MultiEndpointInterface) {
                $this->registerMultiEndpointRoute($endpoint);
            }

            // Skip endpoints not implementing any interface
        }

        $this->registerWordPressRestRoutes();
        do_action('simplybook_endpoints_loaded');
    }

    /**
     * Register a plugin route for and endpoint instance that implements the
     * {@see SingleEndpointInterface}
     */
    private function registerSingleEndpointRoute(SingleEndpointInterface $endpoint): void
    {
        if ($endpoint->enabled() === false) {
            return;
        }

        $this->routes[$endpoint->registerRoute()] = $endpoint->registerArguments();
    }

    /**
     * Register plugin routes for an endpoint instance that implements the
     * {@see MultiEndpointInterface}
     */
    private function registerMultiEndpointRoute(MultiEndpointInterface $endpoint): void
    {
        if ($endpoint->enabled() === false) {
            return;
        }

        $routeEndpoints = $endpoint->registerRoutes();
        foreach ($routeEndpoints as $route => $arguments) {
            $this->routes[$route] = $arguments;
        }
    }

    /**
     * This method provides a way to register custom REST routes via the
     * simplybook_rest_routes filter. A controller of feature should be
     * instantiated before this manager is called and the controller should
     * hook into the simplybook_rest_routes filter to add its own routes.
     * @uses apply_filters simplybook_rest_routes
     * @throws \InvalidArgumentException
     */
    public function registerWordPressRestRoutes(): void
    {
        $routes = $this->getPluginRestRoutes();

        foreach ($routes as $route => $data) {
            $version = ($data['version'] ?? $this->version);
            $callback = ($data['callback'] ?? null);
            $middleware = ($data['middleware'] ?? null);

            if (!is_callable($callback)) {
                throw new \InvalidArgumentException(
                    sprintf('The callback for the route "%s" is not callable.', $route)
                );
            }

            $arguments = [
                'methods' => ($data['methods'] ?? 'GET'),
                'callback' => $this->callbackMiddleware($callback, $middleware),
                'permission_callback' => ($data['permission_callback'] ?? [$this, 'defaultPermissionCallback']),
            ];

            register_rest_route($this->namespace . '/' . $version, $route, $arguments);
        }
    }

    /**
     * Get the plugins REST routes
     * @uses apply_filters simplybook_rest_routes
     */
    private function getPluginRestRoutes(): array
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
        return apply_filters('simplybook_rest_routes', $this->routes);
    }

    /**
     * This method is used to add middleware to the callback function. The
     * middleware should be a callable function that takes a request as an
     * argument and returns a response. The default middleware is to switch
     * the user locale to the current user locale.
     */
    public function callbackMiddleware(?callable $callback, ?callable $middleware): callable
    {
        return function ($request) use ($callback, $middleware) {
            if (is_callable($middleware)) {
                $middleware($request);
            } else {
                $this->defaultMiddlewareCallback();
            }

            return $callback($request);
        };
    }

    /**
     * This method is used to switch the user locale to the current user locale.
     * This is important because we will otherwise show the default site
     * language to the user for the Tasks and Notifications. Those
     * translations are created in PHP and not in JS.
     */
    private function defaultMiddlewareCallback(): void
    {
        switch_to_user_locale(get_current_user_id());
    }

    /**
     * The default permission callback, will check if the nonce is valid and if
     * the user has the required permissions to do a request.
     * @return bool|\WP_Error
     */
    public function defaultPermissionCallback(\WP_REST_Request $request)
    {
        $method = $request->get_method();
        $nonce = $request->get_param('nonce');

        // For methods that modify data, verify the nonce
        $methodsRequiringNonce = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (in_array($method, $methodsRequiringNonce) && ($this->verifyNonce($nonce) === false)) {
            return new \WP_Error(
                'rest_forbidden',
                esc_html__('Forbidden.', 'simplybook'),
                ['status' => 403]
            );
        }

        return true;
    }
}
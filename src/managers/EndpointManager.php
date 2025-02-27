<?php namespace SimplyBook\Managers;

use SimplyBook\App;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Traits\HasAllowlistControl;

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
     * Register the routes of the plugin
     */
    public function registerEndpoints(): void
    {
        $routes = $this->getPluginRoutes();

        foreach ($routes as $route => $data) {
            $version = $data['version'] ?? $this->version;
            $methods = $data['methods'] ?? 'GET';
            $callback = $data['callback'] ?? null;
            $permissionCallback = $data['permission_callback'] ?? [$this, 'defaultPermissionCallback'];

            register_rest_route($this->namespace, "/{$version}/{$route}", [
                'methods' => $methods,
                'callback' => $callback,
                'permission_callback' => $permissionCallback,
            ]);
        }

        do_action('simplybook_endpoints_loaded');
    }

    /**
     * Get the plugins REST routes
     * @uses apply_filters simplybook_rest_routes
     */
    private function getPluginRoutes(): array
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
        return apply_filters('simplybook_rest_routes', []);
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
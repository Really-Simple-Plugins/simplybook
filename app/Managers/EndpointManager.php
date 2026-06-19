<?php

namespace SimplyBook\Managers;

use WP_Error;
use WP_REST_Request;
use InvalidArgumentException;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Interfaces\SingleEndpointInterface;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

final class EndpointManager extends AbstractManager
{
    use HasNonces;

    private array $routes = [];
    private EnvironmentConfig $env;

    /**
     * Bind the env
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * @inheritDoc
     */
    protected function type(): string
    {
        return 'endpoints';
    }

    /**
     * @inheritDoc
     */
    public function isRegistrable(object $class): bool
    {
        return ($class instanceof SingleEndpointInterface
            || $class instanceof MultiEndpointInterface
        );
    }

    /**
     * @inheritDoc
     */
    public function registerClass(object $class): void
    {
        if ($class instanceof SingleEndpointInterface) {
            $this->registerSingleEndpointRoute($class);
        }

        if ($class instanceof MultiEndpointInterface) {
            $this->registerMultiEndpointRoute($class);
        }
    }

    /**
     * After all routes are in memory, we register them at the right time in
     * WordPress.
     * @uses do_action simplybook_{@see type}_loaded
     */
    protected function afterRegister(): void
    {
        $this->registerWordPressRestRoutes();
        do_action('simplybook_' . $this->type() . '_loaded');
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
     * All routes that are registered in memory are registered at the right
     * time in WordPress.
     * @throws InvalidArgumentException
     */
    public function registerWordPressRestRoutes(): void
    {
        foreach ($this->routes as $route => $data) {
            $version = ($data['version'] ?? $this->env->getString('http.version'));
            $callback = ($data['callback'] ?? null);
            $middleware = ($data['middleware'] ?? null);

            if (!is_callable($callback)) {
                throw new InvalidArgumentException(
                    sprintf('The callback for the route "%s" is not callable.', $route)
                );
            }

            $arguments = [
                'methods' => $this->normalizeMethods($data['methods'] ?? 'GET'),
                'callback' => $this->callbackMiddleware($callback, $middleware),
                'permission_callback' => ($data['permission_callback'] ?? [$this, 'defaultPermissionCallback']),
            ];

            if (!empty($data['args'])) {
                $arguments['args'] = $data['args'];
            }

            register_rest_route($this->env->getString('http.namespace') . '/' . $version, $route, $arguments);
        }
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
                return $callback($request);
            }

            $this->defaultMiddlewareCallback();
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
     * @return bool|WP_Error
     */
    public function defaultPermissionCallback(WP_REST_Request $request)
    {
        $method = $request->get_method();
        $nonce = $request->get_param('nonce');

        // For methods that modify data, verify the nonce
        $methodsRequiringNonce = ['POST', 'PUT', 'PATCH', 'DELETE'];
        if (in_array($method, $methodsRequiringNonce) && ($this->verifyNonce($nonce) === false)) {
            return new WP_Error(
                'rest_forbidden',
                __('Forbidden.', 'simplybook'),
                ['status' => 403]
            );
        }

        return true;
    }

    /**
     * Process the given methods and compare them to the allowed
     * {@see \WP_REST_Server::ALLMETHODS} methods. Remove unwanted entries and
     * cleanup method usage from, for example, "get " to "GET".
     *
     * @return string From "get, POSt, fake" to "GET,POST"
     */
    private function normalizeMethods(string $methods): string
    {
        // Split into array, trim whitespace and uppercase entries
        $methodsArray = array_map('trim', explode(',', $methods));
        $methodsArray = array_map('strtoupper', $methodsArray);

        // Split allowed entries into array and trim whitespaces
        $allowedMethodsArray = array_map('trim', explode(',', \WP_REST_Server::ALLMETHODS));

        // Keep only allowed methods
        $methodsArray = array_intersect($methodsArray, $allowedMethodsArray);
        $methodsArray = array_values(array_unique($methodsArray));

        // Convert back to CSV format for register_rest_route usage
        return implode(',', $methodsArray);
    }
}

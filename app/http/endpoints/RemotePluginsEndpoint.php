<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

/**
 * Remote plugins are the plugins provided by the SimplyBook API.
 */
class RemotePluginsEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_plugins';

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
    public function registerRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Return SimplyBook plugins as a WP_REST_Response. Under the hood this
     * calls admin/plugins on the SimplyBook API.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $plugins = App::provide('client')->get_plugins();
        return $this->sendHttpResponse($plugins);
    }
}
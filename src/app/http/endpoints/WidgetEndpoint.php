<?php
namespace SimplyBook\App\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use Simplybook_old\Frontend\Traits\Widget;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class WidgetEndpoint implements SingleEndpointInterface
{
    use Widget;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_widget';

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
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Get and return widget javascript in the HTTP Response
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        return $this->sendHttpResponse([
            'widget' => $this->get_widget(),
        ]);
    }
}
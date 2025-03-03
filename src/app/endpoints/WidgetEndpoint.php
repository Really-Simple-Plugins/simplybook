<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use Simplybook_old\Frontend\Traits\Widget;
use SimplyBook\Interfaces\SingleEndpointInterface;

class WidgetEndpoint implements SingleEndpointInterface
{
    use Widget;
    use HasRestAccess;

    const ROUTE = 'get_widget';

    /**
     * Always enabled
     */
    public function enabled(): bool
    {
        return true;
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
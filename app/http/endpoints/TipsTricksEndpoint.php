<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class TipsTricksEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'tips_and_tricks';

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
     * Return tips and tricks as a WP_REST_Response.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $tipsAndTricks = App::env('simplybook.tips_and_tricks');
        return $this->sendHttpResponse($tipsAndTricks);
    }
}
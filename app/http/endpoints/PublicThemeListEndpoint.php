<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class PublicThemeListEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'theme_list';

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
     * Return theme list as a WP_REST_Response.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $themeList = App::provide('client')->getThemeList();

        if (empty($themeList['themes'])) {
            return $this->sendHttpResponse([], false, __('No themes found', 'simplybook'), 404);
        }

        return $this->sendHttpResponse($themeList['themes']);
    }
}
<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class PublicThemeListEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    public const ROUTE = 'theme_list';

    private ApiClient $client;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
    }

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
     * @uses apply_filters simplybook_public_theme_list
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $themeList = apply_filters(
                'simplybook_public_theme_list',
                $this->client->getThemeList()
            );
        } catch (\Exception $e) {
            return $this->sendHttpResponse([], false, $e->getMessage(), 500);
        }

        if (empty($themeList['themes'])) {
            return $this->sendHttpResponse([], false, __('No themes found', 'simplybook'), 204);
        }

        return $this->sendHttpResponse($themeList['themes']);
    }
}

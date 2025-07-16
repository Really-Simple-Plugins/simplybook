<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\ThemeColorService;
use SimplyBook\Interfaces\SingleEndpointInterface;

class ThemeColorEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'theme_colors';

    protected ThemeColorService $service;

    public function __construct(ThemeColorService $service)
    {
        $this->service = $service;
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

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $colors = $this->service->getThemeColors();

        return $this->sendHttpResponse([
            'colors' => $colors,
        ]);
    }
}
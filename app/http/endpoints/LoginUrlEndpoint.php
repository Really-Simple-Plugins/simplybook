<?php
namespace SimplyBook\Http\Endpoints;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Services\LoginUrlService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class LoginUrlEndpoint implements SingleEndpointInterface
{
    use LegacySave; // todo
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_login_url';

    private LoginUrlService $service;

    public function __construct(LoginUrlService $service)
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

    /**
     * If the Login URL is requested this method will return a response with the
     * login URL and the direct URL.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        return $this->sendHttpResponse([
            'simplybook_external_login_url' => $this->service->getLoginUrl(),
        ]);
    }
}
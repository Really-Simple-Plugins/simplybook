<?php
namespace SimplyBook\Http\Endpoints;

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
            'args' => [
                'path' => [
                    'required' => false,
                    'type' => 'string',
                    'description' => 'Optional path to append to the login URL',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ];
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $path = $request->get_param('path');

        return $this->sendHttpResponse([
            'simplybook_external_login_url' => $this->service->getLoginUrl($path),
        ]);
    }
}

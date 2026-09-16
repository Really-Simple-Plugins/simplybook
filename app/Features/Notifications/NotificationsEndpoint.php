<?php

namespace SimplyBook\Features\Notifications;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class NotificationsEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private NotificationsService $service;

    public const ROUTE = 'get_notices';

    public function __construct(NotificationsService $service)
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
            'callback' => [$this, 'getNoticesCallback'],
        ];
    }

    /**
     * Return current Notices as a WP_REST_Response.
     */
    public function getNoticesCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $allNoticesAsArray = array_map(function ($notice) {
            return $notice->toArray();
        }, $this->service->getAllNotices());

        return $this->sendHttpResponse(
            array_values($allNoticesAsArray) // Keys should be removed
        );
    }
}

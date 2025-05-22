<?php

namespace SimplyBook\Features\Notifications;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;

class NotificationsEndpoints
{
    use HasRestAccess;
    use HasAllowlistControl;

    private NotificationsService $service;

    public function __construct(NotificationsService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_filter('simplybook_rest_routes', [$this, 'addNotificationRoutes']);
    }

    /**
     * Add the Notification routes to the REST API.
     */
    public function addNotificationRoutes(array $routes): array
    {
        if ($this->adminAccessAllowed() === false) {
            return $routes;
        }

        $routes['get_notices'] = [
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'getNoticesCallback'],
        ];

        return $routes;
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
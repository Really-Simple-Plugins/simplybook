<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\MultiEndpointInterface;

/**
 * REST routes for the buttons of an admin notice. The X button hides a
 * notice for the current user. The "never" and "later" buttons hide a
 * notice for the whole site. See {@see AdminNoticeService::renderNotice()}.
 */
class AdminNoticesEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    public const DISMISS_FOR_USER_ROUTE = 'notices/dismiss-for-user';
    public const DISMISS_ROUTE = 'notices/dismiss';
    public const SNOOZE_ROUTE = 'notices/snooze';

    private AdminNoticeService $service;

    public function __construct(AdminNoticeService $service)
    {
        $this->service = $service;
    }

    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        $arguments = [
            'methods' => \WP_REST_Server::CREATABLE,
            'permission_callback' => [$this, 'adminAccessAllowed'],
            'args' => [
                'notice_id' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_key',
                ],
            ],
        ];

        return [
            self::DISMISS_FOR_USER_ROUTE => (['callback' => [$this, 'dismissForUser']] + $arguments),
            self::DISMISS_ROUTE => (['callback' => [$this, 'dismiss']] + $arguments),
            self::SNOOZE_ROUTE => (['callback' => [$this, 'snooze']] + $arguments),
        ];
    }

    /**
     * Hide the notice for good for the current user. Used by the X button.
     */
    public function dismissForUser(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeId = $request->get_param('notice_id');

        $success = $this->service->dismissNoticeForUser($noticeId);

        return $this->respond($noticeId, $success, __('Failed to dismiss notice.', 'simplybook'));
    }

    /**
     * Hide the notice for good for the whole site. Used by the "never" button.
     */
    public function dismiss(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeId = $request->get_param('notice_id');

        $success = $this->service->dismissNotice($noticeId);

        return $this->respond($noticeId, $success, __('Failed to dismiss notice.', 'simplybook'));
    }

    /**
     * Hide the notice for a while for the whole site. Used by the "later"
     * button.
     */
    public function snooze(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeId = $request->get_param('notice_id');

        $success = $this->service->snoozeNotice($noticeId);

        return $this->respond($noticeId, $success, __('Failed to snooze notice.', 'simplybook'));
    }

    private function respond(string $noticeId, bool $success, string $errorMessage): \WP_REST_Response
    {
        if ($success === false) {
            return $this->sendHttpResponse([], false, $errorMessage, 500);
        }

        return $this->sendHttpResponse(['notice_id' => $noticeId], true);
    }
}

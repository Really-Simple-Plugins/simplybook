<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Services\AdminNoticeService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\MultiEndpointInterface;

/**
 * REST routes to dismiss or snooze an admin notice for the current user.
 * The X button of every notice calls the dismiss route
 * {@see AdminNoticeService::enqueue()}.
 */
class AdminNoticesEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

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
        $noticeIdArgument = [
            'notice_id' => [
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_key',
            ],
        ];

        return [
            self::DISMISS_ROUTE => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'dismiss'],
                'permission_callback' => [$this, 'adminAccessAllowed'],
                'args' => $noticeIdArgument,
            ],
            self::SNOOZE_ROUTE => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'snooze'],
                'permission_callback' => [$this, 'adminAccessAllowed'],
                'args' => $noticeIdArgument + [
                    'seconds' => [
                        'required' => false,
                        'type' => 'integer',
                        'default' => DAY_IN_SECONDS,
                        'minimum' => 1,
                    ],
                ],
            ],
        ];
    }

    /**
     * Dismiss the notice for good for the current user.
     */
    public function dismiss(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeId = $request->get_param('notice_id');

        $success = $this->service->dismissNotice(get_current_user_id(), $noticeId);

        if ($success === false) {
            return $this->sendHttpResponse([], false, __('Failed to dismiss notice.', 'simplybook'), 500);
        }

        return $this->sendHttpResponse(['notice_id' => $noticeId], true, __('Notice dismissed successfully.', 'simplybook'));
    }

    /**
     * Hide the notice for the given seconds for the current user.
     */
    public function snooze(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeId = $request->get_param('notice_id');
        $seconds = (int) $request->get_param('seconds');

        $success = $this->service->snoozeNotice(get_current_user_id(), $noticeId, $seconds);

        if ($success === false) {
            return $this->sendHttpResponse([], false, __('Failed to snooze notice.', 'simplybook'), 500);
        }

        return $this->sendHttpResponse(['notice_id' => $noticeId], true, __('Notice snoozed successfully.', 'simplybook'));
    }
}

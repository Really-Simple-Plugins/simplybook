<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Services\NoticeDismissalService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class NoticesDismissEndpoint implements SingleEndpointInterface
{
    use LegacySave;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'notices/dismiss';

    private NoticeDismissalService $service;

    public function __construct(NoticeDismissalService $service)
    {
        $this->service = $service;
    }

    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    public function registerRoute(): string
    {
        return self::ROUTE;
    }

    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'callback'],
            'permission_callback' => function() {
                return $this->adminAccessAllowed();
            },
            'args' => [
                'notice_type' => [
                    'required' => true,
                    'type' => 'string',
                    'description' => 'The type of notice to dismiss',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function($param) {
                        return in_array($param, $this->service->getAllowedNoticeTypes(), true);
                    },
                ],
            ],
        ];
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $noticeType = $request->get_param('notice_type');
        $userId = get_current_user_id();

        if (!$userId) {
            return $this->sendHttpResponse(
                [],
                false,
                esc_html__('User not authenticated.', 'simplybook'),
                401
            );
        }

        $success = $this->service->dismissNotice($userId, $noticeType);

        if (!$success) {
            return $this->sendHttpResponse(
                [],
                false,
                esc_html__('Failed to dismiss notice.', 'simplybook'),
                500
            );
        }

        return $this->sendHttpResponse(
            ['notice_type' => $noticeType],
            true,
            esc_html__('Notice dismissed successfully.', 'simplybook')
        );
    }
}
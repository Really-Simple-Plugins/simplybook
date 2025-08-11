<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class LogOutEndpoint implements SingleEndpointInterface
{
    use LegacySave; // todo
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'logout';

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
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * If the Login URL is requested this method will return a response with the
     * login URL and the direct URL.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        if ($request->get_param('user_confirmed') === false) {
            return $this->sendHttpResponse([], true, esc_html__('User prevented logout.', 'simplybook'));
        }

        $success = $this->delete_all_options();
        $message = esc_html__('User is logged out and will be redirected to onboarding.', 'simplybook');
        if (!$success) {
            $message = esc_html__('Failed to log out user.', 'simplybook');
        }
        $code = $success ? 200 : 500;

        return $this->sendHttpResponse([], $success, $message, $code);
    }
}
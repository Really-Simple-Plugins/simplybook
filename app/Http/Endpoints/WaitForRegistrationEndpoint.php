<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class WaitForRegistrationEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    public const ROUTE = 'check_registration_callback_status';

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
            'permission_callback' => [$this, 'adminAccessAllowed'],
        ];
    }

    /**
     * Check if the registration callback has been completed
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        // Check for failure state first
        $failed = get_option('simplybook_registration_failed', false);
        if ($failed) {
            delete_option('simplybook_registration_failed');
            return $this->sendHttpResponse([
                'status' => 'failed',
                'message' => __('Registration failed. Please try again.', 'simplybook'),
            ]);
        }

        $completed = (get_option('simplybook_refresh_company_token_expiration') > 0);
        return $this->sendHttpResponse([
            'status' => ($completed ? 'completed' : 'pending'),
        ]);
    }
}

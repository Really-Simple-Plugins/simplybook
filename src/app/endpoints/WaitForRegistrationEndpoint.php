<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\SingleEndpointInterface;

class WaitForRegistrationEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;

    const ROUTE = 'check_registration_callback_status';

    /**
     * Always enabled
     */
    public function enabled(): bool
    {
        return true;
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
     * Check if the registration callback has been completed
     */
    public function check_registration_callback_status(\WP_REST_Request $request): \WP_REST_Response
    {
        $completed  = (get_option('simplybook_refresh_company_token_expiration') > 0);
        return $this->sendHttpResponse([
            'status' => ($completed ? 'completed' : 'pending'),
        ]);
    }
}
<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\LegacyLoad;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class DomainEndpoint implements SingleEndpointInterface
{
    use LegacySave;
    use LegacyLoad;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_domain';

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
     * Return the company login domain in the WP_REST_Response.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $domain = $this->get_domain();
        $companyLoginPath = App::provide('client')->get_company_login();

        return $this->sendHttpResponse([
            'domain' => "https://$companyLoginPath.secure.$domain/",
        ]);
    }
}
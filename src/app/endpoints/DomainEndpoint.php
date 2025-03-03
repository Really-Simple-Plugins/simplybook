<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\SingleEndpointInterface;

class DomainEndpoint implements SingleEndpointInterface
{
    use Save;
    use HasRestAccess;

    const ROUTE = 'get_domain';

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
        'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Return the company login domain in the WP_REST_Response.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response {
        $domain = $this->get_option('domain');
        $companyLoginPath = App::provide('client')->get_company_login();

        return $this->sendHttpResponse([
            'domain' => "https://$companyLoginPath.secure.$domain/",
        ]);
    }
}
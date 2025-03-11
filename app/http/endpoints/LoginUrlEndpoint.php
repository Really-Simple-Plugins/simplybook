<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class LoginUrlEndpoint implements SingleEndpointInterface
{
    use Save; // todo
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_login_url';

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
     * If the Login URL is requested this method will return a
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $client = App::provide('client');

        $loginUrl = $client->get_login_url();
        $companyPath = $client->get_company_login();
        $domain = $this->get_option('domain');

        // todo - resolve us doing too many request and add proper error handling
        //if the login url returns empty, it's probably a too many attempts issue, we're probably already
        //logged in so we just return the url the user can use to go to the dashboard directly.
        if (empty($loginUrl)) {
            $loginUrl = "https://$companyPath.secure.$domain";
        }
        return $this->sendHttpResponse([
            'login_url' => $loginUrl,
            'direct_url' => "https://$companyPath.secure.$domain/v2",
        ]);
    }
}
<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\EndpointInterface;

class LoginUrlEndpoint implements EndpointInterface
{
    use Save; // todo
    use HasRestAccess;

    const ROUTE = 'get_login_url';

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
            'methods' => 'GET',
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
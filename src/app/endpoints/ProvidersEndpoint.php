<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\SingleEndpointInterface;

class ProvidersEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;

    const ROUTE = 'providers';

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
            'methods' => 'GET',
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Return providers as a WP_REST_Response.
     * @example [
     *      ['id'=>1,'name'=>'test'],
     *      ['id'=>2,'name'=>'Karel'],
     * ];
     * @see https://simplybook.me/en/api/developer-api/tab/rest_api#method_GET_/admin/providers
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $providers = App::provide('client')->get_providers();
        return $this->sendHttpResponse($providers);
    }
}
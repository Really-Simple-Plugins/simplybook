<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\EndpointInterface;

class ServicesEndpoint implements EndpointInterface
{
    use Save; // todo
    use HasRestAccess;

    const ROUTE = 'services';

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
            'methods' => 'POST',
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Return services as a WP_REST_Response.
     * @example [
     *      ['id'=>1,'name'=>'test'],
     *      ['id'=>2,'name'=>'Autobanden wissel'],
     * ];
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $services = App::provide('client')->get_services();
        return $this->sendHttpResponse($services);
    }
}
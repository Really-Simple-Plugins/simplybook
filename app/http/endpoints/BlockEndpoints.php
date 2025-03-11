<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Interfaces\MultiEndpointInterface;

class BlockEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;

    const ROUTE = 'internal';

    /**
     * Always allow creating the routes to prevent errors while fetching data
     * from the endpoints.
     */
    public function enabled(): bool
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            self::ROUTE . '/is-authorized' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'isAuthorized'],
            ],
            self::ROUTE . '/locations' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getLocations'],
            ],
            self::ROUTE . '/services' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getServices'],
            ],
            self::ROUTE . '/categories' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getCategories'],
            ],
            self::ROUTE . '/providers' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getProviders'],
            ],
        ];
    }

    public function isAuthorized(): bool
    {
        return App::provide('client')->company_registration_complete();
    }

    public function getLocations()
    {
        if (!$this->isAuthorized()){
            return [];
        }

        return App::provide('client')->getLocations(true);
    }

    public function getCategories()
    {
        if (!$this->isAuthorized()){
            return [];
        }

        return App::provide('client')->getCategories(true);
    }

    public function getServices()
    {
        if (!$this->isAuthorized()){
            return [];
        }

        return App::provide('client')->getServices(true);
    }

    public function getProviders()
    {
        if (!$this->isAuthorized()){
            return [];
        }

        $providers = App::provide('client')->getProviders(true);

        $isAnyProviderEnabled = App::provide('client')->isSpecialFeatureEnabled('any_unit');
        if ($isAnyProviderEnabled){
            //add any provider to the response
            $anyProvider = [
                'id' => 'any',
                'name' => esc_html__('Any provider', 'simplybook'),
                'qty' => 1
            ];
            $providers = array_merge([$anyProvider], $providers);
        }

        return $providers;
    }
}
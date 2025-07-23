<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Traits\IsAuthorized;

class BlockEndpoints implements MultiEndpointInterface
{
    use IsAuthorized;

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
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'isAuthorized'],
            ],
            self::ROUTE . '/locations' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getLocations'],
            ],
            self::ROUTE . '/services' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getServices'],
            ],
            self::ROUTE . '/categories' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getCategories'],
            ],
            self::ROUTE . '/providers' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getProviders'],
            ],
        ];
    }

    /**
     * Return the locations as an array.
     */
    public function getLocations(): array
    {
        if (!$this->isAuthorized()) {
            return [];
        }

        return App::provide('client')->getLocations(true);
    }

    /**
     * Return the categories as an array.
     */
    public function getCategories()
    {
        if (!$this->isAuthorized()) {
            return [];
        }

        return App::provide('client')->getCategories(true);
    }

    /**
     * Deprecated when the {@see \SimplyBook\Http\Endpoints\ServicesEndpoint}
     * response can be handled by the Gutenberg block.
     */
    public function getServices(): array
    {
        if (!$this->isAuthorized()) {
            return [];
        }

        return App::provide('client')->getServices(true);
    }

    /**
     * Deprecated when the {@see \SimplyBook\Http\Endpoints\ProvidersEndpoint}
     * also adds the 'any' provider to the response. And when the Gutenberg
     * block can handle the response.
     */
    public function getProviders()
    {
        if (!$this->isAuthorized()) {
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
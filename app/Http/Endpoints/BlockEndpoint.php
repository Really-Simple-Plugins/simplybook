<?php

namespace SimplyBook\Http\Endpoints;

use WP_Error;
use WP_REST_Request;
use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasNonces;
use SimplyBook\Traits\HasApiAccess;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Http\Entities\Service;
use SimplyBook\Http\Entities\ServiceProvider;
use SimplyBook\Interfaces\MultiEndpointInterface;

class BlockEndpoint implements MultiEndpointInterface
{
    use HasNonces;
    use HasApiAccess;
    use HasRestAccess;

    public const ROUTE = 'internal';

    private ApiClient $client;
    protected Service $service;
    protected ServiceProvider $serviceProvider;

    public function __construct(ApiClient $client, Service $service, ServiceProvider $serviceProvider)
    {
        $this->client = $client;
        $this->service = $service;
        $this->serviceProvider = $serviceProvider;
    }

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
                'permission_callback' => [$this, 'blockEditorAccessAllowed'],
                'callback' => [$this, 'companyRegistrationIsCompleted'],
            ],
            self::ROUTE . '/locations' => [
                'methods' => \WP_REST_Server::READABLE,
                'permission_callback' => [$this, 'blockEditorAccessAllowed'],
                'callback' => [$this, 'getLocations'],
            ],
            self::ROUTE . '/services' => [
                'methods' => \WP_REST_Server::READABLE,
                'permission_callback' => [$this, 'blockEditorAccessAllowed'],
                'callback' => [$this, 'getServices'],
            ],
            self::ROUTE . '/categories' => [
                'methods' => \WP_REST_Server::READABLE,
                'permission_callback' => [$this, 'blockEditorAccessAllowed'],
                'callback' => [$this, 'getCategories'],
            ],
            self::ROUTE . '/providers' => [
                'methods' => \WP_REST_Server::READABLE,
                'permission_callback' => [$this, 'blockEditorAccessAllowed'],
                'callback' => [$this, 'getProviders'],
            ],
        ];
    }

    /**
     * The block editor calls these routes. Every user that can edit posts
     * must be able to use the block. Check the 'edit_posts' capability and
     * the nonce.
     *
     * @return bool|WP_Error
     */
    public function blockEditorAccessAllowed(WP_REST_Request $request)
    {
        $canEditPosts = current_user_can('edit_posts');
        $validNonce = $this->verifyNonce($request->get_param('nonce'));

        if ($canEditPosts && $validNonce) {
            return true;
        }

        return $this->forbiddenError();
    }

    /**
     * Return the locations as an array.
     */
    public function getLocations(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return [];
        }

        return $this->client->getLocations(true);
    }

    /**
     * Return the categories as an array.
     */
    public function getCategories(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return [];
        }

        return $this->client->getCategories(true);
    }

    /**
     * Deprecated when the {@see \SimplyBook\Http\Endpoints\ServicesEndpoint}
     * response can be handled by the Gutenberg block.
     */
    public function getServices(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return [];
        }

        return $this->service->all();
    }

    /**
     * Deprecated when the {@see \SimplyBook\Http\Endpoints\ServicesProvidersEndpoint}
     * also adds the 'any' provider to the response. And when the Gutenberg
     * block can handle the response.
     */
    public function getProviders(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return [];
        }

        $providers = $this->serviceProvider->all();

        $isAnyProviderEnabled = $this->client->isSpecialFeatureEnabled('any_unit');
        if ($isAnyProviderEnabled) {
            //add any provider to the response
            $anyProvider = [
                'id' => 'any',
                'name' => __('Any provider', 'simplybook'),
                'qty' => 1
            ];
            $providers = array_merge([$anyProvider], $providers);
        }

        return $providers;
    }
}

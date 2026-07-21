<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Interfaces\SingleEndpointInterface;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class SubscriptionWidgetEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;
    use HasLogging;

    public const ROUTE = 'subscription_widget_embed_code';
    private const CONTAINER_ID = 'simplybook-subscription-widget';

    private ApiClient $client;
    private EnvironmentConfig $env;

    public function __construct(ApiClient $client, EnvironmentConfig $env)
    {
        $this->client = $client;
        $this->env = $env;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area.
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
     * Retrieve the subscription widget embed configuration for the Plans &
     * Prices page.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $returnUrl = add_query_arg(
            $this->env->getString('plugin.plans_prices_return_flag'),
            '1',
            $this->env->getUrl('plugin.plans_prices_url')
        );

        try {
            $widgetData = $this->client->getSubscriptionWidgetEmbedCode($returnUrl, self::CONTAINER_ID);
        } catch (RestDataException $e) {
            $this->log('Subscription widget embed code request failed: ' . $e->getMessage());
            return $this->sendHttpResponse(
                $e->getData(),
                false,
                $e->getMessage(),
                $e->getResponseCode()
            );
        }

        if (empty($widgetData)) {
            return $this->sendHttpResponse([], false, 'Subscription widget embed code could not be loaded.', 502);
        }

        return $this->sendHttpResponse($widgetData, true, 'Subscription widget embed code retrieved.');
    }
}

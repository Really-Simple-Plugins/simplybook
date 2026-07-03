<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class SubscriptionWidgetEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    public const ROUTE = 'subscription_widget_embed_code';
    private const CONTAINER_ID = 'simplybook-subscription-widget';
    private const RETURN_FLAG = 'simplybook_subscription_return';

    private ApiClient $client;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
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

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $returnUrl = add_query_arg(
            self::RETURN_FLAG,
            '1',
            simplybook_plans_prices_url()
        );

        $widgetData = $this->client->getSubscriptionWidgetEmbedCode($returnUrl, self::CONTAINER_ID);
        if (empty($widgetData)) {
            return $this->sendHttpResponse([], false, 'Subscription widget embed code could not be loaded.', 502);
        }

        return $this->sendHttpResponse($widgetData, true, 'Subscription widget embed code retrieved.');
    }
}

<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasWidget;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Builders\WidgetScriptBuilder;
use SimplyBook\Interfaces\SingleEndpointInterface;

class WidgetEndpoint implements SingleEndpointInterface
{
    use HasWidget;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_widget';

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
            'methods' => \WP_REST_Server::READABLE,
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Get and return widget javascript in the HTTP Response
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        return $this->sendHttpResponse([
            'widget' => $this->getCalendarWidget(),
        ]);
    }

    /**
     * Get the calendar widget without HTML wrapper
     */
    private function getCalendarWidget(): string
    {
        try {
            $builder = new WidgetScriptBuilder();
            $content = $builder->setWidgetType('calendar')
                ->setWidgetSettings($this->getWidgetSettings())
                ->build();
        } catch (BuilderException $e) {
            return '';
        }

        return $content;
    }
}
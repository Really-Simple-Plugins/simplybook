<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\HasWidget;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Builders\WidgetScriptBuilder;
use SimplyBook\Interfaces\MultiEndpointInterface;

class WidgetEndpoint implements MultiEndpointInterface
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
    public function registerRoutes(): array
    {
        return [
            'get_widget' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getCalendarWidget'],
            ],
            'get_preview_widget' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getPreviewWidget'],
            ],
        ];
    }

    /**
     * Get and return widget javascript in the HTTP Response
     */
    public function getCalendarWidget(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $builder = new WidgetScriptBuilder();
            $content = $builder->setWidgetType('calendar')
                ->setWidgetSettings($this->getWidgetSettings())
                ->build();
        } catch (BuilderException $e) {
            $content = '';
        }

        return $this->sendHttpResponse([
            'widget' => $content,
        ]);
    }

    /**
     * Get and return widget javascript in the HTTP Response. A preview
     * widget is build on the current form data, which is not saved to the
     * database yet.
     */
    public function getPreviewWidget(\WP_REST_Request $request): \WP_REST_Response
    {
        $widgetSettings = [];
        $storage = $this->retrieveHttpStorage($request);

        $isPreviewForDesignSettings = ($storage->getString('settings_section') === 'design_settings');
        $isPreviewBasedOnSettings = ($storage->getString('settings_section') !== 'design_settings');

        // This is probably always used as a fallback
        if ($isPreviewBasedOnSettings) {
            $widgetSettings = $this->getWidgetSettings();
        }

        // Create data for a preview-widget
        if ($isPreviewForDesignSettings) {
            $widgetSettings = $storage->add('server', $this->getServerURL())->delete([
                'nonce',
                'settings_section',
            ])->all();
        }

        try {
            $builder = new WidgetScriptBuilder();
            $content = $builder->setWidgetType('calendar')
                ->setWidgetSettings($widgetSettings)
                ->build();
        } catch (BuilderException $e) {
            $content = '';
        }

        return $this->sendHttpResponse([
            'widget' => $content,
        ]);
    }
}
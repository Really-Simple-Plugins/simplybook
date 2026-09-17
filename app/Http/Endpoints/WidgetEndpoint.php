<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Exceptions\FormException;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Services\DesignSettingsService;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Support\Builders\WidgetScriptBuilder;

class WidgetEndpoint implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    public const ROUTE = 'get_widget';

    protected DesignSettingsService $service;

    public function __construct(DesignSettingsService $service)
    {
        $this->service = $service;
    }

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
     * Get and return widget configuration settings in the HTTP Response
     */
    public function getCalendarWidget(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $builder = new WidgetScriptBuilder();
            $config = $builder->setWidgetType('calendar')
                ->setWidgetSettings($this->service->getDesignOptions())
                ->buildConfig();
        } catch (BuilderException $e) {
            $config = null;
        }

        return $this->sendHttpResponse([
            'widget' => $config,
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

        $isDesignSettingsPreview = ($storage->getString('settings_section') === 'design_settings');
        $isDefaultPreview = ($storage->getString('settings_section') !== 'design_settings');
        $isOnboardingPreview = ($storage->getBoolean('onboarding') === true);

        // This is probably always used as a fallback
        if ($isDefaultPreview && !$isOnboardingPreview) {
            $widgetSettings = $this->service->getDesignOptions();
        }

        // Create data for a preview-widget
        if ($isDesignSettingsPreview) {
            $widgetSettings = $storage->set('server', $this->service->getServerURL())->delete([
                'nonce',
                'settings_section',
            ])->all();
        }

        // Create data for a preview-widget during onboarding
        if ($isOnboardingPreview) {
            $widgetSettings = $this->service->getFallbackSettings(
                $storage->getString('primary'),
                $storage->getString('secondary'),
                $storage->getString('active')
            );
        }

        try {
            $this->service->validateSettings($widgetSettings);
        } catch (FormException $e) {
            return $this->sendHttpResponse(
                ['errors' => $e->getErrors()],
                false,
                esc_html__('Invalid settings', 'simplybook'),
                400
            );
        }

        try {
            $builder = new WidgetScriptBuilder();
            $config = $builder->setWidgetType('calendar')
                ->setWidgetSettings($widgetSettings)
                ->buildConfig();
        } catch (BuilderException $e) {
            $config = null;
        }

        return $this->sendHttpResponse([
            'widget' => $config,
        ]);
    }
}

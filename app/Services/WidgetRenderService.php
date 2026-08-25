<?php

namespace SimplyBook\Services;

use SimplyBook\Exceptions\BuilderException;
use SimplyBook\Http\ApiClient;
use SimplyBook\Support\Builders\WidgetScriptBuilder;

class WidgetRenderService
{
    private ApiClient $client;
    private DesignSettingsService $designSettings;

    public function __construct(ApiClient $client, DesignSettingsService $designSettings)
    {
        $this->client = $client;
        $this->designSettings = $designSettings;
    }

    /**
     * Render a widget from its type, predefined attributes, and wrapper ID.
     */
    public function render(string $widgetType, array $attributes = [], string $wrapperID = ''): string
    {
        try {
            $builder = new WidgetScriptBuilder();
            $builder->setWidgetType($widgetType)
                ->setAttributes($attributes)
                ->setWidgetSettings($this->designSettings->getDesignOptions())
                ->isAuthenticated(
                    $this->client->isAuthenticated()
                )
                ->withHTML();

            if (!empty($wrapperID)) {
                $builder->setWrapperID($wrapperID);
            }

            return $builder->build();
        } catch (BuilderException $e) {
            return '';
        }
    }
}

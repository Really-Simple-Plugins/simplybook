<?php

namespace SimplyBook\Controllers\Elementor;

use Elementor\Widgets_Manager;
use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Support\Widgets\ElementorWidget;

class ElementorController implements ControllerInterface
{
    public function register(): void
    {
        add_action('elementor/widgets/register', [$this, 'registerWidget']);
    }

    /**
     * Add the SimplyBook widget to Elementor when it is available.
     *
     * @param Widgets_Manager $widgetsManager Elementor widgets manager.
     */
    public function registerWidget(Widgets_Manager $widgetsManager): void
    {
        $widgetsManager->register(new ElementorWidget());
    }
}

<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Event;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Base for a time limited promotion for Trial users. The task is hidden by
 * default. The {@see TaskManagementListener} shows it, and sets the menu
 * bubble counter, during the promotion period.
 */
abstract class AbstractPromotionTask extends AbstractTask
{
    /**
     * @inheritDoc
     */
    protected bool $required = false;

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();
        $this->env = $env;
    }

    /**
     * Notify the {@see TaskManagementListener} so it can reset the menu
     * bubble counter it set for this promotion.
     */
    public function onDismiss(): void
    {
        Event::dispatch(Event::PROMOTION_TASK_DISMISSED);
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Claim discount', 'simplybook'),
            'link' => $this->env->getUrl('plugin.plans_prices_url'),
        ];
    }
}

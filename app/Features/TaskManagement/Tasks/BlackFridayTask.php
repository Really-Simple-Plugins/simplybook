<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Event;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class BlackFridayTask extends AbstractTask
{
    public const IDENTIFIER = 'black_friday';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * The environment configuration
     */
    private EnvironmentConfig $env;

    /**
     * We hide this task by default, and it is updated to "upgrade" status
     * during Black Friday period ánd only for Trial users in the
     * {@see TaskManagementListener}
     *
     * @since 3.2.4 bumped version to 1.0.1 due to the addition of a
     * constructor argument.
     * @since 3.3.2 bumped version to 1.0.2 due to the new
     * plugin.plans_prices_url env key. Version is set in the constructor
     * because property defaults leak into unserialized legacy instances,
     * defeating the version compare on upgrade.
     * @since 3.4.1 bumped version to 1.0.3 because the task is no longer
     * required so it can be dismissed.
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();

        $this->env = $env;
        $this->setVersion('1.0.3');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return sprintf(
            /* translators: 1: discount percentage, 2: promo code */
            __('Black Friday sale! Get %1$s Off SimplyBook.me with code %2$s', 'simplybook'),
            '<strong>' . $this->env->getString('simplybook.black_friday.discount_percentage') . '%</strong>',
            '<code>' . $this->env->getString('simplybook.black_friday.promo_code') . '</code>'
        );
    }

    /**
     * The {@see TaskManagementListener} sets the menu bubble counter for this
     * promotion. Notify the listener so it can reset the counter.
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

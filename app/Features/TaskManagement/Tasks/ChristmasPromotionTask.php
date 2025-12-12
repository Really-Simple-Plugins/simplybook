<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class ChristmasPromotionTask extends AbstractTask
{
    public const IDENTIFIER = 'christmas_promo';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * The environment configuration
     */
    private EnvironmentConfig $env;

    /**
     * We hide this task by default, and it is updated to "upgrade" status
     * during Christmas period ánd only for Trial users in the
     * {@see TaskManagementListener}
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();

        $this->env = $env;
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return sprintf(
            /* translators: 1: discount percentage, 2: promo code */
            __('Christmas promotion! Get %1$s Off SimplyBook.me with code %2$s', 'simplybook'),
            '<strong>' . $this->env->getString('simplybook.christmas_promo.discount_percentage') . '%</strong>',
            '<code>' . $this->env->getString('simplybook.christmas_promo.promo_code') . '</code>'
        );
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('Claim discount', 'simplybook'),
            'login_link' => 'v2/r/payment-widget',
        ];
    }
}

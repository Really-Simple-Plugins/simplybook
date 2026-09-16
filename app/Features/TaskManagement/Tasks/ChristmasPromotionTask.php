<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class ChristmasPromotionTask extends AbstractPromotionTask
{
    public const IDENTIFIER = 'christmas_promo';

    /**
     * @since 3.3.2 bumped version due to the new
     * plugin.plans_prices_url env key.
     * @since 3.4.1 bumped version to 1.0.2 because the task is no longer
     * required so it can be dismissed.
     */
    public function __construct(EnvironmentConfig $env)
    {
        parent::__construct($env);
        $this->setVersion('1.0.2');
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
}

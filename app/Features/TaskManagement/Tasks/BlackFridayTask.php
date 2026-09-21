<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class BlackFridayTask extends AbstractPromotionTask
{
    public const IDENTIFIER = 'black_friday';

    /**
     * @since 3.2.4 bumped version to 1.0.1 due to the addition of a
     * constructor argument.
     * @since 3.3.2 bumped version to 1.0.2 due to the new
     * plugin.plans_prices_url env key. Version is set in the constructor
     * because property defaults leak into unserialized legacy instances,
     * defeating the version compare on upgrade.
     * @since 3.5.0 bumped version to 1.0.3 because the task is no longer
     * required so it can be dismissed.
     */
    public function __construct(EnvironmentConfig $env)
    {
        parent::__construct($env);
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
}

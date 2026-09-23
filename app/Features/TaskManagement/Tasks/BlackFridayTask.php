<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class BlackFridayTask extends AbstractPromotionTask
{
    public const IDENTIFIER = 'black_friday';

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

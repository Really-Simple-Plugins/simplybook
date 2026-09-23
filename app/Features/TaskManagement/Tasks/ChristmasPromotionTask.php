<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class ChristmasPromotionTask extends AbstractPromotionTask
{
    public const IDENTIFIER = 'christmas_promo';

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

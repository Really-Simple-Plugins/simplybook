<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Bootstrap\App;
use SimplyBook\Features\TaskManagement\TaskManagementListener;

class BlackFridayTask extends AbstractTask
{
    public const IDENTIFIER = 'black_friday';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * We hide this task by default and it is updated to "upgrade" status
     * during Black Friday period ánd only for Trial users in the
     * {@see TaskManagementListener}
     */
    public function __construct()
    {
        $this->hide();
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return sprintf(
            /* translators: 1: discount percentage, 2: promo code */
            __('Black Friday sale! Get %1$s Off SimplyBook.me with code %2$s', 'simplybook'),
            '<strong>' . App::getInstance()->env->getString('simplybook.black_friday.discount_percentage') . '%</strong>',
            '<code>' . App::getInstance()->env->getString('simplybook.black_friday.promo_code') . '</code>'
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

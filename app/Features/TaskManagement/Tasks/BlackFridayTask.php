<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Bootstrap\App;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class BlackFridayTask extends AbstractTask
{
    public const IDENTIFIER = 'black_friday';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @since 3.2.4 bumped version due to the addition of a constructor
     * argument.
     */
    protected string $version = '1.0.1';

    /**
     * The environment configuration
     */
    private EnvironmentConfig $env;

    /**
     * We hide this task by default, and it is updated to "upgrade" status
     * during Black Friday period ánd only for Trial users in the
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
            __('Black Friday sale! Get %1$s Off SimplyBook.me with code %2$s', 'simplybook'),
            '<strong>' . $this->env->getString('simplybook.black_friday.discount_percentage') . '%</strong>',
            '<code>' . $this->env->getString('simplybook.black_friday.promo_code') . '</code>'
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

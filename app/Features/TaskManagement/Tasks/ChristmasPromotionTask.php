<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class ChristmasPromotionTask extends AbstractTask
{
    public const IDENTIFIER = 'christmas_promo';

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
     * during Christmas period ánd only for Trial users in the
     * {@see TaskManagementListener}
     *
     * @since 3.3.2 bumped version due to the new
     * plugin.plans_prices_url env key.
     * @since 3.4.1 bumped version to 1.0.2 because the task is no longer
     * required so it can be dismissed.
     */
    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();

        $this->env = $env;
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

    /**
     * The promotion sets the menu bubble counter. Reset the counter so the
     * admin menu badge disappears after the dismiss.
     */
    public function onDismiss(): void
    {
        update_option(self::MENU_BUBBLE_OPTION_KEY, 0);
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

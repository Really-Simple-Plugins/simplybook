<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use Carbon\Carbon;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Base for a time limited promotion for Trial users. The task is hidden by
 * default. The {@see TaskManagementListener} shows it during the promotion
 * period.
 */
abstract class AbstractPromotionTask extends AbstractTask
{
    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * A dismissed promotion task must show again each year.
     * {@see setVersionFromPromotionYear} gives a new version each year.
     * The upgrade then resets the status one time in each year.
     */
    protected bool $reactivateOnUpgrade = true;

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();
        $this->env = $env;

        // Always set version in the constructor to override cached property
        // values in the database of a user.
        $this->setVersionFromPromotionYear();
    }

    /**
     * This method in combination with {@see $reactivateOnUpgrade} makes sure a
     * promotional task is reactivated every year. It uses the year value from
     * the dates stored in the env config.
     */
    protected function setVersionFromPromotionYear(): void
    {
        $startDate = $this->env->getString(
            'simplybook.' . static::IDENTIFIER . '.start_date',
        );

        $yearFromDate = Carbon::parse($startDate)->format('Y');

        $this->setVersion(
            '2.0.' . $yearFromDate,
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
            'link' => $this->env->getUrl('plugin.plans_prices_url'),
        ];
    }
}

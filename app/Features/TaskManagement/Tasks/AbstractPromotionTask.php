<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use Carbon\Carbon;
use SimplyBook\Support\Helpers\Event;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Base for a time limited promotion for Trial users. The task is hidden by
 * default. The {@see TaskManagementListener} shows it, and sets the menu
 * bubble counter, during the promotion period. The period is read from the
 * env config under `simplybook.{IDENTIFIER}.start_date` and `end_date`.
 */
abstract class AbstractPromotionTask extends AbstractTask
{
    /**
     * @inheritDoc
     */
    protected bool $required = false;

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->hide();
        $this->env = $env;
    }

    /**
     * Whether the promotion period is running right now. The result is
     * cached for an hour because this runs on every admin page load. Near
     * the end of the period the cache is reduced to 5 minutes so the task
     * disappears on time.
     */
    public function isActive(): bool
    {
        $hasCache = false;
        $cacheName = 'simplybook_promotion_' . $this->getId() . '_is_active';
        $cache = wp_cache_get($cacheName, 'simplybook', false, $hasCache);

        // The $hasCache variable is set by reference in wp_cache_get
        if ($hasCache) {
            return (bool) $cache;
        }

        $timezone = wp_timezone();
        $now = Carbon::now($timezone);

        $start = Carbon::parse(
            $this->env->getString('simplybook.' . $this->getId() . '.start_date'),
            $timezone
        );
        $end = Carbon::parse(
            $this->env->getString('simplybook.' . $this->getId() . '.end_date'),
            $timezone
        )->endOfDay();

        $cacheDuration = HOUR_IN_SECONDS;
        if ($now->diffInSeconds($end, false) <= $cacheDuration) {
            $cacheDuration = MINUTE_IN_SECONDS * 5;
        }

        $isActive = $now->betweenIncluded($start, $end);

        wp_cache_set($cacheName, $isActive, 'simplybook', $cacheDuration);
        return $isActive;
    }

    /**
     * Notify the {@see TaskManagementListener} so it can reset the menu
     * bubble counter it set for this promotion.
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

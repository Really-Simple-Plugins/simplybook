<?php

namespace SimplyBook\Support\Utility;

use Carbon\Carbon;

class DateUtility
{
    /**
     * Check if the current moment is inside a date range. Both dates are
     * inclusive: the range runs from 00:00 on the start date until 23:59:59
     * on the end date, in the WordPress timezone.
     */
    public static function isNowBetweenDates(string $startDate, string $endDate): bool
    {
        $timezone = wp_timezone();

        return Carbon::now($timezone)->betweenIncluded(
            Carbon::parse($startDate, $timezone)->startOfDay(),
            Carbon::parse($endDate, $timezone)->endOfDay()
        );
    }

    /**
     * Seconds from now until the end of the given date in the WordPress
     * timezone. Negative when that moment has passed. Used to shorten cache
     * times near a deadline.
     */
    public static function secondsUntilEndOfDate(string $date): int
    {
        $timezone = wp_timezone();

        return (int) Carbon::now($timezone)->diffInSeconds(
            Carbon::parse($date, $timezone)->endOfDay(),
            false
        );
    }
}

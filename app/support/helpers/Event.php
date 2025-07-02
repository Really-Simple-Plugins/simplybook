<?php

namespace SimplyBook\Helpers;

/**
 * Event class to handle SimplyBook events. Useful for dispatching events and
 * catching them in different parts of the application based on the constants.
 * @see \SimplyBook\Features\TaskManagement\TaskManagementListener
 * @internal This could be an ENUM when supported.
 */
class Event
{
    /**
     * Event names
     */
    const EMPTY_SERVICES = 'empty_services';
    const EMPTY_PROVIDERS = 'empty_providers';
    const HAS_SERVICES = 'has_services';
    const HAS_PROVIDERS = 'has_providers';
    const NAVIGATE_TO_SIMPLYBOOK = 'navigate_to_simplybook';
    const SUBSCRIPTION_DATA_LOADED = 'subscription_data_loaded';
    const SPECIAL_FEATURES_LOADED = 'special_features_loaded';
    const AUTH_FAILED = 'auth_failed';
    const AUTH_SUCCEEDED = 'auth_succeeded';
    const CALENDAR_PUBLISHED = 'calendar_published';
	const CALENDAR_UNPUBLISHED = 'calendar_unpublished';
    const PUBLISH_WIDGET_TASK_DISMISSED = 'publish_widget_task_dismissed';

    /**
     * Execute a WordPress event based on our constants.
     */
    public static function dispatch(string $event, array $arguments = []): void
    {
        self::validate($event);
        do_action('simplybook_event_' . $event, $arguments);
    }

    /**
     * Check if the given event matches the specified event.
     */
    public static function matches(string $event, string $eventToCheck): bool
    {
        self::validate($event);
        self::validate($eventToCheck);

        return $event === $eventToCheck;
    }

    /**
     * Validate a given event name based on our constants.
     * @throws \InvalidArgumentException
     */
    private static function validate(string $event): void
    {
        if (!defined('self::' . strtoupper($event))) {
            throw new \InvalidArgumentException(sprintf('Invalid event name: %s', esc_html($event)));
        }
    }
}
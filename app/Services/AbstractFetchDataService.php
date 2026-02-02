<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\Http\ApiClient;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Utility\StringUtility;

abstract class AbstractFetchDataService
{
    /**
     * Prefix for cache identifier. Used for option names and wp_cache keys,
     * suffixed with the identifier in {@see getCacheName}.
     *
     * Property can be overridden by child implementations, but is advised not
     * to be changed. Some older classes like {@see SubscriptionDataService}
     * override it for backward compatibility.
     */
    protected string $cachePrefix = 'simplybook_cached';

    /**
     * Identifier is used for cache keys, option names and consistency
     * across all fetch data services. Example: "company_info"
     */
    protected string $identifier;

    /**
     * Indicates if the data fetched by this service should be persisted
     * in the database using update_option/get_option. When false, the data
     * is only cached in memory for the duration of the request.
     */
    protected bool $persistent = true;

    protected ApiClient $client;

    final public function __construct(ApiClient $client)
    {
        $this->client = $client;

        if (empty($this->identifier)) {
            throw new \RuntimeException('Service identifier must be defined.');
        }

        $this->identifier = StringUtility::toSnakeCase($this->identifier);
    }

    /**
     * Method is used for implementing the API request logic. Child
     * implementation calls the correct ApiClient method and returns the raw
     * response as an array without mutating it. Mutation belongs in
     * {@see processData()}.
     */
    abstract public function fetch(): array;

    /**
     * Method is used for fetching fresh data from the API and persisting it,
     * so other parts of the plugin can work with a consistent and cached shape.
     */
    final public function restore(): array
    {
        $data = $this->fetch();
        return $this->save($data);
    }

    /**
     * Method is used for storing a normalized version of the data and adding
     * a timestamp that allows strict expiration checks. Child classes can
     * implement {@see processData()} to mutate the data before it is persisted.
     * Afterward "updated_at_utc" is always added or updated, which is used for
     * expiration checks in {@see self::all()}.
     */
    final public function save(array $data): array
    {
        $data = $this->processData($data);

        $data['updated_at_utc'] = Carbon::now('UTC')->toDateTimeString();

        $this->persistData($data);
        $this->dispatchDataLoaded($data);

        return $data;
    }

    /**
     * Method is used for retrieving a specific key from the cached data using
     * Storage so dot notation can be used by consumers.
     *
     * A colon can be used instead of a dot to avoid conflicts in route params.
     *
     * @example /wp-json/simplybook/v1/subscription_data/limits:booking-website
     */
    final public function search(string $key, $default = null)
    {
        $storage = new Storage($this->all());

        $key = str_replace(':', '.', $key);

        return $storage->get($key, $default);
    }

    /**
     * Method is used for retrieving data from persistent storage while always
     * using wp_cache to prevent repeated option reads within a request.
     *
     * When $hasExpiration is true, the timestamp is used to verify the data is
     * still fresh based on {@see getDataTimeThreshold()}. When the data is
     * stale, an empty array is returned.
     */
    final public function all(bool $hasExpiration = false): array
    {
        $cacheName = $this->getWpCacheName($hasExpiration);
        $cacheValue = wp_cache_get($cacheName, $this->getWpCacheGroup(), false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $data = $this->readPersistedData();
        if (empty($data) || empty($data['updated_at_utc'])) {
            return [];
        }

        if ($hasExpiration === true) {
            $updatedAt = Carbon::parse($data['updated_at_utc']);
            if ($updatedAt->diffInSeconds(Carbon::now('UTC')) > $this->getDataTimeThreshold()) {
                return [];
            }
        }

        $this->dispatchDataLoaded($data);

        wp_cache_set(
            $cacheName,
            $data,
            $this->getWpCacheGroup(),
            $this->getDataTimeThreshold()
        );

        return $data;
    }

    /**
     * Method can be used by child implementations to normalize or transform
     * the raw data fetched from the API before it is persisted. By default,
     * it returns the data as-is.
     */
    protected function processData(array $data): array
    {
        return $data;
    }

    /**
     * Method is used for configuring how long data is considered fresh, which
     * is used for strict expiration checks and for wp_cache TTL. By default,
     * it is set to 5 minutes, but child implementations can override it.
     */
    protected function getDataTimeThreshold(): int
    {
        return 5 * MINUTE_IN_SECONDS;
    }

    /**
     * Child classes can use this method to dispatch an event or perform
     * additional logic when data is saved via {@see save} or from
     * persistent storage via {@see all}.
     */
    protected function dispatchDataLoaded(array $data): void
    {
    }

    /**
     * Method is used for configuring the wp_cache group used for caching
     * the data in memory. By default, it is set to "simplybook", but child
     * implementations can override it.
     */
    protected function getWpCacheGroup(): string
    {
        return 'simplybook';
    }

    /**
     * Returns the wp_cache key name based on the identifier and expiration
     * requirement. Not overridable by child classes.
     */
    private function getWpCacheName(bool $hasExpiration): string
    {
        return $this->getCacheName() . '_' . ($hasExpiration ? 'with-expiration' : 'no-expiration');
    }

    /**
     * Persist the data to the database using update_option. When persistence
     * is disabled, this method does nothing. Not overridable by child classes.
     */
    private function persistData(array $data): void
    {
        if ($this->persistent === false) {
            return;
        }

        update_option($this->getCacheName(), $data, false);
    }

    /**
     * Read the persisted data from the database using get_option. When
     * persistence is disabled, this method returns an empty array. Not
     * overridable by child classes.
     */
    private function readPersistedData(): array
    {
        if ($this->persistent === false) {
            return [];
        }

        $data = get_option($this->getCacheName(), []);
        return is_array($data) ? $data : [];
    }

    /**
     * Get the cache name used for option names and wp_cache keys. Not
     * overridable by child classes.
     */
    private function getCacheName(): string
    {
        return $this->cachePrefix . '_' . $this->identifier;
    }
}

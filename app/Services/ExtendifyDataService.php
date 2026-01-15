<?php

namespace SimplyBook\Services;

/**
 * Service for handling Extendify integration data.
 * Extendify provides business category and services information
 * that can be used to pre-fill onboarding data.
 */
class ExtendifyDataService
{
    /**
     * The option key where Extendify stores its data.
     */
    private const OPTION_KEY = 'extendify_simplybook_data';

    /**
     * Cached Extendify data to avoid multiple database queries.
     */
    private ?array $cachedData = null;

    /**
     * Get all Extendify data.
     *
     * @return array The Extendify data or empty array if not available
     */
    public function getData(): array
    {
        if ($this->cachedData === null) {
            $this->cachedData = $this->fetchAndParseData();
        }

        return $this->cachedData;
    }

    /**
     * Get the business category from Extendify data.
     *
     * @return int|null The category ID or null if not available
     */
    public function getCategory(): ?int
    {
        $data = $this->getData();

        if (isset($data['category']) && is_numeric($data['category'])) {
            return (int) $data['category'];
        }

        return null;
    }

    /**
     * Get the services from Extendify data.
     *
     * @return array Array of service names or empty array if not available
     */
    public function getServices(): array
    {
        $data = $this->getData();

        if (isset($data['services']) && is_array($data['services'])) {
            return $data['services'];
        }

        return [];
    }

    /**
     * Check if Extendify data is available.
     *
     * @return bool True if Extendify data exists
     */
    public function hasData(): bool
    {
        $data = $this->getData();
        return !empty($data);
    }

    /**
     * Check if Extendify has provided a category.
     *
     * @return bool True if category is available
     */
    public function hasCategory(): bool
    {
        return $this->getCategory() !== null;
    }

    /**
     * Check if Extendify has provided services.
     *
     * @return bool True if services are available
     */
    public function hasServices(): bool
    {
        return !empty($this->getServices());
    }

    /**
     * Fetch and parse Extendify data from the database.
     *
     * @return array Parsed data or empty array
     */
    private function fetchAndParseData(): array
    {
        $extendifyData = get_option(self::OPTION_KEY, []);

        if (empty($extendifyData)) {
            return [];
        }

        // Handle serialized data (WordPress may store it serialized)
        if (is_string($extendifyData) && is_serialized($extendifyData)) {
            $extendifyData = maybe_unserialize($extendifyData);
        }

        return is_array($extendifyData) ? $extendifyData : [];
    }
}

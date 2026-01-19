<?php

namespace SimplyBook\Services;

use SimplyBook\Http\ApiClient;
use SimplyBook\Support\Helpers\Event;

class CompanyInfoService
{
    /**
     * Cache duration for company info check (24 hours).
     */
    public const CACHE_DURATION = DAY_IN_SECONDS;

    /**
     * Option key to store the cached company info check result.
     */
    public const CACHE_OPTION = 'simplybook_company_info_check_cache';

    protected ApiClient $client;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
    }

    /**
     * Fetch company info from the SimplyBook API.
     */
    public function fetch(): array
    {
        if ($this->client->company_registration_complete() === false) {
            return [];
        }

        $cacheName = 'simplybook_company_info';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_array($cacheValue)) {
            return $cacheValue;
        }

        $response = $this->client->api_call('admin/company', [], 'GET');

        // Temporary logging to verify API response structure
        error_log('SimplyBook CompanyInfo API Response: ' . print_r($response, true));

        wp_cache_set($cacheName, $response, 'simplybook', MINUTE_IN_SECONDS);
        return $response;
    }

    /**
     * Check if company info is present (has required fields filled).
     * Caches the result for 24 hours.
     *
     * @return bool True if company info is present, false otherwise
     */
    public function hasCompanyInfo(): bool
    {
        // Check cached result first
        $cached = $this->getCachedCheckResult();
        if ($cached !== null) {
            return $cached;
        }

        // Fetch and check company info
        $companyInfo = $this->fetch();
        $hasInfo = $this->validateCompanyInfo($companyInfo);

        // Cache the result
        $this->cacheCheckResult($hasInfo);

        // Dispatch event for listeners
        Event::dispatch(Event::COMPANY_INFO_CHECKED, ['has_company_info' => $hasInfo]);

        return $hasInfo;
    }

    /**
     * Validate if the company info contains the required fields.
     * Company info is considered present if it has name and address.
     */
    private function validateCompanyInfo(array $companyInfo): bool
    {
        if (empty($companyInfo)) {
            return false;
        }

        // Check for essential company info fields
        $name = $companyInfo['name'] ?? '';
        $address = $companyInfo['address1'] ?? '';

        return !empty($name) && !empty($address);
    }

    /**
     * Get the cached check result.
     *
     * @return bool|null True/false if cached, null if cache expired or not set
     */
    private function getCachedCheckResult(): ?bool
    {
        $cached = get_option(self::CACHE_OPTION, []);

        if (empty($cached) || !isset($cached['checked_at'])) {
            return null;
        }

        $checkedAt = (int) $cached['checked_at'];
        if ((time() - $checkedAt) >= self::CACHE_DURATION) {
            return null; // Cache expired
        }

        return (bool) ($cached['has_company_info'] ?? false);
    }

    /**
     * Cache the check result for 24 hours.
     */
    private function cacheCheckResult(bool $hasCompanyInfo): void
    {
        update_option(self::CACHE_OPTION, [
            'checked_at' => time(),
            'has_company_info' => $hasCompanyInfo,
        ], false);
    }

    /**
     * Clear the cached check result.
     */
    public function clearCache(): void
    {
        delete_option(self::CACHE_OPTION);
    }
}

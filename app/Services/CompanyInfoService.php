<?php

namespace SimplyBook\Services;

use SimplyBook\Http\ApiClient;
use SimplyBook\Support\Helpers\Event;

/**
 * Service to check if company info (name and address) is present.
 */
class CompanyInfoService
{
    private const CACHE_DURATION = DAY_IN_SECONDS;
    private const CACHE_OPTION = 'simplybook_company_info_check_cache';

    private ApiClient $client;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
    }

    /**
     * Check if company info is present (has name and address filled).
     * Caches the result for 24 hours.
     */
    public function hasCompanyInfo(): bool
    {
        $cached = $this->getCachedResult();
        if ($cached !== null) {
            return $cached;
        }

        $hasInfo = $this->checkCompanyInfoViaApi();

        $this->cacheResult($hasInfo);

        Event::dispatch(Event::COMPANY_INFO_CHECKED, ['has_company_info' => $hasInfo]);

        return $hasInfo;
    }

    /**
     * Clear the cached result.
     */
    public function clearCache(): void
    {
        delete_option(self::CACHE_OPTION);
    }

    /**
     * Fetch company info from API and check if name and address are present.
     */
    private function checkCompanyInfoViaApi(): bool
    {
        if ($this->client->company_registration_complete() === false) {
            return false;
        }

        $response = $this->client->api_call('admin/company', [], 'GET');

        if (empty($response)) {
            return false;
        }

        $name = $response['name'] ?? '';
        $address = $response['address1'] ?? '';

        return !empty($name) && !empty($address);
    }

    /**
     * Get cached result if still valid.
     */
    private function getCachedResult(): ?bool
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
     * Cache the result.
     */
    private function cacheResult(bool $hasCompanyInfo): void
    {
        update_option(self::CACHE_OPTION, [
            'checked_at' => time(),
            'has_company_info' => $hasCompanyInfo,
        ], false);
    }
}

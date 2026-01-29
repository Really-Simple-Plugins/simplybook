<?php

namespace SimplyBook\Services;

use SimplyBook\Support\Helpers\Event;

class CompanyInfoService extends AbstractFetchDataService
{
    /**
     * @inheritDoc
     */
    protected string $identifier = 'company_info';

    /**
     * Fields required for company info to be considered complete.
     */
    private array $requiredCompanyInfo = [
        'name',
        'address1',
    ];

    /**
     * Check if the provided company info has all required fields filled. This
     * does NOT fetch or restore any data, it only checks the provided data
     * to the {@see $requiredCompanyInfo} fields.
     */
    public function hasRequiredInfo(array $companyInfo): bool
    {
        foreach ($this->requiredCompanyInfo as $field) {
            if (empty($companyInfo[$field])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Fetch the company info from the SimplyBook API
     * @return array The company info
     */
    public function fetch(): array
    {
        return $this->client->getCompanyInfo();
    }

    /**
     * Company info data is considered fresh for 1 day when not overridden by a
     * new fetch or restore operation.
     */
    protected function getDataTimeThreshold(): int
    {
        return DAY_IN_SECONDS;
    }

    /**
     * Trigger {@see Event::COMPANY_INFO_LOADED} when company info is loaded.
     */
    protected function dispatchDataLoaded(array $data): void
    {
        Event::dispatch(Event::COMPANY_INFO_LOADED, $data);
    }
}

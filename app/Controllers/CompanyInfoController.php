<?php

namespace SimplyBook\Controllers;

use SimplyBook\Support\Helpers\Event;
use SimplyBook\Services\CompanyInfoService;
use SimplyBook\Interfaces\ControllerInterface;

class CompanyInfoController implements ControllerInterface
{
    private CompanyInfoService $service;

    public function __construct(CompanyInfoService $service)
    {
        $this->service = $service;
    }

    public function register(): void
    {
        if (isset($_GET['admin']) && $_GET['admin'] === 'rsp') {
            add_action('init', [$this, 'handleCompanyInfoTask']);
        }
        add_action('simplybook_daily', [$this, 'handleCompanyInfoTask']);
    }

    /**
     * This method makes sure we fetch company info from the API only while the
     * information is incomplete. This is because we use the non-strict mode
     * on the {@see CompanyInfoService::all()} method. It does trigger
     * the event on a daily basis, but because the data is cached,
     * it does not make unnecessary API calls.
     */
    public function handleCompanyInfoTask(): void
    {
        $currentCompanyInfo = $this->service->all(); // non strict!
        $hasRequiredInfo = $this->service->hasRequiredInfo($currentCompanyInfo);

        if (empty($currentCompanyInfo) || !$hasRequiredInfo) {
            $currentCompanyInfo = $this->service->restore();
            $hasRequiredInfo = $this->service->hasRequiredInfo($currentCompanyInfo);
        }

        Event::dispatch(Event::COMPANY_INFO_LOADED, [
            'company_info' => $currentCompanyInfo,
            'has_required_info' => $hasRequiredInfo,
        ]);
    }
}

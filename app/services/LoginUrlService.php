<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\LegacyLoad;

class LoginUrlService
{
    use LegacyLoad;

    const LOGIN_URL_CREATION_DATE_OPTION = 'simplybook_login_url_creation_date';

    /**
     * Returns de SimplyBook dashboard URL containing the company path and the
     * SimplyBook domain WITHOUT trailing slash.
     */
    public function getDashboardUrl(): string
    {
        $simplyBookDomain = $this->get_domain();
        $simplyBookCompanyPath = App::provide('client')->get_company_login();
        return "https://$simplyBookCompanyPath.secure.$simplyBookDomain";
    }

    /**
     * Returns the login URL for the user. If the login URL is not valid or has
     * expired, a new login URL will be fetched. If the user should be logged in
     * already then the dashboard URL will be returned.
     */
    public function getLoginUrl(): string
    {
        $loginUrlCreationDate = get_option(self::LOGIN_URL_CREATION_DATE_OPTION, '');

        if ($this->userShouldBeLoggedIn($loginUrlCreationDate)) {
            return $this->getDashboardUrl();
        }

        return $this->fetchNewAutomaticLoginUrl();
    }

    /**
     * Method checks if the user should be logged in already. This is based on
     * the login URL creation date. A user should be logged in for one hour.
     *
     * @param string $loginUrlCreationDate Can only be empty if the login-hash
     * was never created before. We then assume a user is not logged in.
     */
    protected function userShouldBeLoggedIn(string $loginUrlCreationDate): bool
    {
        if (empty($loginUrlCreationDate)) {
            return false;
        }

        $userLoggedThreshold = Carbon::now()->subHour();
        return Carbon::parse($loginUrlCreationDate)->isAfter($userLoggedThreshold);
    }

    /**
     * Method fetches a new login URL for the user and stores it in the options.
     * Returns the login URL containing the login hash WITHOUT trailing slash.
     */
    protected function fetchNewAutomaticLoginUrl(): string
    {
        try {
            $loginHashData = App::provide('client')->createLoginHash();
        } catch (\Exception $e) {
            return $this->getDashboardUrl();
        }

        $loginUrlValue = $loginHashData['login_url'];
        $loginUrlCreationDate = Carbon::now('UTC')->toDateTimeString();

        update_option(self::LOGIN_URL_CREATION_DATE_OPTION, $loginUrlCreationDate, false);

        return untrailingslashit($loginUrlValue);
    }
}
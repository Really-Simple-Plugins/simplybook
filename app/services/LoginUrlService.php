<?php

namespace SimplyBook\Services;

use Carbon\Carbon;
use SimplyBook\App;
use SimplyBook\Traits\LegacyLoad;

class LoginUrlService
{
    use LegacyLoad;

    const LOGIN_URL_OPTION = 'simplybook_login_url_value';
    const LOGIN_URL_EXPIRY_DATE_OPTION = 'simplybook_login_url_expiry_date';
    const LOGIN_URL_CREATION_DATE_OPTION = 'simplybook_login_url_creation_date';

    /**
     * Returns de SimplyBook dashboard URL containing the company path and the
     * SimplyBook domain.
     */
    public function getDashboardUrl(): string
    {
        $simplyBookDomain = $this->get_option('domain');
        $simplyBookCompanyPath = App::provide('client')->get_company_login();
        return "https://$simplyBookCompanyPath.secure.$simplyBookDomain/v2";
    }

    /**
     * Returns the login URL for the user. If the login URL is not valid or has
     * expired, a new login URL will be fetched. If the user should be logged in
     * already then the dashboard URL will be returned.
     */
    public function getLoginUrl(): string
    {
        $loginUrlValue = get_option(self::LOGIN_URL_OPTION, '');
        $loginUrlExpiryDate = get_option(self::LOGIN_URL_EXPIRY_DATE_OPTION, '');
        $loginUrlCreationDate = get_option(self::LOGIN_URL_CREATION_DATE_OPTION, '');

        if ($this->isLoginUrlValid($loginUrlValue, $loginUrlExpiryDate)) {
            return $loginUrlValue;
        }

        if ($this->userShouldBeLoggedIn($loginUrlCreationDate)) {
            return $this->getDashboardUrl();
        }

        return $this->fetchNewAutomaticLoginUrl();
    }

    /**
     * Method checks if the login URL is valid and has not expired.
     */
    protected function isLoginUrlValid(string $loginUrlValue, string $loginUrlExpiryDate): bool
    {
        return !empty($loginUrlValue) && Carbon::parse($loginUrlExpiryDate)->isFuture();
    }

    /**
     * Method checks if the user should be logged in already. This is based on
     * the login URL creation date. A user should be logged in for one hour.
     */
    protected function userShouldBeLoggedIn(string $loginUrlCreationDate): bool
    {
        $userLoggedThreshold = Carbon::now()->subHour();
        return !empty($loginUrlCreationDate) && Carbon::parse($loginUrlCreationDate)->isBefore($userLoggedThreshold);
    }

    /**
     * Method fetches a new login URL for the user and stores it in the options.
     * Returns the login URL containing the login hash.
     */
    protected function fetchNewAutomaticLoginUrl(): string
    {
        try {
            $loginHashData = App::provide('client')->createLoginHash();
        } catch (\Exception $e) {
            return $this->getDashboardUrl();
        }

        $loginUrlValue = $loginHashData['login_url'];
        $loginUrlExpiryDate = $loginHashData['expire_date'];
        $loginUrlCreationDate = Carbon::now()->toDateTimeString();

        update_option(self::LOGIN_URL_OPTION, $loginUrlValue, false);
        update_option(self::LOGIN_URL_EXPIRY_DATE_OPTION, $loginUrlExpiryDate, false);
        update_option(self::LOGIN_URL_CREATION_DATE_OPTION, $loginUrlCreationDate, false);

        return $loginUrlValue;
    }
}
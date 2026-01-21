<?php

namespace SimplyBook\Features\Onboarding;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasEncryption;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Support\Builders\CompanyBuilder;
use SimplyBook\Support\Helpers\Storage;

class OnboardingService
{
    use HasEncryption;
    use LegacySave;
    use HasRestAccess;

    private ApiClient $client;

    public function __construct(ApiClient $client)
    {
        $this->client = $client;
    }

    /**
     * Store the onboarding step in the general options without autoload
     */
    public function setCompletedStep(int $step): void
    {
        update_option('simplybook_completed_step', $step, false);
    }

    /**
     * Set the onboarding as completed in the general options without autoload
     */
    public function setOnboardingCompleted(): bool
    {
        $this->setCompletedStep(5);
        $this->clearTemporaryData();

        $this->client->clearFailedAuthenticationFlag();

        $completedPreviously = get_option('simplybook_onboarding_completed', false);
        if ($completedPreviously) {
            return true;
        }

        return update_option('simplybook_onboarding_completed', true, false);
    }

    /**
     * This method should be called after a successful company registration request.
     * Note: completed_step is set in RegistrationCallbackEndpoint after callback authentication succeeds.
     */
    public function finishCompanyRegistration(): void
    {
        update_option("simplybook_company_registration_start_time", time(), false);
    }

    /**
     * Store company data from the onboarding step in the options
     */
    public function storeCompanyData(CompanyBuilder $companyBuilder): void
    {
        $options = get_option('simplybook_company_data', []);

        $companyData = array_filter($companyBuilder->toArray());
        foreach ($companyData as $key => $value) {
            $options[$key] = $value;
        }

        update_option('simplybook_company_data', $options);
    }

    /**
     * Method is used to build the company domain and login based on the given
     * domain and login values. For non-default domains the domain should be
     * appended to the login for the authentication process. The domains are
     * maintained here {@see react/src/routes/onboarding.lazy.jsx}
     *
     * @see https://teamdotblue.atlassian.net/browse/NL14RSP2-49?focusedCommentId=3407285
     *
     * @example Domain: login:simplybook.vip & Login: admin -> [simplybook.vip, admin.simplybook.vip]
     * @example Domain: default:simplybook.it & login: admin -> [simplybook.it, admin]
     *
     * @since 3.2.4 All domains are now listed as "default": in config/env.php,
     * reference: {@see https://teamdotblue.atlassian.net/browse/NL14RSP2-335}
     */
    public function parseCompanyDomainAndLogin(string $domain, string $login): array
    {
        $companyDomainContainsLoginIdentifier = strpos($domain, 'login:') === 0;
        $domain = substr($domain, strpos($domain, ':') + 1);

        if ($companyDomainContainsLoginIdentifier) {
            $login .= '.' . $domain;
        }

        return [$domain, $login];
    }

    /**
     * Method can be used to set temporary data for the onboarding process.
     */
    public function setTemporaryData(array $data): void
    {
        $options = get_option('simplybook_temporary_onboarding_data', []);
        $options = array_merge($options, $data);
        update_option('simplybook_temporary_onboarding_data', $options, false);
    }

    /**
     * Method can be used to retrieve temporary data for the onboarding process.
     * Returns the array of data as a Storage object for easier access.
     */
    public function getTemporaryDataStorage(): Storage
    {
        return new Storage(
            get_option('simplybook_temporary_onboarding_data', [])
        );
    }

    /**
     * Method should be used to clear the temporary data for the onboarding.
     */
    public function clearTemporaryData(): void
    {
        delete_option('simplybook_temporary_onboarding_data');
    }
}

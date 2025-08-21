<?php namespace SimplyBook\Features\Onboarding;

use SimplyBook\App;
use SimplyBook\Http\ApiClient;
use SimplyBook\Helpers\Storage;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\LegacyHelper;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Builders\CompanyBuilder;

class OnboardingService
{
    use LegacyHelper;
    use LegacySave;
    use HasRestAccess;

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

        App::provide('client')->clearFailedAuthenticationFlag();

        $completedPreviously = get_option('simplybook_onboarding_completed', false);
        if ($completedPreviously) {
            return true;
        }

        return update_option('simplybook_onboarding_completed', true, false);
    }

    /**
     * This method should be called after a successful company registration.
     * In that case the data given should be based on the data returned in the
     * ApiResponseDTO from the successful {@see ApiClient::register_company()}
     */
    public function finishCompanyRegistration(array $data)
    {
        $responseDataStorage = new Storage($data);

        update_option("simplybook_company_registration_start_time", time(), false);
        update_option('simplybook_recaptcha_site_key', $responseDataStorage->getString('recaptcha_site_key'));
        update_option('simplybook_recaptcha_version', $responseDataStorage->getString('recaptcha_version'));
        $this->update_option('company_id', $responseDataStorage->getInt('company_id'), true);

        $this->setCompletedStep(2);
    }

    /**
     * Store given email address when the user agrees to the terms
     */
    public function storeEmailAddress(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request, $ajaxData);

        $adminAgreesToTerms = $storage->getBoolean('terms-and-conditions');
        $submittedEmailAddress = $storage->getEmail('email');

        $success = (is_email($submittedEmailAddress) && $adminAgreesToTerms);
        $message = ($success ? '' : esc_html__('Please enter a valid email address and accept the terms and conditions', 'simplybook'));

        if ($success) {
            $this->setTemporaryData([
                'email' => $submittedEmailAddress,
                'terms' => $adminAgreesToTerms,
            ]);
        }

        return $this->sendHttpResponse([], $success, $message, ($success ? 200 : 400));
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
     * Get the recaptcha site key from the general options
     */
    public function getRecaptchaSitekey(): \WP_REST_Response
    {
        return $this->sendHttpResponse([
            'site_key' => get_option('simplybook_recaptcha_site_key'),
        ]);
    }

    /**
     * Checks if the given page title is available based on the given url and
     * existing pages.
     */
    public function isPageTitleAvailableForURL(string $url): bool
    {
        $title = StringUtility::convertUrlToTitle($url);

        $posts = get_posts([
            'post_type' => 'page',
            'title' => sanitize_text_field($title),
            'post_status' => 'publish',
            'fields' => 'ids',
        ]);

        return empty($posts);
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
<?php namespace SimplyBook\Features\Onboarding;

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
    public function setOnboardingStep(int $step): void
    {
        update_option('simplybook_completed_step', $step, false);
    }

    /**
     * Set the onboarding as completed in the general options without autoload
     */
    public function setOnboardingCompleted(): void
    {
        $this->setOnboardingStep(5);
        update_option('simplybook_onboarding_completed', true, false);
    }

    /**
     * Store given email address when the user agrees to the terms
     */
    public function storeEmailAddress(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        sleep(1);

        $storage = $this->retrieveHttpStorage($request, $ajaxData, 'data');

        $adminAgreesToTerms = $storage->getBoolean('terms-and-conditions');
        $submittedEmailAddress = $storage->getEmail('email');

        $this->update_option('email', $submittedEmailAddress );
        $this->update_option('terms-and-conditions', $adminAgreesToTerms);

        $success = (is_email($submittedEmailAddress) && $adminAgreesToTerms);
        $message = ($success ? '' : esc_html__('Please enter a valid email address and accept the terms and conditions', 'simplybook'));

        return $this->sendHttpResponse([], $success, $message);
    }

    /**
     * Store the admin's choice for receiving tips and tricks
     */
    public function storeTipsAndTricksChoice(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request, $ajaxData, 'data');
        $adminWantsTipsAndTricks = $storage->getBoolean('tips-and-tricks');

        $this->update_option('tips-and-tricks', $adminWantsTipsAndTricks);

        return $this->sendHttpResponse();
    }

    /**
     * Store company data from the onboarding step in the options
     */
    public function storeCompanyData(CompanyBuilder $companyBuilder): void
    {
        foreach ($companyBuilder->toArray() as $key => $value) {
            $this->update_option($key, $value);
        }
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
}
<?php

namespace SimplyBook\Features\Onboarding;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasEncryption;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Builders\PageBuilder;
use SimplyBook\Support\Utility\StringUtility;
use SimplyBook\Support\Builders\CompanyBuilder;

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

    /**
     * Generate the booking page with the SimplyBook widget shortcode.
     * Uses a translatable slug so Dutch users get "kalender" instead of "calendar".
     * WordPress automatically handles slug uniqueness by appending -2, -3, etc.
     *
     * @return array{success: bool, page_id: int, page_url: string, message: string}
     */
    public function generateBookingPage(): array
    {
        $existingPageId = $this->getBookingPageId();
        if ($existingPageId > 0) {
            return [
                'success' => true,
                'page_id' => $existingPageId,
                'page_url' => get_permalink($existingPageId) ?: '',
                'message' => __('Booking page already exists.', 'simplybook'),
            ];
        }

        $slug = __('calendar', 'simplybook');
        $title = sprintf(
            /* translators: %1$s is the brand name "SimplyBook.me" (do not translate) */
            __('%1$s Booking page', 'simplybook'),
            'SimplyBook.me'
        );

        $pageId = (new PageBuilder())
            ->setTitle($title)
            ->setSlug($slug)
            ->setContent('[simplybook_widget]')
            ->insert();

        if ($pageId === -1) {
            return [
                'success' => false,
                'page_id' => -1,
                'page_url' => '',
                'message' => __('Failed to create booking page.', 'simplybook'),
            ];
        }

        $this->setBookingPageId($pageId);

        return [
            'success' => true,
            'page_id' => $pageId,
            'page_url' => get_permalink($pageId) ?: '',
            'message' => __('Booking page created successfully.', 'simplybook'),
        ];
    }

    /**
     * Store the generated booking page ID in options.
     */
    public function setBookingPageId(int $pageId): void
    {
        update_option('simplybook_booking_page_id', $pageId, false);
    }

    /**
     * Retrieve the stored booking page ID.
     */
    public function getBookingPageId(): int
    {
        return (int) get_option('simplybook_booking_page_id', 0);
    }

    /**
     * Get the booking page URL if it exists.
     */
    public function getBookingPageUrl(): string
    {
        $pageId = $this->getBookingPageId();
        if ($pageId <= 0) {
            return '';
        }

        $permalink = get_permalink($pageId);
        return $permalink !== false ? $permalink : '';
    }
}

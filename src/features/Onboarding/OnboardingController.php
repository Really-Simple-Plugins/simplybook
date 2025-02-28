<?php
namespace SimplyBook\Features\Onboarding;

use Simplybook_old\Api\Api;
use SimplyBook\Builders\PageBuilder;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Builders\CompanyBuilder;
use SimplyBook\Interfaces\FeatureInterface;

// todo - If we get more controllers like this, maybe move to a Http namespace?
// todo - maybe this is a Feature?
class OnboardingController implements FeatureInterface
{
    private OnboardingService $service;
    private Api $api;

    // todo - refactor legacy API (NL14RSP2-6)
    public function __construct(OnboardingService $service, Api $legacyApi)
    {
        $this->service = $service;
        $this->api = $legacyApi;
    }

    public function register()
    {
        add_filter('simplybook_rest_routes', [$this, 'addRoutes']);
    }

    /**
     * Store company data in the options and register the company at
     * SimplyBook.me
     */
    public function registerCompanyAtSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);

        echo '<pre>';
        var_dump($storage);
        exit();

        $companyBuilder = (new CompanyBuilder())->buildFromArray(
            $storage->all()
        );

        $this->service->storeCompanyData($companyBuilder);

        // Register it
        $response = $this->api->register_company();

        //store step, to start with on return of user.
        $step = ($response->success ? 3 : 1);
        $this->service->setOnboardingStep($step);

        return $this->service->sendHttpResponse( [], $response->success, $response->message );
    }

    /**
     * Confirm the email address with SimplyBook.me while providing the
     * confirmation code and the recaptcha token
     */
    public function confirmEmailWithSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);

        $response = $this->api->confirm_email($storage->getInt('confirmation-code'), $storage->getString('recaptchaToken'));

        $step = ($response->success ? 4 : 3);
        $this->service->setOnboardingStep($step);

        return $this->service->sendHttpResponse([], $response->success, $response->message);
    }

    /**
     * Check if the given page title is available based on the given url and
     * existing pages.
     */
    public function checkIfPageTitleIsAvailable(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);
        $pageTitleIsAvailable = $this->service->isPageTitleAvailableForURL($storage->getString('url'));

        return $this->service->sendHttpResponse([], $pageTitleIsAvailable);
    }

    /**
     * Generate default shortcode pages
     */
    public function generateDefaultPages($request, $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);

        $calendarPageName = StringUtility::convertUrlToTitle($storage->getUrl('calendarPageUrl'));
        $bookingPageName = StringUtility::convertUrlToTitle($storage->getUrl('bookingPageUrl'));

        $calendarPageID = (new PageBuilder())->setTitle($calendarPageName)
            ->setContent('[simplybook_widget]')
            ->insert();

        $bookingPageID = (new PageBuilder())->setTitle($bookingPageName)
            ->setContent('[simplybook_booking_button]')
            ->insert();

        $pagesCreatedSuccessfully = (($calendarPageID !== -1) && ($bookingPageID !== -1));

        return $this->service->sendHttpResponse([
            'calendar_page_id' => $calendarPageID,
            'booking_page_id' => $bookingPageID,
        ], $pagesCreatedSuccessfully);
    }

    /**
     * Add onboarding routes to the existing routes of our plugin
     */
    public function addRoutes(array $routes): array
    {
        $routes['onboarding/register_email'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'storeEmailAddress'],
        ];

        $routes['onboarding/tips_and_tricks'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'storeTipsAndTricksChoice'],
        ];

        $routes['onboarding/company_registration'] = [
            'methods' => 'POST',
            'callback' => [$this, 'registerCompanyAtSimplyBook'],
        ];

        $routes['onboarding/get_recaptcha_sitekey'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'getRecaptchaSitekey'],
        ];

        $routes['onboarding/confirm_email'] = [
            'methods' => 'POST',
            'callback' => [$this, 'confirmEmailWithSimplyBook'],
        ];

        $routes['onboarding/is_page_title_available'] = [
            'methods' => 'POST',
            'callback' => [$this, 'checkIfPageTitleIsAvailable'],
        ];

        $routes['onboarding/generate_pages'] = [
            'methods' => 'POST',
            'callback' => [$this, 'generateDefaultPages'],
        ];

        return $routes;
    }
}
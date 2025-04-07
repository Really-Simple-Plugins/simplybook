<?php
namespace SimplyBook\Features\Onboarding;

use SimplyBook\App;
use SimplyBook\Helpers\Storage;
use SimplyBook\Builders\PageBuilder;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Builders\CompanyBuilder;
use SimplyBook\Interfaces\FeatureInterface;
use SimplyBook\Exceptions\RestDataException;

class OnboardingController implements FeatureInterface
{
    private OnboardingService $service;

    public function __construct(OnboardingService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_filter('simplybook_rest_routes', [$this, 'addRoutes']);
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

        $routes['onboarding/tipstricks'] = [
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

        $routes['onboarding/auth'] = [
            'methods' => 'POST',
            'callback' => [$this, 'loginExistingUser'],
        ];

        $routes['onboarding/auth_two_fa'] = [
            'methods' => 'POST',
            'callback' => [$this, 'loginExistingUserTwoFa'],
        ];

        $routes['onboarding/auth_send_sms'] = [
            'methods' => 'POST',
            'callback' => [$this, 'sendSmsToUser'],
        ];

        return $routes;
    }

    /**
     * Store company data in the options and register the company at
     * SimplyBook.me
     */
    public function registerCompanyAtSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData, 'data');

        $companyBuilder = (new CompanyBuilder())->buildFromArray(
            $storage->all()
        );

        $this->service->storeCompanyData($companyBuilder);

        // Register it
        $response = App::provide('client')->register_company();

        //store step, to start with on return of user.
        $step = ($response->success ? 3 : 1);
        $this->service->setOnboardingStep($step);

        return $this->service->sendHttpResponse([], $response->success, $response->message);
    }

    /**
     * Confirm the email address with SimplyBook.me while providing the
     * confirmation code and the recaptcha token
     */
    public function confirmEmailWithSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData, 'data');

        $response = App::provide('client')->confirm_email($storage->getInt('confirmation-code'), $storage->getString('recaptchaToken'));

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
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData, 'data');
        $pageTitleIsAvailable = $this->service->isPageTitleAvailableForURL($storage->getString('url'));

        return $this->service->sendHttpResponse([], $pageTitleIsAvailable);
    }

    /**
     * Generate default shortcode pages
     */
    public function generateDefaultPages($request, $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData, 'data');

        $calendarPageName = StringUtility::convertUrlToTitle($storage->getUrl('calendarPageUrl'));
        $bookingPageName = StringUtility::convertUrlToTitle($storage->getUrl('bookingPageUrl'));

        $calendarPageID = (new PageBuilder())->setTitle($calendarPageName)
            ->setContent('[simplybook_widget]')
            ->insert();

        $bookingPageID = (new PageBuilder())->setTitle($bookingPageName)
            ->setContent('[simplybook_booking_button]')
            ->insert();

        $pagesCreatedSuccessfully = (($calendarPageID !== -1) && ($bookingPageID !== -1));

        if ($pagesCreatedSuccessfully) {
            $this->service->setOnboardingCompleted();
        }

        return $this->service->sendHttpResponse([
            'calendar_page_id' => $calendarPageID,
            'booking_page_id' => $bookingPageID,
        ], $pagesCreatedSuccessfully);
    }

    /**
     * Login an existing user with the given company login, user login and user
     * password. The onboarding is completed after this step, and we save the
     * company login in the options. We also store the current time as the
     * company registration start time.
     */
    public function loginExistingUser(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        $companyDomain = $storage->getString('company_domain');
        $companyLogin = $storage->getString('company_login');

        [$parsedDomain, $parsedLogin] = $this->service->parseCompanyDomainAndLogin($companyDomain, $companyLogin);

        $userLogin = $storage->getString('user_login');
        $userPassword = $storage->getString('user_password');

        try {
            $response = App::provide('client')->authenticateExistingUser($parsedDomain, $parsedLogin, $userLogin, $userPassword);
        } catch (RestDataException $e) {
            return new \WP_REST_Response([
                'message' => $e->getMessage(),
                'data' => $e->getData(),
            ], $e->getResponseCode());
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => $e->getMessage(),
            ], 400);
        }

        $this->finishLoggingInUser($response, $parsedDomain, $parsedLogin);

        return new \WP_REST_Response([
            'message' => 'Successfully authenticated user',
        ], 200);
    }

    /**
     * Method is the callback for the two-factor authentication route. It
     * authenticates the user with the given company login, domain, session id
     * and two-factor authentication code.
     */
    public function loginExistingUserTwoFa(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);
        $companyLogin = $storage->getString('company_login');
        $companyDomain = $storage->getString('domain');

        try {
            $response = App::provide('client')->processTwoFaAuthenticationRequest(
                $companyDomain,
                $companyLogin,
                $storage->getString('auth_session_id'),
                $storage->getString('two_fa_type'),
                $storage->getString('two_fa_code'),
            );
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => $e->getMessage(),
            ], 400);
        }

        $this->finishLoggingInUser($response, $companyDomain, $companyLogin);

        return new \WP_REST_Response([
            'message' => 'Successfully authenticated user',
        ], 200);
    }

    /**
     * Method is used to finish the logging in of the user. It is either called
     * after a direct login of the user ({@see loginExistingUser}) or after the
     * two-factor authentication ({@see loginExistingUserTwoFa}).
     *
     * @param array $response Should contain: token, refresh_token, company_id
     * @param string $parsedDomain Will be saved in the options as 'domain'
     * @param string $companyLogin Will be saved in the options as 'simplybook_company_login'
     */
    protected function finishLoggingInUser(array $response, string $parsedDomain, string $companyLogin): bool
    {
        $responseStorage = new Storage($response);

        App::provide('client')->setDuringOnboardingFlag(true)->saveAuthenticationData(
            $responseStorage->getString('token'),
            $responseStorage->getString('refresh_token'),
            $parsedDomain,
            $companyLogin,
            $responseStorage->getInt('company_id'),
        );

        $this->service->setOnboardingCompleted();

        return true;
    }

    /**
     * Method is used to send an SMS to the user for two-factor authentication.
     */
    public function sendSmsToUser(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        try {
            App::provide('client')->requestSmsForUser(
                $storage->getString('domain'),
                $storage->getString('company_login'),
                $storage->getString('auth_session_id'),
            );
        } catch (\Exception $e) {
            return new \WP_REST_Response([
                'message' => $e->getMessage(),
            ], 400);
        }

        return new \WP_REST_Response([
            'message' => 'Successfully requested SMS code',
        ], 200);
    }
}
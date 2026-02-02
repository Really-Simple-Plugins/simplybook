<?php

namespace SimplyBook\Features\Onboarding;

use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Traits\HasEncryption;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Services\BookingPageService;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\FeatureInterface;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Services\CallbackUrlService;
use SimplyBook\Services\WidgetTrackingService;
use SimplyBook\Services\ExtendifyDataService;
use SimplyBook\Support\Builders\CompanyBuilder;

class OnboardingController implements FeatureInterface
{
    use HasAllowlistControl;
    use HasEncryption;
    use HasLogging;

    private ApiClient $client;
    private OnboardingService $service;
    private WidgetTrackingService $widgetService;
    private CallbackUrlService $callbackUrlService;
    private ExtendifyDataService $extendifyDataService;
    private BookingPageService $bookingPageService;

    public function __construct(
        ApiClient $client,
        OnboardingService $service,
        WidgetTrackingService $widgetTrackingService,
        CallbackUrlService $callbackUrlService,
        ExtendifyDataService $extendifyDataService,
        BookingPageService $bookingPageService
    ) {
        $this->client = $client;
        $this->service = $service;
        $this->widgetService = $widgetTrackingService;
        $this->callbackUrlService = $callbackUrlService;
        $this->extendifyDataService = $extendifyDataService;
        $this->bookingPageService = $bookingPageService;
    }

    public function register(): void
    {
        // Check if the user has admin access permissions
        if (!$this->adminAccessAllowed()) {
            return;
        }

        add_filter('simplybook_rest_routes', [$this, 'addRoutes']);
    }

    /**
     * Add onboarding routes to the existing routes of our plugin
     */
    public function addRoutes(array $routes): array
    {
        $routes['onboarding/create_account'] = [
            'methods' => 'POST',
            'callback' => [$this, 'createAccount'],
        ];

        $routes['onboarding/save_widget_style'] = [
            'methods' => 'POST',
            'callback' => [$this, 'saveColorsToDesignSettings'],
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

        $routes['onboarding/finish_onboarding'] = [
            'methods' => 'POST',
            'callback' => [$this, 'finishOnboarding'],
        ];

        $routes['onboarding/retry_onboarding'] = [
            'methods' => 'POST',
            'callback' => [$this, 'retryOnboarding'],
        ];

        // Registration callback route - public endpoint called by SimplyBook.me
        // Only registered when a valid callback URL exists
        $callbackRoute = $this->callbackUrlService->getCallbackRouteWithToken();
        if (!empty($callbackRoute)) {
            $routes[$callbackRoute] = [
                'methods' => 'POST',
                'callback' => [$this, 'handleRegistrationCallback'],
                'permission_callback' => '__return_true',
            ];
        }

        return $routes;
    }

    /**
     * Create a new SimplyBook account. This endpoint handles:
     * 1. Validating email and terms acceptance
     * 2. Storing company data
     * 3. Triggering company registration at SimplyBook.me
     */
    public function createAccount(\WP_REST_Request $request): \WP_REST_Response
    {
        try {
            $storage = $this->service->retrieveHttpStorage($request);
            $captchaToken = $storage->getString('captcha_token');

            $company = $this->getNewCompanyObject(
                $storage->getEmail('email'),
                $storage->getBoolean('terms-and-conditions'),
                $storage->getBoolean('marketing-consent')
            );

            $response = $this->client->register_company($company, $captchaToken);
        } catch (ApiException $e) {
            $this->log('Account creation failed (API): ' . $e->getMessage());
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage(), 400);
        } catch (\Exception $e) {
            $this->log('Account creation failed: ' . $e->getMessage());
            return $this->service->sendHttpResponse([], false, __('An error occurred while creating your account. Please try again.', 'simplybook'), 500);
        }

        $this->service->finishCompanyRegistration();
        return $this->service->sendHttpResponse([], $response->success, $response->message, $response->code);
    }

    /**
     * This method builds a NEW {@see CompanyBuilder} object used for
     * registration. Under the hood it also stores the company data
     * in the options which can be used in {@see handleRegistrationCallback}.
     *
     * Method is compatible with extra data saved from Extendify integration.
     *
     * @throws ApiException if invalid email or terms not accepted
     */
    private function getNewCompanyObject(string $email, bool $termsAccepted, bool $marketingConsent): CompanyBuilder
    {
        if (!is_email($email)) {
            throw new ApiException(__('Please enter a valid email address.', 'simplybook'), 400);
        }

        if ($termsAccepted !== true) {
            throw new ApiException(__('Please accept the terms and conditions.', 'simplybook'), 400);
        }

        $encryptedPassword = $this->service->encryptString(wp_generate_password(24, false));

        $company = (new CompanyBuilder())->setEmail($email)
            ->setUserLogin($email)
            ->setTerms(true)
            ->setMarketingConsent($marketingConsent)
            ->setPassword($encryptedPassword);

        $category = $this->extendifyDataService->getCategory();
        if ($category !== null) {
            $company->setCategory($category);
        }

        $this->service->storeCompanyData($company);
        return $company;
    }

    /**
     * Collect saved widget style settings, format them as design settings and
     * pass them to the DesignSettingsController by calling the
     * simplybook_save_onboarding_widget_style action.
     */
    public function saveColorsToDesignSettings(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        /**
         * This action is used to save the widget style settings in the
         * simplybook_design_settings option.
         * @hooked SimplyBook\Features\DesignSettings\DesignSettingsController::saveWidgetStyle
         */
        try {
            do_action('simplybook_save_onboarding_widget_style', $storage);
        } catch (\Exception $e) {
            $message = __('Something went wrong while saving the widget style settings. Please try again.', 'simplybook');
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, $message, 500);
        }

        $message = __('Successfully saved widget style settings', 'simplybook');
        return $this->service->sendHttpResponse([], true, $message);
    }

    /**
     * Generate the booking page with the SimplyBook widget shortcode.
     * Uses a translatable slug and title. WordPress handles slug uniqueness.
     *
     * If page creation fails, this is NOT a blocker for onboarding.
     * The client should show PublishWidgetTask instead of BookingWidgetLiveTask.
     */
    public function generateDefaultPages(): \WP_REST_Response
    {
        $pageResult = $this->bookingPageService->generateBookingPage();

        return $this->service->sendHttpResponse([
            'page_id' => $pageResult['page_id'],
            'page_url' => $pageResult['page_url'],
        ], $pageResult['success'], $pageResult['message'], ($pageResult['success'] ? 200 : 500));
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

        if ($storage->isOneEmpty(['company_domain', 'company_login', 'user_login', 'user_password'])) {
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'), 400);
        }

        try {
            $response = $this->client->authenticateExistingUser($parsedDomain, $parsedLogin, $userLogin, $userPassword);
        } catch (RestDataException $e) {
            $exceptionData = $e->getData();

            // Data given was valid, so save it.
            if (isset($exceptionData['require2fa']) && $exceptionData['require2fa'] === true) {
                $this->saveLoginCompanyData($userLogin, $userPassword);
            }

            return $this->service->sendHttpResponse($exceptionData, false, $e->getMessage(), $e->getResponseCode());
        } catch (\Exception $e) {
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, __('Unknown error occurred, please verify your credentials.', 'simplybook'), 500);
        }

        $this->finishLoggingInUser($response, $parsedDomain, $parsedLogin);
        $this->saveLoginCompanyData($userLogin, $userPassword);

        return new \WP_REST_Response([
            'message' => __('Login successful.', 'simplybook'),
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

        if ($storage->isOneEmpty(['company_login', 'domain', 'auth_session_id', 'two_fa_type', 'two_fa_code'])) {
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'), 400);
        }

        try {
            $response = $this->client->processTwoFaAuthenticationRequest(
                $companyDomain,
                $companyLogin,
                $storage->getString('auth_session_id'),
                $storage->getString('two_fa_type'),
                $storage->getString('two_fa_code'),
            );
        } catch (RestDataException $e) {
            // Default code 200 because React side still used request() here
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage());
        } catch (\Exception $e) {
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, __('Unknown 2FA error occurred, please verify your credentials.', 'simplybook')); // Default code 200 because React side still used request() here
        }

        $this->finishLoggingInUser($response, $companyDomain, $companyLogin);

        return $this->service->sendHttpResponse([], true, __('Successfully authenticated user', 'simplybook')); // Default code 200 because React side still used request() here
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

        $this->client->setDuringOnboardingFlag(true)->saveAuthenticationData(
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
     * Method is used to save valid user login and password for existing users.
     * We already do this for users going through the onboarding in
     * {@see registerCompanyAtSimplyBook}. This method ensures that we can
     * re-authenticate an existing user when the connection to SimplyBook is
     * lost. To see this fallback look at {@see ApiClient::refresh_token} on
     * line 352.
     */
    protected function saveLoginCompanyData(string $userLogin, string $password): void
    {
        $companyBuilder = new CompanyBuilder();
        $companyBuilder->setUserLogin($userLogin)->setPassword(
            $this->service->encryptString($password)
        );

        $this->service->storeCompanyData($companyBuilder);
    }

    /**
     * Method is used to send an SMS to the user for two-factor authentication.
     */
    public function sendSmsToUser(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        try {
            $this->client->requestSmsForUser(
                $storage->getString('domain'),
                $storage->getString('company_login'),
                $storage->getString('auth_session_id'),
            );
        } catch (\Exception $e) {
            return $this->service->sendHttpResponse([], false, $e->getMessage()); // Default code 200 because React side still used request() here
        }

        return $this->service->sendHttpResponse([], true, __('Successfully requested SMS code', 'simplybook')); // Default code 200 because React side still used request() here
    }

    /**
     * Method is used to finish the onboarding process. It is called when the
     * user has completed the onboarding process and wants to finish it.
     *
     * @param \WP_REST_Request $request Contains enitre onboarding data
     */
    public function finishOnboarding(\WP_REST_Request $request): \WP_REST_Response
    {
        $code = 200;
        $message = __('Successfully finished onboarding!', 'simplybook');

        $success = $this->service->setOnboardingCompleted();
        if (!$success) {
            $message = __('An error occurred while finishing the onboarding process', 'simplybook');
            $code = 400;
        }

        return $this->service->sendHttpResponse([], $success, $message, $code);
    }

    /**
     * Method is used to retry the onboarding process. It is called when the
     * user has completed the onboarding process and wants to retry it.
     */
    public function retryOnboarding(\WP_REST_Request $request): \WP_REST_Response
    {
        $success = $this->service->delete_all_options();
        $message = __('Successfully removed all previous data.', 'simplybook');

        if (!$success) {
            $message = __('An error occurred while trying to remove previous data.', 'simplybook');
        }

        return $this->service->sendHttpResponse([], $success, $message, ($success ? 200 : 500));
    }

    /**
     * Handles the callback from SimplyBook.me after company registration.
     * The callback contains success status and company_id.
     * We authenticate using the stored credentials and save the tokens.
     */
    public function handleRegistrationCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        // Handle registration failure from SimplyBook
        if ($storage->getBoolean('success') === false) {
            return $this->handleCallbackFailure($storage->getString('error.message'));
        }

        // Get stored company data for authentication
        $company = $this->service->getCompanyData();
        $companyLogin = $this->client->get_company_login(false);
        $companyDomain = $this->client->get_domain();

        // Validate required data exists
        if (empty($companyLogin) || ($company->isValid() === false)) {
            $this->log('Missing company data for post-registration authentication');
            return $this->handleCallbackFailure(__('Company data not found. Please restart registration.', 'simplybook'));
        }

        try {
            // Authenticate using stored credentials
            $authResponse = $this->client->authenticateExistingUser(
                $companyDomain,
                $companyLogin,
                $company->email,
                $this->decryptString($company->password)
            );
        } catch (\Exception $e) {
            $this->log('Authentication after registration failed: ' . $e->getMessage());
            return $this->handleCallbackFailure($e->getMessage());
        }

        // Save authentication data using the centralized method
        $this->client->setDuringOnboardingFlag(true)->saveAuthenticationData(
            $authResponse['token'],
            $authResponse['refresh_token'],
            $authResponse['domain'],
            $companyLogin,
            $storage->getInt('company_id')
        );

        // Clear any previous failure state and mark step 1 as completed
        delete_option('simplybook_registration_failed');
        $this->callbackUrlService->cleanupCallbackUrl();

        // Because this callback is sent after registration, we set step 1 as
        // completed. On the frontend step 2 was already rendered, this is
        // the step we wait for this callback to complete.
        $this->service->setCompletedStep(1);

        /**
         * Action: simplybook_after_company_registered
         * @hooked SimplyBook\Controllers\ServicesController::setInitialServiceName
         */
        do_action('simplybook_after_company_registered', $authResponse['domain'], $storage->getInt('company_id'));

        return new \WP_REST_Response([
            'message' => __('Successfully registered company.', 'simplybook'),
        ]);
    }

    /**
     * Handle registration callback failure by logging and setting the failure flag.
     */
    private function handleCallbackFailure(string $errorMessage = ''): \WP_REST_Response
    {
        if (empty($errorMessage)) {
            $errorMessage = __('An error occurred during the registration process', 'simplybook');
        }

        $this->log('Registration callback failed: ' . $errorMessage);
        update_option('simplybook_registration_failed', true, false);

        return new \WP_REST_Response([
            'error' => $errorMessage,
        ], 400);
    }
}

<?php
namespace SimplyBook\Features\Onboarding;

use SimplyBook\App;
use SimplyBook\Http\ApiClient;
use SimplyBook\Helpers\Storage;
use SimplyBook\Builders\PageBuilder;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Builders\CompanyBuilder;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Interfaces\FeatureInterface;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Services\WidgetTrackingService;

class OnboardingController implements FeatureInterface
{
    private OnboardingService $service;
    private WidgetTrackingService $widgetService;

    public function __construct(OnboardingService $service, WidgetTrackingService $widgetTrackingService)
    {
        $this->service = $service;
        $this->widgetService = $widgetTrackingService;
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

        $routes['onboarding/company_registration'] = [
            'methods' => 'POST',
            'callback' => [$this, 'registerCompanyAtSimplyBook'],
        ];

        $routes['onboarding/get_recaptcha_sitekey'] = [
            'methods' => 'GET',
            'callback' => [$this->service, 'getRecaptchaSitekey'],
        ];

        $routes['onboarding/confirm_email'] = [
            'methods' => 'POST',
            'callback' => [$this, 'confirmEmailWithSimplyBook'],
        ];

        $routes['onboarding/save_widget_style'] = [
            'methods' => 'POST',
            'callback' => [$this, 'saveColorsToDesignSettings'],
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

        $routes['onboarding/finish_onboarding'] = [
            'methods' => 'POST',
            'callback' => [$this, 'finishOnboarding'],
        ];

        $routes['onboarding/retry_onboarding'] = [
            'methods' => 'POST',
            'callback' => [$this, 'retryOnboarding'],
        ];

        return $routes;
    }

    /**
     * Store company data in the options and register the company at
     * SimplyBook.me
     */
    public function registerCompanyAtSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);

        $companyBuilder = (new CompanyBuilder())->buildFromArray(
            $storage->all()
        );

        $tempDataStorage = $this->service->getTemporaryDataStorage();
        $tempEmail = $tempDataStorage->getString('email', get_option('admin_email'));
        $tempTerms = $tempDataStorage->getBoolean('terms', true);

        $companyBuilder->setEmail($tempEmail);
        $companyBuilder->setUserLogin($tempEmail);
        $companyBuilder->setTerms($tempTerms);

        $companyBuilder->setPassword(
            $this->service->encrypt_string(
                wp_generate_password(24, false)
            )
        );

        $this->service->storeCompanyData($companyBuilder);

        if ($companyBuilder->isValid() === false) {
            return $this->service->sendHttpResponse([
                'invalid_fields' => $companyBuilder->getInvalidFields(),
            ], false, esc_html__('Please fill in all fields.', 'simplybook'), 400);
        }

        try {
            $response = App::provide('client')->register_company();
        } catch (ApiException $e) {
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage());
        }

        $this->service->finishCompanyRegistration($response->data);
        return $this->service->sendHttpResponse([], $response->success, $response->message, ($response->success ? 200 : 400));
    }

    /**
     * Confirm the email address with SimplyBook.me while providing the
     * confirmation code and the recaptcha token
     */
    public function confirmEmailWithSimplyBook(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $error = '';
        $storage = $this->service->retrieveHttpStorage($request, $ajaxData);

        if ($storage->isEmpty('recaptchaToken')) {
            // wp_kses_post to allow apostrophe in the message
            $error = wp_kses_post(__('Please verify you\'re not a robot.', 'simplybook'));
        }

        if ($storage->isEmpty('confirmation-code')) {
            $error = esc_html__('Please enter the confirmation code.', 'simplybook');
        }

        if (!empty($error)) {
            return $this->service->sendHttpResponse([], false, $error);
        }

        try {
            $response = App::provide('client')->confirm_email(
                $storage->getInt('confirmation-code'),
                $storage->getString('recaptchaToken')
            );
        } catch (ApiException $e) {
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage(), 400);
        }

        $this->service->setCompletedStep(3);
        return $this->service->sendHttpResponse([], $response->success, $response->message, ($response->success ? 200 : 400));
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
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, esc_html__(
                'Something went wrong while saving the widget style settings. Please try again.', 'simplybook'
            ), 400);
        }

        return $this->service->sendHttpResponse([], true, esc_html__(
            'Successfully saved widget style settings', 'simplybook'
        ));
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

        $calendarPageIsAvailable = $this->service->isPageTitleAvailableForURL($storage->getString('calendarPageUrl'));
        if (!$calendarPageIsAvailable) {
            return $this->service->sendHttpResponse([], false, esc_html__(
                'Calendar page title should be available if you choose to generate this page.', 'simplybook'
            ), 503);
        }

        $calendarPageName = StringUtility::convertUrlToTitle($storage->getUrl('calendarPageUrl'));

        $calendarPageID = (new PageBuilder())->setTitle($calendarPageName)
            ->setContent('[simplybook_widget]')
            ->insert();

        $pageCreatedSuccessfully = ($calendarPageID !== -1);

        // These flags are deleted after its one time use in the Task and Notice
        if ($pageCreatedSuccessfully) {
            $this->widgetService->setPublishWidgetCompleted();
        }

        $this->service->setOnboardingCompleted();

        return $this->service->sendHttpResponse([
            'calendar_page_id' => $calendarPageID,
        ], $pageCreatedSuccessfully, '', ($pageCreatedSuccessfully ? 200 : 400));
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
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'));
        }

        try {
            $response = App::provide('client')->authenticateExistingUser($parsedDomain, $parsedLogin, $userLogin, $userPassword);
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
            ], false, esc_html__('Unknown error occurred, please verify your credentials.', 'simplybook'), 500);
        }

        $this->finishLoggingInUser($response, $parsedDomain, $parsedLogin);
        $this->saveLoginCompanyData($userLogin, $userPassword);

        return new \WP_REST_Response([
            'message' => esc_html__('Login successful.', 'simplybook'),
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
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'));
        }

        try {
            $response = App::provide('client')->processTwoFaAuthenticationRequest(
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
            ], false, esc_html__('Unknown 2FA error occurred, please verify your credentials.', 'simplybook')); // Default code 200 because React side still used request() here
        }

        $this->finishLoggingInUser($response, $companyDomain, $companyLogin);

        return $this->service->sendHttpResponse([], true, esc_html__('Successfully authenticated user', 'simplybook')); // Default code 200 because React side still used request() here
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

        $this->validatePublishedWidget();
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
    protected function saveLoginCompanyData(string $userLogin, string $password)
    {
        $companyBuilder = new CompanyBuilder();
        $companyBuilder->setUserLogin($userLogin)->setPassword(
            $this->service->encrypt_string($password)
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
            App::provide('client')->requestSmsForUser(
                $storage->getString('domain'),
                $storage->getString('company_login'),
                $storage->getString('auth_session_id'),
            );
        } catch (\Exception $e) {
            return $this->service->sendHttpResponse([], false, $e->getMessage()); // Default code 200 because React side still used request() here
        }

        return $this->service->sendHttpResponse([], true, esc_html__('Successfully requested SMS code', 'simplybook')); // Default code 200 because React side still used request() here
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
        $message = esc_html__('Successfully finished onboarding!', 'simplybook');

        $success = $this->service->setOnboardingCompleted();
        if (!$success) {
            $message = esc_html__('An error occurred while finishing the onboarding process', 'simplybook');
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
        $message = esc_html__('Successfully removed all previous data.', 'simplybook');

        if (!$success) {
            $message = esc_html__('An error occurred while trying to remove previous data.', 'simplybook');
        }

        return $this->service->sendHttpResponse([], $success, $message);
    }

    /**
     * Method is used to set a notification/task flag to true when it determines
     * that there is a published post with the SimplyBook.me widget shortcode
     * or the Gutenberg block.
     */
	public function validatePublishedWidget(): void {
		$cache = wp_cache_get( 'simplybook_widget_published', 'simplybook' );
		if ( $cache === true ) {
			$this->widgetService->setPublishWidgetCompleted();

			return;
		}

		// Check if any widgets are currently published
		if ( $this->widgetService->hasTrackedPosts() ) {
			$this->widgetService->setPublishWidgetCompleted();
			wp_cache_set( 'simplybook_widget_published', true, 'simplybook' );
		}
	}
}
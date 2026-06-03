<?php

namespace SimplyBook\Features\Onboarding\Endpoints;

use Exception;
use WP_REST_Request;
use WP_REST_Response;
use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasEncryption;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\CallbackUrlService;
use SimplyBook\Interfaces\SingleEndpointInterface;
use SimplyBook\Features\Onboarding\OnboardingService;

class CallbackEndpoint implements SingleEndpointInterface
{
    use HasLogging;
    use HasEncryption;
    use HasRestAccess;
    use HasAllowlistControl;

    private string $route;
    private ApiClient $client;
    private OnboardingService $service;
    private CallbackUrlService $callback;

    public function __construct(ApiClient $client, OnboardingService $service, CallbackUrlService $callback)
    {
        $this->client = $client;
        $this->service = $service;
        $this->callback = $callback;
        $this->route = $callback->getCallbackRouteWithToken();
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed() && !empty($this->route);
    }

    /**
     * @inheritDoc
     */
    public function registerRoute(): string
    {
        return $this->route;
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'handleRegistrationCallback'],
            'permission_callback' => '__return_true',
        ];
    }

    /**
     * Handles the callback from SimplyBook.me after company registration.
     * The callback contains success status and company_id.
     * We authenticate using the stored credentials and save the tokens.
     */
    public function handleRegistrationCallback(WP_REST_Request $request): WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        // Handle registration failure from SimplyBook
        if ($storage->getBoolean('success') === false) {
            return $this->handleCallbackFailure($storage->getString('error.message'), 406);
        }

        // Get stored company data for authentication
        $company = $this->service->getCompanyData();
        $companyLogin = $this->client->get_company_login(false);
        $companyDomain = $this->client->get_domain();

        // Validate required data exists
        if (empty($companyLogin) || ($company->isValid() === false)) {
            $this->log('Missing company data for post-registration authentication');
            return $this->handleCallbackFailure(__('Company data not found. Please restart registration.', 'simplybook'), 400);
        }

        try {
            // Authenticate using stored credentials
            $authResponse = $this->client->authenticateExistingUser(
                $companyDomain,
                $companyLogin,
                $company->email,
                $this->decryptString($company->password)
            );
        } catch (Exception $e) {
            $this->log('Authentication after registration failed: ' . $e->getMessage());
            return $this->handleCallbackFailure($e->getMessage(), 401);
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
        $this->callback->cleanupCallbackUrl();

        // Because this callback is sent after registration, we set step 1 as
        // completed. On the frontend step 2 was already rendered, this is
        // the step we wait for this callback to complete.
        $this->service->setCompletedStep(1);

        /**
         * Action: simplybook_after_company_registered
         * @hooked SimplyBook\Controllers\ServicesController::setInitialServiceName
         */
        do_action('simplybook_after_company_registered', $authResponse['domain'], $storage->getInt('company_id'));

        return new WP_REST_Response([
            'message' => __('Successfully registered company.', 'simplybook'),
        ]);
    }

    /**
     * Handle registration callback failure by logging and setting the failure flag.
     */
    private function handleCallbackFailure(string $errorMessage = '', int $code = 500): WP_REST_Response
    {
        if (empty($errorMessage)) {
            $errorMessage = __('An error occurred during the registration process', 'simplybook');
        }

        $this->log('Registration callback failed: ' . $errorMessage);
        update_option('simplybook_registration_failed', true, false);

        return new WP_REST_Response([
            'error' => $errorMessage,
        ], $code);
    }
}

<?php

namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\CallbackUrlService;
use SimplyBook\Features\Onboarding\OnboardingService;
use SimplyBook\Support\Builders\CompanyBuilder;
use SimplyBook\Interfaces\SingleEndpointInterface;

class CompanyRegistrationEndpoint implements SingleEndpointInterface
{
    use LegacySave;
    use HasRestAccess;
    use HasAllowlistControl;
    use HasLogging;

    public const ROUTE = 'company_registration';

    protected CallbackUrlService $callbackUrlService;
    protected OnboardingService $onboardingService;

    public function __construct(
        CallbackUrlService $callbackUrlService,
        OnboardingService $onboardingService
    ) {
        $this->callbackUrlService = $callbackUrlService;
        $this->onboardingService = $onboardingService;
    }

    /**
     * This endpoint is disabled when the temporary callback URL is not (yet)
     * set or is expired.
     */
    public function enabled(): bool
    {
        $callbackUrl = $this->callbackUrlService->getCallbackUrl();
        return !empty($callbackUrl) && $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoute(): string
    {
        return self::ROUTE . '/' . $this->callbackUrlService->getCallbackUrl();
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'callback'],
            'permission_callback' => '__return_true',
        ];
    }

    /**
     * This callback runs via the POST request from SimplyBook.me after company registration.
     * With the simplified flow, the callback only contains success status and company_id.
     * We then authenticate using the stored credentials to get the tokens.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        if ($storage->getBoolean('success') === false) {
            $errorMessage = 'An error occurred during the registration process';
            if ($storage->isNotEmpty('error.message')) {
                $errorMessage = $storage->getString('error.message');
                $this->log($storage->getString('error.message'));
            }
            // Set failure state for frontend polling
            update_option('simplybook_registration_failed', true, false);
            return new \WP_REST_Response([
                'error' => $errorMessage,
            ], 400);
        }

        // Get stored company data for authentication
        $companyData = get_option('simplybook_company_data', []);
        $companyBuilder = (new CompanyBuilder())->buildFromArray($companyData);
        $companyLogin = get_option('simplybook_company_login');
        $domain = $this->get_domain();

        // Validate required data exists
        if (empty($companyData) || empty($companyLogin) || empty($companyBuilder->email)) {
            $this->log('Missing company data for post-registration authentication');
            update_option('simplybook_registration_failed', true, false);
            return new \WP_REST_Response([
                'error' => 'Company data not found. Please restart registration.',
            ], 400);
        }

        try {
            $authResponse = $this->onboardingService->authenticateAfterRegistration(
                $domain,
                $companyLogin,
                $companyBuilder->email,
                $companyBuilder->password
            );
        } catch (\Exception $e) {
            $this->log('Authentication after registration failed: ' . $e->getMessage());
            // Set failure state for frontend polling
            update_option('simplybook_registration_failed', true, false);
            return new \WP_REST_Response([
                'error' => $e->getMessage(),
            ], 400);
        }

        // Store tokens from auth response
        $this->updateToken($authResponse['token'], 'admin');
        $this->updateToken($authResponse['refresh_token'], 'admin', true);

        update_option('simplybook_refresh_company_token_expiration', time() + 3600);
        $this->update_option('domain', $authResponse['domain'], true);
        $this->update_option('company_id', $storage->getInt('company_id'), true);

        // Clear any previous failure state
        delete_option('simplybook_registration_failed');

        // Mark step 1 as completed only after successful authentication
        $this->onboardingService->setCompletedStep(1);

        $this->callbackUrlService->cleanupCallbackUrl();

        /**
         * Action: simplybook_after_company_registered
         * @hooked SimplyBook\Controllers\ServicesController::setInitialServiceName
         */
        do_action('simplybook_after_company_registered', $authResponse['domain'], $storage->getInt('company_id'));

        return new \WP_REST_Response([
            'message' => 'Successfully registered company for current WordPress website.',
        ]);
    }
}

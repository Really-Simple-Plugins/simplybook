<?php

namespace SimplyBook\Features\Onboarding\Endpoints;

use Exception;
use WP_REST_Request;
use WP_REST_Response;
use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Support\Builders\CompanyBuilder;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Features\Onboarding\OnboardingService;

class AuthenticationEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private ApiClient $client;
    private OnboardingService $service;

    public function __construct(ApiClient $client, OnboardingService $service)
    {
        $this->client = $client;
        $this->service = $service;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            'onboarding/auth' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'loginExistingUser'],
            ],
            'onboarding/auth_two_fa' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'loginExistingUserTwoFa'],
            ],
            'onboarding/auth_send_sms' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'sendSmsToUser'],
            ]
        ];
    }

    /**
     * Login an existing user with the given company login, user login and user
     * password. The onboarding is completed after this step, and we save the
     * company login in the options. We also store the current time as the
     * company registration start time.
     */
    public function loginExistingUser(WP_REST_Request $request): WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        $companyDomain = $storage->getString('company_domain');
        $companyLogin = $storage->getString('company_login');

        [$parsedDomain, $parsedLogin] = $this->service->parseCompanyDomainAndLogin($companyDomain, $companyLogin);

        $userLogin = $storage->getString('user_login');
        $userPassword = $storage->getString('user_password');

        if ($storage->isOneEmpty(['company_domain', 'company_login', 'user_login', 'user_password'])) {
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'), 422);
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
        } catch (Exception $e) {
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, __('Unknown error occurred, please verify your credentials.', 'simplybook'), 500);
        }

        $this->finishLoggingInUser($response, $parsedDomain, $parsedLogin);
        $this->saveLoginCompanyData($userLogin, $userPassword);

        return new WP_REST_Response([
            'message' => __('Login successful.', 'simplybook'),
        ], 200);
    }

    /**
     * Method is the callback for the two-factor authentication route. It
     * authenticates the user with the given company login, domain, session id
     * and two-factor authentication code.
     */
    public function loginExistingUserTwoFa(WP_REST_Request $request): WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);
        $companyLogin = $storage->getString('company_login');
        $companyDomain = $storage->getString('domain');

        if ($storage->isOneEmpty(['company_login', 'domain', 'auth_session_id', 'two_fa_type', 'two_fa_code'])) {
            return $this->service->sendHttpResponse([], false, esc_html__('Please fill in all fields.', 'simplybook'), 422);
        }

        try {
            $response = $this->client->processTwoFaAuthenticationRequest(
                $companyDomain,
                $companyLogin,
                $storage->getString('auth_session_id'),
                $storage->getString('two_fa_type'),
                $storage->getString('two_fa_code')
            );
        } catch (RestDataException $e) {
            // Default code 200 because React side still used request() here
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage());
        } catch (Exception $e) {
            return $this->service->sendHttpResponse([
                'message' => $e->getMessage(),
            ], false, __('Unknown 2FA error occurred, please verify your credentials.', 'simplybook')); // Default code 200 because React side still used request() here
        }

        $this->finishLoggingInUser($response, $companyDomain, $companyLogin);

        return $this->service->sendHttpResponse([], true, __('Successfully authenticated user', 'simplybook')); // Default code 200 because React side still used request() here
    }

    /**
     * Method is used to send an SMS to the user for two-factor authentication.
     */
    public function sendSmsToUser(WP_REST_Request $request): WP_REST_Response
    {
        $storage = $this->service->retrieveHttpStorage($request);

        try {
            $this->client->requestSmsForUser(
                $storage->getString('domain'),
                $storage->getString('company_login'),
                $storage->getString('auth_session_id')
            );
        } catch (Exception $e) {
            return $this->service->sendHttpResponse([], false, $e->getMessage()); // Default code 200 because React side still used request() here
        }

        return $this->service->sendHttpResponse([], true, __('Successfully requested SMS code', 'simplybook')); // Default code 200 because React side still used request() here
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
            $responseStorage->getInt('company_id')
        );

        $this->service->setOnboardingCompleted();

        return true;
    }
}

<?php

namespace SimplyBook\Features\Onboarding\Endpoints;

use Exception;
use WP_REST_Request;
use WP_REST_Response;
use SimplyBook\Http\ApiClient;
use SimplyBook\Traits\HasLogging;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\ExtendifyDataService;
use SimplyBook\Support\Builders\CompanyBuilder;
use SimplyBook\Interfaces\SingleEndpointInterface;
use SimplyBook\Features\Onboarding\OnboardingService;

class CreateAccountEndpoint implements SingleEndpointInterface
{
    use HasLogging;
    use HasRestAccess;
    use HasAllowlistControl;

    private ApiClient $client;
    private OnboardingService $service;
    private ExtendifyDataService $extendify;

    public function __construct(ApiClient $client, OnboardingService $service, ExtendifyDataService $extendify)
    {
        $this->client = $client;
        $this->service = $service;
        $this->extendify = $extendify;
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
    public function registerRoute(): string
    {
        return 'onboarding/create_account';
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'createAccount'],
        ];
    }

    /**
     * Create a new SimplyBook account. This endpoint handles:
     * 1. Validating email and terms acceptance
     * 2. Storing company data
     * 3. Triggering company registration at SimplyBook.me
     */
    public function createAccount(WP_REST_Request $request): WP_REST_Response
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
            return $this->service->sendHttpResponse($e->getData(), false, $e->getMessage(), $e->getResponseCode());
        } catch (Exception $e) {
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
            throw (new ApiException(__('Please enter a valid email address.', 'simplybook')))->setResponseCode(422);
        }

        if ($termsAccepted !== true) {
            throw (new ApiException(__('Please accept the terms and conditions.', 'simplybook')))->setResponseCode(422);
        }

        $encryptedPassword = $this->service->encryptString(wp_generate_password(24, false));

        $company = (new CompanyBuilder())->setEmail($email)
            ->setUserLogin($email)
            ->setTerms(true)
            ->setMarketingConsent($marketingConsent)
            ->setPassword($encryptedPassword);

        $category = $this->extendify->getCategory();
        if ($category !== null) {
            $company->setCategory($category);
        }

        $this->service->storeCompanyData($company);
        return $company;
    }
}

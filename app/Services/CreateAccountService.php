<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasLogging;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class CreateAccountService
{
    use HasLogging;

    private const AL_BASE_URL_PRODUCTION = 'https://simplybook.auth.really-simple-security.com';
    private const AL_BASE_URL_DEVELOPMENT = 'https://simplybook.auth.really-simple-sandbox.com';
    private const SIMPLYBOOK_API_VERSION = 'v2';
    private const INSTALLATION_ID_OPTION = 'simplybook_al_installation_id';
    private const PLUGIN_NAME = 'SimplyBook';

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Get the base URL based on the {@see SIMPLYBOOK_ENV} constant.
     */
    private function getBaseUrl(): string
    {
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';
        return $env === 'development' ? self::AL_BASE_URL_DEVELOPMENT : self::AL_BASE_URL_PRODUCTION;
    }

    /**
     * Make a request.
     * @throws ApiException
     */
    private function request(string $method, string $endpoint, array $body, string $token, string $companyLogin): array
    {
        if (empty($token) || empty($companyLogin)) {
            throw new ApiException(__('Invalid credentials.', 'simplybook'));
        }

        $endpoint = preg_replace('/[^a-zA-Z0-9\/_-]/', '', $endpoint);
        $url = $this->buildUrl($endpoint);

        $rspalHeaders = $this->getRspalHeaders();
        $headers = array_merge($rspalHeaders, [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-Token' => $token,
            'X-Company-Login' => $companyLogin,
        ]);

        $args = [
            'method' => $method,
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
        ];

        if (!empty($body)) {
            $args['body'] = json_encode($body);
        }

        $response = wp_remote_request($url, $args);

        if (is_wp_error($response)) {
            throw (new ApiException(
                __('Failed to connect.', 'simplybook')
            ))->setData([
                'error' => sanitize_text_field($response->get_error_message()),
            ]);
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if (!is_array($responseBody)) {
            throw new ApiException(__('Invalid response.', 'simplybook'));
        }

        if (isset($responseBody['rspal-error'])) {
            throw (new ApiException(
                __('Error', 'simplybook')
            ))->setData([
                'error' => sanitize_text_field($responseBody['rspal-error']),
            ]);
        }

        return [
            'code' => (int) $responseCode,
            'body' => $responseBody,
        ];
    }

    /**
     * Request a public token
     * @throws ApiException
     */
    public function requestPublicToken(): array
    {
        $url = $this->buildUrl('simplybook/auth/token');

        $headers = array_merge($this->getRspalHeaders(), [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ]);

        $response = wp_remote_post($url, [
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode([]),
        ]);

        if (is_wp_error($response)) {
            throw (new ApiException(
                __('Failed to connect.', 'simplybook')
            ))->setData([
                'error' => sanitize_text_field($response->get_error_message()),
            ]);
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if (!is_array($responseBody)) {
            throw new ApiException(__('Invalid response.', 'simplybook'));
        }

        if (isset($responseBody['rspal-error'])) {
            throw (new ApiException(
                __('Error', 'simplybook')
            ))->setData([
                'error' => sanitize_text_field($responseBody['rspal-error']),
            ]);
        }

        return [
            'code' => (int) $responseCode,
            'body' => $responseBody,
        ];
    }

    /**
     * Register a new company.
     * @throws ApiException
     */
    public function registerCompany(
        string $companyLogin,
        string $email,
        string $companyName,
        string $description,
        string $phone,
        string $city,
        string $address,
        string $zip,
        float $lat,
        float $lng,
        string $timezone,
        string $countryId,
        string $password,
        string $category,
        string $locale,
        string $callbackUrl,
        string $referrer,
        string $token
    ): array {
        $requestBody = [
            'company_login' => $companyLogin,
            'email' => $email,
            'name' => $companyName,
            'description' => $description,
            'phone' => $phone,
            'city' => $city,
            'address1' => $address,
            'zip' => $zip,
            'lat' => (string) $lat,
            'lng' => (string) $lng,
            'timezone' => $timezone,
            'country_id' => $countryId,
            'password' => $password,
            'retype_password' => $password,
            'categories' => [$category],
            'lang' => $locale,
            'marketing_consent' => false,
            'journey_type' => 'skip_welcome_tour',
            'callback_url' => $callbackUrl,
            'ref' => $referrer,
        ];

        return $this->request('POST', 'simplybook/company', $requestBody, $token, $companyLogin);
    }

    /**
     * Confirm company registration with email code.
     * @throws ApiException
     */
    public function confirmEmail(
        string $companyLogin,
        string $confirmationCode,
        string $recaptchaToken,
        string $token
    ): array {
        return $this->request('POST', 'simplybook/company/confirm', [
            'company_login' => $companyLogin,
            'confirmation_code' => $confirmationCode,
            'recaptcha' => $recaptchaToken,
        ], $token, $companyLogin);
    }

    /**
     * Get or create the Installation ID
     */
    private function getInstallationId(): string
    {
        $installationId = get_option(self::INSTALLATION_ID_OPTION, '');

        if (!empty($installationId)) {
            return $installationId;
        }

        try {
            $installationId = $this->createInstallationId();
        } catch (ApiException $e) {
            $this->log('Failed to create installation ID: ' . sanitize_text_field($e->getMessage()));
        }

        return $installationId;
    }

    /**
     * Request the creation of a new installation ID
     * @throws ApiException
     */
    private function createInstallationId(): string
    {
        $response = wp_remote_post($this->getBaseUrl() . '/installation/create', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode([]),
        ]);

        if (is_wp_error($response)) {
            throw new ApiException($response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if ($responseCode !== 200 && $responseCode !== 201) {
            throw new ApiException('Invalid response code: ' . $responseCode);
        }

        $installationId = isset($responseBody['uuid']) ? sanitize_text_field($responseBody['uuid']) : '';
        if (empty($installationId)) {
            throw new ApiException('Installation ID not found in response.');
        }

        update_option(self::INSTALLATION_ID_OPTION, $installationId, false);
        return $installationId;
    }

    /**
     * Build the URL.
     */
    private function buildUrl(string $endpoint): string
    {
        return $this->getBaseUrl() . '/' . self::SIMPLYBOOK_API_VERSION . '/' . ltrim($endpoint, '/');
    }

    /**
     * Build the headers
     */
    private function getRspalHeaders(): array
    {
        $headers = [
            'RSPAL-PluginName' => self::PLUGIN_NAME,
            'RSPAL-PluginVersion' => $this->env->getString('plugin.version'),
            'RSPAL-PluginPath' => $this->getPluginRelativePath(),
            'RSPAL-Origin' => trailingslashit(site_url()),
            'RSPAL-InstallationId' => $this->getInstallationId(),
        ];

        $headers['RSPAL-Signature'] = hash_hmac(
            'sha256',
            json_encode($headers),
            $headers['RSPAL-InstallationId']
        );

        return $headers;
    }

    /**
     * Get the plugin path relative to the WordPress root directory.
     */
    private function getPluginRelativePath(): string
    {
        $pluginFullPath = wp_normalize_path(realpath($this->env->getString('plugin.path')));
        $wpRoot = wp_normalize_path(realpath(ABSPATH));

        return str_replace($wpRoot, '', $pluginFullPath);
    }
}

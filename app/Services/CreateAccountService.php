<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasLogging;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class CreateAccountService
{
    use HasLogging;

    private const SIMPLYBOOK_API_VERSION = 'v2';
    private const INSTALLATION_ID_OPTION = '_simplybook_installation_id';

    // API Endpoints
    private const ENDPOINT_COMPANY = 'simplybook/company';

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Register a new company.
     *
     * @param string $captchaToken reCAPTCHA Enterprise token (not score).
     * @throws ApiException
     */
    public function registerCompany(
        string $companyLogin,
        string $email,
        string $password,
        bool $marketingConsent,
        string $callbackUrl,
        string $captchaToken = '',
        ?int $category = null
    ): array {
        // Sanitize inputs
        $sanitizedCompanyLogin = sanitize_text_field($companyLogin);

        $requestBody = [
            'company_login' => $sanitizedCompanyLogin,
            'email' => sanitize_email($email),
            'callback_url' => esc_url_raw($callbackUrl),
            'password' => sanitize_text_field($password),
            'retype_password' => sanitize_text_field($password),
            'journey_type' => 'wp_plugin',
            'marketing_consent' => $marketingConsent,
        ];

        if (is_int($category) && $category > 0) {
            $requestBody['category'] = $category;
        }

        return $this->request('POST', self::ENDPOINT_COMPANY, $requestBody, $sanitizedCompanyLogin, $captchaToken);
    }

    /**
     * Make a request.
     * @throws ApiException
     */
    private function request(string $method, string $endpoint, array $body = [], string $companyLogin = '', string $captchaToken = ''): array
    {
        $url = $this->buildUrl($endpoint);
        $headers = $this->buildRequestHeaders($companyLogin, $captchaToken);

        $args = [
            'method' => $method,
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
            'body' => wp_json_encode($body),
        ];

        $response = wp_safe_remote_request($url, $args);

        if (is_wp_error($response)) {
            throw (new ApiException(
                __('Failed to connect.', 'simplybook')
            ))->setData([
                'error' => sanitize_text_field($response->get_error_message()),
            ]);
        }

        return $this->parseResponse($response);
    }

    /**
     * Build request headers including optional company login and captcha token.
     */
    private function buildRequestHeaders(string $companyLogin = '', string $captchaToken = ''): array
    {
        $headers = array_merge($this->getRspalHeaders(), [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ]);

        if (!empty($companyLogin)) {
            $headers['X-Company-Login'] = sanitize_text_field($companyLogin);
        }

        if (!empty($captchaToken)) {
            $headers['RSPAL-RecaptchaV3Token'] = sanitize_text_field($captchaToken);
        }

        return $headers;
    }

    /**
     * Parse the response and handle errors.
     * @throws ApiException
     */
    private function parseResponse(array $response): array
    {
        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBodyRaw = wp_remote_retrieve_body($response);
        $responseBody = json_decode($responseBodyRaw, true);

        if (!is_array($responseBody)) {
            throw new ApiException(__('Invalid response.', 'simplybook'));
        }

        if (isset($responseBody['rspal-error'])) {
            $this->handleRspalError($responseBody['rspal-error'], $responseCode);
        }

        return [
            'code' => (int) $responseCode,
            'body' => $responseBody,
        ];
    }

    /**
     * Handle rspal-error responses.
     *
     * @param array|string $rspalError The error data from the rspal-error response.
     * @throws ApiException
     */
    private function handleRspalError($rspalError, int $responseCode): void
    {
        $errorMessage = is_array($rspalError)
            ? wp_json_encode($rspalError)
            : sanitize_text_field($rspalError);

        throw (new ApiException(
            $errorMessage ?: __('Account registration failed. Please try again.', 'simplybook')
        ))->setData([
            'error' => $errorMessage,
        ]);
    }

    /**
     * Get the Installation ID or 'unknown' if not set.
     */
    public function getInstallationId(): string
    {
        return get_option(self::INSTALLATION_ID_OPTION, 'unknown');
    }

    /**
     * Request the creation of a new installation ID
     * @param bool $override Whether to override existing ID or not
     * @throws ApiException
     */
    public function createInstallationId(bool $override = true): void
    {
        $existingId = $this->getInstallationId();
        if (!empty($existingId) && !$override) {
            return;
        }

        $headers = array_merge([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ], $this->getRspalHeaders());

        $response = wp_remote_post($this->env->getUrl('simplybook.rsp_auth_url') . '/installation/create', [
            'headers' => $headers,
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode([]),
        ]);

        if (is_wp_error($response)) {
            throw new ApiException('Could not create Installation ID. WP Error: ' . $response->get_error_message());
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if ($responseCode !== 200 && $responseCode !== 201) {
            throw new ApiException('Could not create Installation ID. Invalid response code: ' . $responseCode);
        }

        $installationId = isset($responseBody['uuid']) ? sanitize_text_field($responseBody['uuid']) : '';
        if (empty($installationId)) {
            throw new ApiException('Could not create Installation ID. Installation ID not found in response.');
        }

        update_option(self::INSTALLATION_ID_OPTION, $installationId, false);
    }

    /**
     * Build the URL.
     */
    private function buildUrl(string $endpoint): string
    {
        $endpoint = preg_replace('/[^a-zA-Z0-9\/_-]/', '', $endpoint);
        return $this->env->getUrl('simplybook.rsp_auth_url') . '/' . self::SIMPLYBOOK_API_VERSION . '/' . ltrim($endpoint, '/');
    }

    /**
     * Build the RSPAL headers.
     */
    private function getRspalHeaders(): array
    {
        $installationId = $this->getInstallationId();

        $headers = [
            'RSPAL-PluginName' => $this->env->getString('plugin.name'),
            'RSPAL-PluginVersion' => $this->env->getString('plugin.version'),
            'RSPAL-PluginPath' => $this->getPluginRelativePath(),
            'RSPAL-Origin' => trailingslashit(site_url()),
            'RSPAL-InstallationId' => $installationId,
        ];

        $headers['RSPAL-Signature'] = $this->getInstallationSignature($headers, $installationId);

        return $headers;
    }

    /**
     * Generate the installation signature.
     */
    private function getInstallationSignature(array $format, string $id): string
    {
        return hash_hmac('sha256', json_encode($format), $id);
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

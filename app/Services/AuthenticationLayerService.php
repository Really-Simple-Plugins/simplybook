<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasLogging;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

class AuthenticationLayerService
{
    use HasLogging;

    private const AL_BASE_URL = 'https://simplybook.auth.really-simple-plugins.com';
    private const SIMPLYBOOK_API_VERSION = 'v2';
    private const INSTALLATION_ID_OPTION = 'simplybook_al_installation_id';
    private const PLUGIN_NAME = 'SimplyBook';

    protected EnvironmentConfig $env;

    public function __construct(EnvironmentConfig $env)
    {
        $this->env = $env;
    }

    /**
     * Get the Installation ID
     */
    public function getInstallationId(): string
    {
        $installationId = get_option(self::INSTALLATION_ID_OPTION, '');

        if (!empty($installationId)) {
            return $installationId;
        }

        return $this->createInstallationId();
    }

    /**
     * Create a new installation
     */
    public function createInstallationId(): string
    {
        $response = wp_remote_post(self::AL_BASE_URL . '/installation/create', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'timeout' => 15,
            'sslverify' => true,
            'body' => json_encode([]),
        ]);

        if (is_wp_error($response)) {
            $this->log('Failed to create installation ID: ' . sanitize_text_field($response->get_error_message()));
            throw new ApiException(
                __('Failed to create installation ID.', 'simplybook')
            );
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if ($responseCode !== 200 && $responseCode !== 201) {
            $this->log('Failed to create installation ID. Response code: ' . $responseCode);
            throw new ApiException(
                __('Failed to create installation ID.', 'simplybook')
            );
        }

        $installationId = isset($responseBody['uuid']) ? sanitize_text_field($responseBody['uuid']) : '';

        if (empty($installationId)) {
            $this->log('Installation ID not found in response.');
            throw new ApiException(
                __('Invalid response.', 'simplybook')
            );
        }

        update_option(self::INSTALLATION_ID_OPTION, $installationId, false);

        return $installationId;
    }

    /**
     * Build the headers
     */
    public function buildRspalHeaders(): array
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

    /**
     * Make a request.
     */
    public function request(string $method, string $endpoint, array $body, string $token, string $companyLogin): array
    {
        if (empty($token) || empty($companyLogin)) {
            throw new ApiException(__('Invalid credentials.', 'simplybook'));
        }

        $endpoint = preg_replace('/[^a-zA-Z0-9\/_-]/', '', $endpoint);
        $url = self::AL_BASE_URL . '/' . self::SIMPLYBOOK_API_VERSION . '/' . ltrim($endpoint, '/');

        $rspalHeaders = $this->buildRspalHeaders();
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
     */
    public function requestPublicToken(): array
    {
        $url = self::AL_BASE_URL . '/' . self::SIMPLYBOOK_API_VERSION . '/simplybook/auth/token';

        $headers = array_merge($this->buildRspalHeaders(), [
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
}

<?php

namespace SimplyBook\Services;

use SimplyBook\Traits\HasLogging;
use SimplyBook\Exceptions\ApiException;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * Service responsible for communicating with the Authentication Layer (AL).
 *
 * The AL acts as a proxy between this plugin and the SimplyBook API,
 * forwarding registration requests while hiding the Application Key on the server side.
 */
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
     * Get the Installation ID from the database, or create one if it doesn't exist.
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
     * Create a new Installation ID by calling the AL endpoint.
     *
     * @throws ApiException When the installation ID cannot be created.
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
            $this->log('Failed to create installation ID: ' . $response->get_error_message());
            throw new ApiException(
                __('Failed to create installation ID for Authentication Layer.', 'simplybook')
            );
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        if ($responseCode !== 200 && $responseCode !== 201) {
            $this->log('Failed to create installation ID. Response code: ' . $responseCode);
            throw new ApiException(
                __('Failed to create installation ID for Authentication Layer.', 'simplybook')
            );
        }

        $installationId = $responseBody['uuid'] ?? '';

        if (empty($installationId)) {
            $this->log('Installation ID not found in response: ' . print_r($responseBody, true));
            throw new ApiException(
                __('Invalid response from Authentication Layer.', 'simplybook')
            );
        }

        update_option(self::INSTALLATION_ID_OPTION, $installationId, false);

        return $installationId;
    }

    /**
     * Build the RSPAL headers required for Authentication Layer requests.
     *
     * Important: The order of headers matters for signature calculation.
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

        // Generate signature from headers (order matters!)
        $headers['RSPAL-Signature'] = hash_hmac(
            'sha256',
            json_encode($headers),
            $headers['RSPAL-InstallationId']
        );

        return $headers;
    }

    /**
     * Get the plugin path relative to the WordPress root directory.
     *
     * Handles custom wp-content directories, renamed plugin folders,
     * and other non-standard WordPress installations.
     */
    private function getPluginRelativePath(): string
    {
        $pluginFullPath = wp_normalize_path(realpath($this->env->getString('plugin.path')));
        $wpRoot = wp_normalize_path(realpath(ABSPATH));

        return str_replace($wpRoot, '', $pluginFullPath);
    }

    /**
     * Make a request to the Authentication Layer.
     *
     * @param string $method HTTP method (POST, GET, etc.)
     * @param string $endpoint The endpoint path (e.g., 'simplybook/company')
     * @param array $body Request body data
     * @param string $token X-Token for authenticated requests
     * @param string $companyLogin X-Company-Login for authenticated requests
     * @return array Response data
     * @throws ApiException When the request fails or AL returns an error
     */
    public function request(string $method, string $endpoint, array $body, string $token, string $companyLogin): array
    {
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
                __('Failed to connect to Authentication Layer.', 'simplybook')
            ))->setData([
                'error' => $response->get_error_message(),
            ]);
        }

        $responseCode = wp_remote_retrieve_response_code($response);
        $responseBody = json_decode(wp_remote_retrieve_body($response), true);

        // Check for AL-specific errors
        if (isset($responseBody['rspal-error'])) {
            throw (new ApiException(
                __('Authentication Layer error: ', 'simplybook') . $responseBody['rspal-error']
            ))->setData([
                'rspal_error' => $responseBody['rspal-error'],
            ]);
        }

        return [
            'code' => $responseCode,
            'body' => $responseBody,
        ];
    }

    /**
     * Build the full AL endpoint URL for a given path.
     */
    public function getEndpointUrl(string $path): string
    {
        return self::AL_BASE_URL . '/' . self::SIMPLYBOOK_API_VERSION . '/' . ltrim($path, '/');
    }
}

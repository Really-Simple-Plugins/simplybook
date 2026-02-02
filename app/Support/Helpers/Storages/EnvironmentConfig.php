<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Helpers\DeferredObject;

/**
 * Environment configuration helper used in DI container.
 *
 * @mixin Storage This class acts as a proxy to Storage. All method calls are
 * resolved dynamically through {@see DeferredObject::__get()}
 */
final class EnvironmentConfig extends DeferredObject
{
    /**
     * @inheritDoc
     */
    protected function deferredClassString(): string
    {
        return Storage::class;
    }

    /**
     * @inheritDoc
     */
    protected function deferredConstructArguments(): array
    {
        return [
            'items' => $this->getStorageItems(),
        ];
    }

    /**
     * Method automatically resolved the correct environment configuration
     * for SimplyBook.me and returns the full env configuration as an array.
     */
    private function getStorageItems(): array
    {
        $items = require dirname(__FILE__, 5) . '/config/env.php';

        if (defined('RSP_AUTH_URL') || defined('RSP_BASE_API_DOMAIN')) {
            $items = $this->overrideEnvironmentConfigItems($items);
        }

        if (
            isset($items['simplybook']['domains'])
            && is_array($items['simplybook']['domains'])
            && !empty($items['simplybook']['base_api_domain'])
        ) {
            $baseApiDomain = $items['simplybook']['base_api_domain'];
            $domains = $items['simplybook']['domains'];
            $items['simplybook']['domains'] = $this->insertSimplyBookApiDomain($baseApiDomain, $domains);
        }

        return $items;
    }

    /**
     * Developers can override rsp_auth_url with constant RSP_AUTH_URL and
     * base_api_domain with constant RSP_BASE_API_DOMAIN. Set the constants
     * preferably in wp-config.php.
     *
     * Overrides values for:
     *
     *      $this->env->getUrl('simplybook.rsp_auth_url')
     *      $this->env->getString('simplybook.base_api_domain')
     */
    private function overrideEnvironmentConfigItems(array $items): array
    {
        $rspAuthUrlDefined = defined('RSP_AUTH_URL') && !empty(RSP_AUTH_URL);
        $baseApiDomainDefined = defined('RSP_BASE_API_DOMAIN') && !empty(RSP_BASE_API_DOMAIN);
        $authKeyExists = isset($items['simplybook']['rsp_auth_url']);
        $domainKeyExists = isset($items['simplybook']['base_api_domain']);

        if ($authKeyExists && $rspAuthUrlDefined) {
            $items['simplybook']['rsp_auth_url'] = RSP_AUTH_URL;
        }

        if ($domainKeyExists && $baseApiDomainDefined) {
            $items['simplybook']['base_api_domain'] = RSP_BASE_API_DOMAIN;
        }

        return $items;
    }

    /**
     * Insert the base API domain into the list of available domains if not
     * already present. Useful during development while using a custom
     * staging domain.
     */
    private function insertSimplyBookApiDomain(string $baseApiDomain, array $domains): array
    {
        // Find the domain by label
        $labels = array_column($domains, 'label');
        if (in_array($baseApiDomain, $labels, true)) {
            return $domains;
        }

        // Add domain if not found
        $sanitized = sanitize_text_field($baseApiDomain);
        $domains[] = [
            'value' => 'default:' . $sanitized,
            'label' => $sanitized,
        ];

        return $domains;
    }
}

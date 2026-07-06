<?php

namespace SimplyBook\Services\Entities;

use Throwable;
use SimplyBook\Exceptions\RestDataException;
use SimplyBook\Support\Helpers\Event;

class SubscriptionDataService extends AbstractEntityService
{
    /**
     * @inheritDoc
     */
    protected string $cachePrefix = 'simplybook';

    /**
     * @inheritDoc
     */
    protected string $identifier = 'subscription_data';

    /**
     * Fetch the subscription data from the SimplyBook API
     * @return array The subscription data
     */
    public function fetch(): array
    {
        return $this->client->get_subscription_data();
    }

    /**
     * Return the provider limit from fresh subscription data.
     */
    public function getFreshProviderLimitTotal(): int
    {
        try {
            $subscriptionData = $this->restore();
        } catch (Throwable $e) {
            return 0;
        }

        return $this->extractProviderLimitTotal($subscriptionData);
    }

    /**
     * Check whether a SimplyBook error response reports the provider limit.
     */
    public function isProviderLimitReachedResponse(RestDataException $exception): bool
    {
        $responseParts = $this->flattenErrorResponse($exception->getData());
        $responseParts[] = $exception->getMessage();
        $responseText = strtolower(implode(' ', $responseParts));

        return $this->containsAny($responseText, [
            'provider_limit',
            'provider limit',
            'providers',
            'service provider',
        ]) && $this->containsAny($responseText, [
            'limit',
            'maximum',
            'maxed',
        ]);
    }

    /**
     * Flatten response keys and values into searchable strings.
     */
    private function flattenErrorResponse(array $response): array
    {
        $values = [];

        foreach ($response as $key => $value) {
            $values[] = (string) $key;

            if (is_array($value)) {
                $values = array_merge($values, $this->flattenErrorResponse($value));
                continue;
            }

            if (is_scalar($value)) {
                $values[] = (string) $value;
            }
        }

        return $values;
    }

    /**
     * Extract the provider limit total from subscription data.
     */
    private function extractProviderLimitTotal(array $subscriptionData): int
    {
        return (int) ($subscriptionData['limits']['provider_limit']['total'] ?? 0);
    }

    /**
     * Check whether a haystack includes any of the configured needles.
     */
    private function containsAny(string $haystack, array $needles): bool
    {
        foreach ($needles as $needle) {
            if (stripos($haystack, $needle) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Process the subscription data and identify the limits by giving each
     * limit array item a key representing the limit type. We do this because
     * we need the limits in an associative array format.
     */
    protected function processData(array $data): array
    {
        if (empty($data) || empty($data['limits'])) {
            return $data;
        }

        $limits = $data['limits'];
        $data['limits'] = array_column($limits, null, 'key');
        return $data;
    }

    /**
     * Trigger {@see Event::SUBSCRIPTION_DATA_LOADED} when subscription data
     * is loaded.
     */
    protected function dispatchDataLoaded(array $data): void
    {
        Event::dispatch(Event::SUBSCRIPTION_DATA_LOADED, $data);
    }
}

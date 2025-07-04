<?php
namespace SimplyBook\Http\Endpoints;

class ServicesEndpoint extends AbstractBaseEndpoint
{
    const ROUTE = 'services';

    /**
     * Get the route name for this endpoint
     */
    protected function getRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * Get the resource name
     */
    protected function getResource(): string
    {
        return 'service';
    }

    /**
     * Sanitize service-specific data
     */
    protected function sanitizeInputData(array $data): array
    {
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            switch ($key) {
                case 'name':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'description':
                    $sanitized[$key] = sanitize_textarea_field($value);
                    break;
                case 'price':
                case 'deposit_price':
                    $sanitized[$key] = $this->sanitizePrice($value);
                    break;
                case 'duration':
                    $sanitized[$key] = $this->sanitizeDuration($value);
                    break;
                case 'tax_id':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'is_visible':
                    $sanitized[$key] = (bool) $value;
                    break;
                default:
                    // Remove any unexpected fields
                    if (!in_array($key, ['nonce', '_method'])) {
                        $sanitized[$key] = is_string($value) ? sanitize_text_field($value) : $value;
                    }
                    break;
            }
        }
        
        return $sanitized;
    }

    /**
     * Escape service output data
     */
    protected function escapeOutputData(array $data): array
    {
        if (empty($data)) {
            return $data;
        }
        
        $escaped = [];
        
        foreach ($data as $key => $item) {
            if (is_array($item)) {
                $escaped[$key] = $this->escapeServiceItem($item);
            } else {
                $escaped[$key] = $item;
            }
        }
        
        return $escaped;
    }

    /**
     * Escape individual service item data
     */
    private function escapeServiceItem(array $item): array
    {
        $escaped = [];
        
        foreach ($item as $key => $value) {
            switch ($key) {
                case 'name':
                case 'tax_id':
                    $escaped[$key] = is_string($value) ? esc_html($value) : $value;
                    break;
                case 'description':
                    $escaped[$key] = is_string($value) ? esc_textarea($value) : $value;
                    break;
                case 'price':
                case 'deposit_price':
                case 'duration':
                case 'is_visible':
                case 'id':
                    $escaped[$key] = (int) $value;
                    break;
                default:
                    $escaped[$key] = is_string($value) ? esc_html($value) : $value;
            }
        }
        
        return $escaped;
    }

    /**
     * Sanitize price values
     */
    private function sanitizePrice($value): float
    {
        $price = floatval($value);
        return max(0, $price); // Ensure non-negative
    }

    /**
     * Sanitize duration values (in minutes)
     */
    private function sanitizeDuration($value): int
    {
        $duration = intval($value);
        return max(1, $duration); // Minimum 1 minute
    }
}
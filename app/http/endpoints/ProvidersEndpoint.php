<?php
namespace SimplyBook\Http\Endpoints;

class ProvidersEndpoint extends AbstractBaseEndpoint
{
    const ROUTE = 'providers';

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
        return 'provider';
    }

    /**
     * Sanitize provider-specific data
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
                case 'email':
                    $sanitized[$key] = sanitize_email($value);
                    break;
                case 'phone':
                    $sanitized[$key] = sanitize_text_field($value);
                    break;
                case 'qty':
                case 'quantity':
                    $sanitized[$key] = $this->sanitizeQuantity($value);
                    break;
                case 'color':
                    $sanitized[$key] = sanitize_hex_color($value) ?: '#3b82f6';
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
     * Escape provider output data
     */
    protected function escapeOutputData(array $data): array
    {
        if (empty($data)) {
            return $data;
        }
        
        $escaped = [];
        
        foreach ($data as $key => $item) {
            if (is_array($item)) {
                $escaped[$key] = $this->escapeProviderItem($item);
            } else {
                $escaped[$key] = $item;
            }
        }
        
        return $escaped;
    }

    /**
     * Escape individual provider item data
     */
    private function escapeProviderItem(array $item): array
    {
        $escaped = [];
        
        foreach ($item as $key => $value) {
            switch ($key) {
                case 'name':
                case 'phone':
                    $escaped[$key] = is_string($value) ? esc_html($value) : $value;
                    break;
                case 'description':
                    $escaped[$key] = is_string($value) ? esc_textarea($value) : $value;
                    break;
                case 'email':
                    $escaped[$key] = is_string($value) ? esc_html($value) : $value;
                    break;
                case 'color':
                    $escaped[$key] = is_string($value) ? esc_attr($value) : $value;
                    break;
                case 'qty':
                case 'quantity':
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
     * Sanitize quantity values
     */
    private function sanitizeQuantity($value): int
    {
        $qty = intval($value);
        return max(1, $qty); // Minimum 1
    }
}
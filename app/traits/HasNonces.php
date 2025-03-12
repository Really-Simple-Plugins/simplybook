<?php namespace SimplyBook\Traits;

use SimplyBook\App;

trait HasNonces
{
    /**
     * Method for verifying the nonce
     * @param mixed $nonce Preferably string, not type-casted to prevent errors
     */
    protected function verifyNonce($nonce, string $action = 'simplybook_nonce'): bool
    {
        if (is_string($nonce) === false) {
            return false;
        }

        return wp_verify_nonce(sanitize_text_field(wp_unslash($nonce)), 'simplybook_nonce');
    }
}
<?php
namespace SimplyBook\Traits;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

trait HasEncryption
{
    /**
     * Encrypts a token using AES-256-CBC encryption with a version marker.
     *
     * This function encrypts a token string using AES-256-CBC with a random
     * initialization vector (IV). New tokens use the "v2:" format which separates
     * the IV and encrypted data with a period for better clarity.
     *
     * @param string $string The token to encrypt (should be a 64-character hex string).
     * @return string The encrypted token with format "v2:base64(iv).base64(encrypted)".
     *
     * @since 3.1 Uses v2 format with OPENSSL_RAW_DATA
     * @example
     * $token = "a1b2c3d4e5f6..."; // 64-character hex string
     * $encrypted = encrypt_string($token); // Returns "v2:abc123.xyz789"
     */
    public function encrypt_string($string): string
    {
        //@todo: use a different key for each wordpress setup
        $key = hash('sha256', '7*w$9pumLw5koJc#JT6', true);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = openssl_random_pseudo_bytes($ivLength);

        // Use OPENSSL_RAW_DATA for new v2 tokens
        $encrypted = openssl_encrypt($string, 'AES-256-CBC', $key, OPENSSL_RAW_DATA|OPENSSL_DONT_ZERO_PAD_KEY, $iv);

        // Format: v2:base64(iv).base64(encrypted)
        return 'v2:' . base64_encode($iv) . '.' . base64_encode($encrypted);
    }
}
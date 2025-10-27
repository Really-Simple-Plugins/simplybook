<?php

namespace SimplyBook\Traits;

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
    public function encryptString(string $string): string
    {
        //@todo: use a different key for each wordpress setup
        $key = hash('sha256', '7*w$9pumLw5koJc#JT6', true);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = openssl_random_pseudo_bytes($ivLength);

        // Use OPENSSL_RAW_DATA for new v2 tokens
        $encrypted = openssl_encrypt($string, 'AES-256-CBC', $key, OPENSSL_RAW_DATA | OPENSSL_DONT_ZERO_PAD_KEY, $iv);

        // Format: v2:base64(iv).base64(encrypted)
        return 'v2:' . base64_encode($iv) . '.' . base64_encode($encrypted);
    }

    /**
     * Decrypts an encrypted string. Supports both v2 and legacy formats.
     */
    public function decryptString(string $encryptedString): string
    {
        if (empty($encryptedString)) {
            return '';
        }

        $legacyKey = '7*w$9pumLw5koJc#JT6';
        $key = hash('sha256', $legacyKey, true);

        // Check if it's a v2 token (new format)
        if (strpos($encryptedString, 'v2:') === 0) {
            return $this->decryptV2String($encryptedString, $key, $legacyKey);
        }

        // Fall back to legacy decryption
        return $this->decryptLegacyString($encryptedString, $legacyKey);
    }

    /**
     * Decrypts a v2 format encrypted token.
     * V2 tokens use the format "v2:base64(iv).base64(encrypted)".
     */
    private function decryptV2String(string $encryptedString, string $key, string $legacyKey): string
    {
        $parts = explode('.', substr($encryptedString, 3), 2);

        if (count($parts) !== 2) {
            return '';
        }

        $iv = base64_decode($parts[0], true);
        $encrypted = base64_decode($parts[1], true);

        if ($iv === false || $encrypted === false) {
            return '';
        }

        // Try with the current key first
        $decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $key, OPENSSL_RAW_DATA | OPENSSL_DONT_ZERO_PAD_KEY, $iv);

        // Fallback to legacy key if needed
        if (empty($decrypted)) {
            $decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $legacyKey, OPENSSL_RAW_DATA, $iv);
        }

        return $decrypted ?: '';
    }

    /**
     * Decrypts a legacy format encrypted string.
     */
    private function decryptLegacyString(string $encryptedString, string $legacyKey): string
    {
        $data = base64_decode($encryptedString, true);

        if ($data === false) {
            return '';
        }

        $ivLength = openssl_cipher_iv_length('AES-256-CBC');

        if (strlen($data) < $ivLength) {
            // Try double base64 decoding for legacy compatibility
            $data = base64_decode($data, true);
            if ($data === false || strlen($data) < $ivLength) {
                return '';
            }
        }

        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        $decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $legacyKey, 0, $iv);

        // Validate the decrypted result is a valid token format
        if ($decrypted && preg_match('/^[a-f0-9]{64}$/i', $decrypted)) {
            return $decrypted;
        }

        return '';
    }
}

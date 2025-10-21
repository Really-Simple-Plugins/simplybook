<?php

namespace SimplyBook\Traits;

trait HasTokenManagement
{
    use HasEncryption;

    private array $validTokenTypes = ['public', 'admin', 'user'];

    /**
     * Sanitizes an API token to ensure it matches the expected format.
     */
    public function sanitizeToken(string $token): string
    {
        $token = trim($token);

        if (preg_match('/^[a-f0-9]{64}$/i', $token)) {
            return $token;
        }

        return '';
    }

    /**
     * Updates a token in the database after sanitizing and encrypting it.
     */
    public function updateToken(string $token, string $type = 'public', bool $refresh = false): void
    {
        $type = $this->validateTokenType($type);

        if ($refresh) {
            $type .= '_refresh';
        }

        $sanitizedToken = $this->sanitizeToken($token);
        $encryptedToken = $this->encryptString($sanitizedToken);

        update_option("simplybook_token_{$type}", $encryptedToken);
    }

    /**
     * Retrieves and decrypts a token from the database.
     */
    public function getToken(string $type = 'public', bool $refresh = false): string
    {
        $type = $this->validateTokenType($type);

        if ($refresh) {
            $type .= '_refresh';
        }

        $encryptedToken = get_option("simplybook_token_{$type}", '');

        if (empty($encryptedToken)) {
            return '';
        }

        return $this->decryptString($encryptedToken);
    }

    /**
     * Checks if a token is valid and not expired.
     */
    public function tokenIsValid(string $type = 'public'): bool
    {
        $refreshToken = $this->getToken($type, true);

        if (empty($refreshToken)) {
            return false;
        }

        $expires = $this->getTokenExpiration($type);

        return $expires > time();
    }

    /**
     * Clears all stored tokens from the database.
     */
    public function clearTokens(): void
    {
        delete_option('simplybook_token_refresh');
        delete_option('simplybook_refresh_token_expiration');
        delete_option('simplybook_refresh_company_token_expiration');
        delete_option('simplybook_token');
    }

    /**
     * Validates and normalizes the token type.
     */
    protected function validateTokenType(string $type): string
    {
        return in_array($type, $this->validTokenTypes, true) ? $type : 'public';
    }

    /**
     * Gets the expiration timestamp for a given token type.
     */
    protected function getTokenExpiration(string $type): int
    {
        $type = $this->validateTokenType($type);

        if ($type === 'admin') {
            return (int) get_option('simplybook_refresh_company_token_expiration', 0);
        }

        return (int) get_option('simplybook_refresh_token_expiration', 0);
    }

}

<?php
namespace SimplyBook\Traits;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

trait HasTokenManagement
{
    use HasEncryption;

    /**
     * Sanitize the api token
     * @param string $token
     * @return string
     */
    public function sanitize_token($token): string
    {
        $token = trim($token);
        if (preg_match('/^[a-f0-9]{64}$/i', $token)) {
            return $token;
        } else {
            return '';
        }
    }

    /**
     * get a token
     *
     * @param string $token
     * @param string $type //public or admin
     * @param bool $refresh
     *
     * @return void
     */
    public function update_token( string $token, string $type = 'public', bool $refresh = false ): void {
        $type = in_array($type, ['public', 'admin', 'user']) ? $type : 'public';
        if ( $refresh ) {
            $type = $type . '_refresh';
        }
        $token = $this->sanitize_token( $token );
        update_option("simplybook_token_$type", $this->encrypt_string($token) );
    }

    /**
     * Get a token
     * @param string $type //public or admin
     * @param bool $refresh
     * @return string
     */
    public function get_token( string $type = 'public', bool $refresh = false ) : string {
        $type = in_array($type, ['public', 'admin', 'user']) ? $type : 'public';
        if ( $refresh ) {
            $type = $type . '_refresh';
        }
        $token = get_option("simplybook_token_" . $type, '');

        return $this->decrypt_string($token);
    }

    /**
     * Check if we have a valid token
     *
     * @param string $type
     *
     * @return bool
     */
    protected function token_is_valid( string $type = 'public' ): bool {
        $refresh_token = $this->get_token($type, true );
        $type = in_array($type, ['public', 'admin']) ? $type : 'public';
        if ( $type === 'admin' ) {
            $expires = get_option( 'simplybook_refresh_company_token_expiration', 0 );
        } else {
            $expires = get_option( 'simplybook_refresh_token_expiration', 0 );
        }

        if ( !$refresh_token || !$expires ) {
            return false;
        }
        if ( $expires < time() ) {
            return false;
        }
        return true;
    }

    /**
     * Clear tokens
     *
     * @return void
     */
    protected function clear_tokens(): void {
        delete_option('simplybook_token_refresh');
        delete_option('simplybook_refresh_token_expiration');
        delete_option('simplybook_refresh_company_token_expiration');
        delete_option('simplybook_token');
    }
}
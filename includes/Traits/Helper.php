<?php
namespace Simplybook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 *
 * @since   3.0
 *
 */
trait Helper {
    /**
     * Check manage capability
     *
     * @return bool
     */
    public function user_can_manage(): bool {
		//during activation, we need to allow access
	    if ( get_option('simplybook_run_activation') ) {
		    return true;
	    }
        if ( defined( 'WP_CLI' ) && WP_CLI ){
            return true;
        }
        return current_user_can( 'simplybook_manage' );
    }

	/**
	 * Encrypt data
	 * @param $string
	 * @return string
	 */
	public function encrypt_string($string): string
	{
		//@todo: use a different key for each wordpress setup
		$key = '7*w$9pumLw5koJc#JT6';
		$ivLength = openssl_cipher_iv_length('AES-256-CBC');
		$iv = openssl_random_pseudo_bytes($ivLength);

		$encrypted = openssl_encrypt($string, 'AES-256-CBC', $key, 0, $iv);

		return base64_encode($iv . $encrypted);
	}

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
     * Check if this is an authenticated rest request
     *
     * @return bool
     */
    public function is_logged_in_rest(): bool
    {
        $is_settings_page_request = isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/simplybook/v1/' ) !== false;
        if ( ! $is_settings_page_request ) {
            return false;
        }

	    return $this->user_can_manage();
    }

    /**
     * Get the admin url
     *
     * @return string
     */
    public function admin_url( $path = '' ): string {
        $url = add_query_arg([ 'page' => 'simplybook' ], admin_url( 'admin.php' ) );
		if ( ! empty( $path ) ) {
			$url .= $path;
		}
		return $url;
    }

    /**
     * Log a message if WP_DEBUG is enabled
     *
     * @param string | object | array $message
     *
     * @return void
     */
    public function log(  $message ): void {
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$prepend = 'Simplybook: ';
            if ( is_array( $message ) || is_object( $message ) ) {
				error_log( $prepend . print_r( $message, true ) );
			} else {
				error_log( $prepend . $message );
			}
        }
    }

}

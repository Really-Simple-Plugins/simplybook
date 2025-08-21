<?php
namespace SimplyBook\Traits;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 * @since   3.0
 */
trait LegacyHelper
{
    use HasAllowlistControl;

    /**
     * Check manage capability
     *
     * @deprecated 3.0.0 Use HasAllowlistControl::adminAccessAllowed() instead
     * @return bool
     */
    public function user_can_manage(): bool {
		//during activation, we need to allow access
	    if ( get_option('simplybook_activation_flag') ) {
		    return true;
	    }
        if ( defined( 'WP_CLI' ) && WP_CLI ){
            return true;
        }

		if ($this->restRequestIsAllowed()) {
			return true;
		}

        return current_user_can( 'simplybook_manage' );
    }



	/**
	 * Get the temporary callback URL. Return empty string if the URL is expired
	 *
	 * @return string
	 */
	public function get_callback_url(): string {
		$callback_url = get_option('simplybook_callback_url', '' );
		$expires = get_option('simplybook_callback_url_expires' );
		if ( $expires > time() ) {
			return $callback_url;
		}

		//expired URL
		delete_option('simplybook_callback_url');
		return '';
	}

	public function cleanup_callback_url() {
		delete_option('simplybook_callback_url' );
		delete_option('simplybook_callback_url_expires' );
	}

	public function sanitize_country( $country ): string {
		$country = strtoupper(trim($country));
		if (preg_match('/^[a-z]{2}$/i', $country)) {
			return $country;
		} else {
			return '';
		}
	}

	/**
	 * Create a page
	 *
	 * @param string $title
	 * @param string $content
	 *
	 * @return int
	 */
	public function create_page( string $title, string $content): int {
		if ( !$this->user_can_manage() ) {
			return -1;
		}

		$title = sanitize_text_field($title);

		$content = wp_kses_post($content);
		$page = array(
			'post_title'   => $title,
			'post_type'    => "page",
			'post_content' => $content,
			'post_status'  => 'publish',
		);

		// Insert the post into the database
		$page_id = wp_insert_post( $page );
		if ( is_wp_error( $page_id ) ) {
			return -1;
		}
		do_action( 'simplybook_create_page', $page_id, $title, $content );
		return $page_id;
	}

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
     * Log a message if WP_DEBUG is enabled
     *
     * @param string | object | array $message
     * @return void
     */
    public function log(  $message ): void {
        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$prepend = 'SimplyBook.me: ';
            if ( is_array( $message ) || is_object( $message ) ) {
                /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log, WordPress.PHP.DevelopmentFunctions.error_log_print_r */
				error_log( $prepend . print_r( $message, true ) );
			} else {
                /* phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log */
				error_log( $prepend . $message );
			}
        }
    }

}
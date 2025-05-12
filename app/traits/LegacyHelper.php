<?php
namespace SimplyBook\Traits;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 *
 * @since   3.0
 *
 */
trait LegacyHelper {
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

		if ( simplybook_is_logged_in_rest() ) {
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
		error_log("create page $title");
		error_log(print_r($page, true));

		// Insert the post into the database
		$page_id = wp_insert_post( $page );
		if ( is_wp_error( $page_id ) ) {
			return -1;
		}
		do_action( 'simplybook_create_page', $page_id, $title, $content );
		return $page_id;
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
			$prepend = 'SimplyBook.me: ';
            if ( is_array( $message ) || is_object( $message ) ) {
				error_log( $prepend . print_r( $message, true ) );
			} else {
				error_log( $prepend . $message );
			}
        }
    }

}
<?php
namespace SimplyBook\Traits;

use SimplyBook\App;
use SimplyBook\Traits\LegacyHelper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * todo
 * Give proper name and make it follow Single Responsibility Principle
 */
trait LegacyLoad {
	public $fields = [];
	public $values_loaded = false;

    public $counter = 0;

    /**
     * Get a field by ID
     * @param string $id
     * @return array
     */
    public function get_field_by_id(string $id ): array
    {
        $fields = $this->fields();
        foreach ( $fields as $field ) {
            if (isset($field['id']) && $field['id'] === $id ) {
                return $field;
            }
        }
        return [];
    }

    /**
     * Get option
     *
     * @param string $key
     * @param $default
     * @return mixed
     */
    public function get_option(string $key, bool $parseField = true)
    {
        global $simplybook_cache;
        if ( !empty($simplybook_cache) ) {
            $options = $simplybook_cache;
        } else {
            $options = get_option('simplybook_options', []);
            $simplybook_cache = $options;
        }

        $value = $options[$key] ?? false;
        if ($parseField === false) {
            return $value;
        }

        $field = $this->get_field_by_id($key);
        if ( !$field ) {
            return false;
        }

	    if ( $value === false ) {
		    $value = $field['default'] ?? false;
	    }

        if ( $field['encrypt'] ) {
            $value = $this->decrypt_string($value);
        }

        if ( $field['type'] === 'checkbox' ) {
            $value = (int) $value;
        }
        return $value;
    }

    /**
     * Get company
     *
     * @param string $key
     * @param $default
     * @return mixed
     */
    public function get_company(string $key = '')
    {
        global $simplybook_company_cache;
        if ( !empty($simplybook_company_cache) ) {
            $company = $simplybook_company_cache;
        } else {
            $company = get_option('simplybook_company_data', []);
            $simplybook_company_cache = $company;
        }

        if (empty($key)) {
            return $company;
        }

        return $company[$key] ?? [];
    }


	/**
	 * Decrypts an encrypted token string with backward compatibility support.
	 *
	 * This function acts as a dispatcher that automatically detects the token format
	 * and delegates to the appropriate decryption method:
	 * - V2 format: "v2:base64(iv).base64(encrypted)"
	 * - Legacy format: base64(iv + encrypted)
	 *
	 * @param string $encrypted_string The encrypted token to decrypt.
	 * @return string The decrypted token if valid, or an empty string if invalid.
	 *
	 * @since 3.1 Added support for v2 format with OPENSSL_RAW_DATA
	 * @example
	 * $decrypted = decrypt_string("v2: abc123.xyz789"); // Returns the original token
	 * $decrypted = decrypt_string("legacy_encrypted_data"); // Also works with old tokens
	 */
	public function decrypt_string($encrypted_string): string
	{
		if (empty($encrypted_string)) {
			return '';
		}

        $legacyKey = '7*w$9pumLw5koJc#JT6';
        $key = hash('sha256', $legacyKey, true);

		// Check if it's a v2 token (new format)
		if (strpos($encrypted_string, 'v2:') === 0) {
			return $this->decrypt_string_v2($encrypted_string, $key, $legacyKey);
		}

		return $this->decrypt_legacy_string($encrypted_string, $legacyKey);
	}

	/**
	 * Decrypts a v2 format encrypted token.
	 *
	 * V2 tokens use the format "v2:base64(iv).base64(encrypted)" and employ
	 * an OPENSSL_RAW_DATA flag for decryption. This format separates the IV and
	 * ciphertext with base64 encoding for each component.
	 *
	 * @param string $encrypted_string The v2 format encrypted token (prefixed with "v2:").
	 * @return string The decrypted token if valid, or an empty string if decryption fails.
	 *
	 * @since 3.1.0
     * @since 3.2.0 Added OPENSSL_DONT_ZERO_PAD_KEY when non-legacy key is used.
	 */
	private function decrypt_string_v2(string $encrypted_string, string $key, string $legacyKey): string
    {
		$parts = explode('.', substr($encrypted_string, 3), 2);

		if (count($parts) !== 2) {
			$this->log("v2 token: invalid format — missing iv or ciphertext part.");
			return '';
		}

		$iv = base64_decode($parts[0], true);
		$encrypted = base64_decode($parts[1], true);

		if ($iv === false || $encrypted === false) {
			$this->log("v2 token: base64 decode failed (iv: " . ($iv === false ? 'invalid' : 'ok') . ", encrypted: " . ($encrypted === false ? 'invalid' : 'ok') . ")");
			return '';
		}

        // Decrypt with forcefully non-padded, 32 byte key
		$decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $key, OPENSSL_RAW_DATA|OPENSSL_DONT_ZERO_PAD_KEY, $iv);

        // Fallback to legacy key, maybe encryption was done with the old one.
        if (empty($decrypted)) {
		    $decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $legacyKey, OPENSSL_RAW_DATA, $iv);
        }

        // Still empty, abort.
		if (empty($decrypted)) {
			$this->log("v2 token: openssl decryption failed.");
			return '';
		}

		if (!preg_match('/^[a-f0-9]{64}$/i', $decrypted)) {
			return '';
		}

		return $decrypted;
	}

	/**
	 * Decrypts a legacy format encrypted token.
	 *
	 * Legacy tokens use the format base64(iv + encrypted) where the IV and
	 * ciphertext are concatenated before base64 encoding. This method includes
	 * fallback logic for double base64 encoding scenarios and uses flag=0
	 * for OpenSSL decryption.
	 *
	 * @param string $encrypted_string The legacy format encrypted token.
	 * @return string The decrypted token if valid, or an empty string if decryption fails.
	 *
	 * @since 3.1
	 */
	private function decrypt_legacy_string(string $encrypted_string, string $key): string {
		// Legacy tokens
		$data = base64_decode($encrypted_string, true);
		$ivLength = openssl_cipher_iv_length('AES-256-CBC');

		if ($data === false || strlen($data) < $ivLength) {
			$this->log("legacy token: decoded data too short, trying double base64 decoding...");

			$data = base64_decode($data, true);

			if ($data === false || strlen($data) < $ivLength) {
				$this->log("legacy token: double base64 decoding failed or still too short (length: " . strlen($data) . ").");
				return '';
			}
		}

		$iv = substr($data, 0, $ivLength);
		$encrypted = substr($data, $ivLength);

		$decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);

		if ($decrypted === false) {
			$this->log("legacy token: openssl decryption failed.");
			return '';
		}

		if (!preg_match('/^[a-f0-9]{64}$/i', $decrypted)) {
			$this->log("legacy token: decrypted result did not match expected 64-character hex format.");
			return '';
		}

		return $decrypted;
	}


    /**
     * Get fields array for the settings
     *
     * @param bool $load_values
     *
     * @return array
     */
    public function fields(bool $load_values = false): array
    {
		$reload_fields = false;
		if ( $load_values && !$this->values_loaded ) {
			$reload_fields = true;
		}

		if ( count($this->fields) === 0 ) {
			$reload_fields = true;
		}

		if ( !$reload_fields ) {
			return $this->fields;
		}

        $fields = [];
        $fieldsConfig = App::fields()->all();
        $fieldsConfig = apply_filters( 'simplybook_fields', $fieldsConfig );

        foreach ( $fieldsConfig as $groupID => $fieldGroup ) {
            foreach ( $fieldGroup as $key => $field ) {
                $field = wp_parse_args( $field, [
                    'id' => false,
                    'menu_id' => 'general',
                    'group_id' => 'general',
                    'type' => 'text',
                    'visible' => true,
                    'disabled' => false,
                    'default' => false,
                    'encrypt' => false,
                    'label' => '',
                ] );

                //only preload field values for logged in admins
                if ( $load_values && $this->user_can_manage() ) {
                    $value          = $this->get_option( $field['id'], $field['default'] );
                    $field['value'] = apply_filters( 'simplybook_field_value_' . $field['id'], $value, $field );
                }
                $fields[ $key ] = apply_filters( 'simplybook_field', $field, $field['id'], $groupID );
            }
        }

        $fields = apply_filters( 'simplybook_fields_values', $fields );
		$this->fields = array_values( $fields );

        return $this->fields;
    }

	/**
	 * Get menu array for the settings

	 * @return array
	 */
	public function menu(): array
	{
		$menus = App::menus()->all();
		$menus = apply_filters('simplybook_menu', $menus);

		foreach ( $menus as $key => $menu ) {
			$menu = wp_parse_args( $menu, [
				'id' => false,
				'title' => 'No title',
				'groups' => [],
			] );

			// if empty group add group with same title and id as menu
			if ( empty( $menu['groups'] ) ) {
				$menu['groups'][] = [
					'id' => $menu['id'],
					'title' => $menu['title'],
				];
			}

			$menus[ $key ] = apply_filters( 'simplybook_menu_item', $menu, $menu['id'] );
		}

		$menus = apply_filters( 'simplybook_menus_values', $menus );
		return array_values( $menus );
	}

    /**
     * Helper method to easily retrieve the correct SimplyBook (API) domain
     * @param bool $validate Is used on {@see get_option} to parse the domain
     * field from the fields' config. Sometimes we do not want this to prevent
     * translation errors while loading the fields.
     * @throws \LogicException For developers
     */
    public function get_domain(bool $validate = true)
    {
        if ($cache = wp_cache_get('simplybook_get_domain_legacy_load', 'simplybook')) {
            return $cache;
        }

        $savedDomain = $this->get_option('domain', $validate);
        if (!empty($savedDomain)) {
            wp_cache_set('simplybook_get_domain_legacy_load', $savedDomain, 'simplybook');
            return $savedDomain;
        }

        $environment = App::provide('simplybook_env');
        if (empty($environment['domain'])) {
            throw new \LogicException('SimplyBook domain is not set in the environment.');
        }

        wp_cache_set('simplybook_get_domain_legacy_load', $environment['domain'], 'simplybook');
        return $environment['domain'];
    }

}
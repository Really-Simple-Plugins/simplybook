<?php
namespace SimplyBook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * @Rogier maybe move to Admin?
 */
trait LegacySave {
    use LegacyLoad;
    use LegacyHelper;

    /**
     * Fields that are not changeable by the user
     */
    private array $staleFields = [
        'company_login',
        'calendar_shortcode',
        'reviews_shortcode',
        'simplybook_booking_button',
        'domain',
        'company_id',
        'server',
    ];

    /**
     * Get options the old way
     *
     * @deprecated
     * @param $key
     * @param $default
     * @return mixed
     */
    public function get_config_obsolete($key, $default = null)
    {
        $key = 'simplybookMePl_' . $key;
        $value = get_option($key);

        if ( $value === false ) {
            $value = $default;
        } else {
            $decryptedValue = $this->decryptString_obsolete($value);

            $unserializedValue = @unserialize($decryptedValue); // Suppress unserialize errors

            if ($unserializedValue !== false) {
                $value = $unserializedValue;
            } else {
                $value = $decryptedValue;
            }
        }

        return $value;
    }

    public function upgrade_options_testing( $array ): void
    {
        foreach ( $array as $key => $value ) {
            if ( $value !== false ) {
                $this->update_option($key, $value);
            }
        }
    }

    /**
     * Upgrade the options to one single option
     *
     * @return void
     */
    public function upgrade_options(): void
    {
        $upgrade_keys = [
            'api_status',
            'domain',
            'auth_datetime',
            'is_auth',
            'auth_data',
        ];
        foreach ($upgrade_keys as $key) {

            $value = $this->get_config_obsolete($key);
            if ( $value !== false ) {
                if ( $key === 'api_status' ) {
                    update_option('simplybook_api_status', $value);
                } else
                if ( $key === 'widget_settings' || $key === 'auth_data' ) {
                    if ( is_array( $value ) ) {
                        foreach ( $value as $key => $val) {
                            $this->update_option($key, $val);
                        }
                    }
                } else {
                    $this->update_option($key, $value);
                }
            }
            delete_option('simplybookMePl_' . $key);
        }
    }

    /**
     * Decryption method for old options
     *
     * @param string $encryptedString
     * @return string
     */
    public function decryptString_obsolete(string $encryptedString): string
    {
        $key = '7*w$9pumLw5koJc#JT6';
        $data = base64_decode($encryptedString);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
    }

    /**
     * Save data in the config
     * @param $key
     * @param $value
     * @param bool $duringOnboarding Flag to indicate if the update is during
     * onboarding. If false, stale fields will not be saved.
     */
    public function update_option($key, $value, bool $duringOnboarding = false): bool
    {
        if ( !$this->user_can_manage() ) {
			error_log("user cannot manage, exit update_option for $key");
            return false;
        }

        // Abort if the setting is marked as stale
        if (in_array($key, $this->staleFields, true) && ($duringOnboarding === false)) {
            return false;
        }

        //$pass = '7*w$9pumLw5koJc#JT6';
        $options = get_option('simplybook_options', []);
        //sanitize the value

        //todo - parsing all fields like this for each save is quite heavy just to know the type
        // todo - also this is redundant when used as in the OnboardingService
        // todo - it IS the only way to get the field now as I nested the fields in its own group with the groupname equal to the filename
        $field = $this->get_field_by_id($key);

        //don't save if not found
        if ( !$field ) {
            error_log("field ".$key." not found in fields config");
            return false;
        }

        // todo - usage of sanitize_field is redundant when used as in the OnboardingService
        $value = $this->sanitize_field($value, $field['type'], ($field['regex'] ?? null));

        // todo - except for the encryption fields, maybe we can create a getEncrypted method in the Storage class?
        if ( $field['encrypt'] ) {
            $value = $this->encrypt_string($value);
        }
        $options[$key] = $value;
        update_option('simplybook_options', $options);
        return true;
    }

	/**
	 * Delete an option from the settings array
	 *
	 * @param $key
	 *
	 * @return void
	 */
	public function delete_option($key): void
	{
		if ( !$this->user_can_manage() ) {
			return;
		}

		$options = get_option('simplybook_options', []);
		if ( isset($options[$key]) ) {
			unset($options[$key]);
		}

		update_option('simplybook_options', $options);
	}

    public function update_options( $fields ): void {
        foreach ( $fields as $field ) {
			$this->update_option( $field['id'], $field['value'] );
        }

        do_action( 'simplybook_after_save_options', $fields );
    }

    /**
     * Sanitize a value based on the field type
     *
     * @param $value
     * @param string $type
     * @return int|string
     */
    public function sanitize_field( $value, $type, $regex = '' ) {
        switch ( $type ) {
            case 'checkbox':
            case 'number':
            return (int) $value;
            case 'select':
            case 'text':
            case 'textarea':
                $sanitizedValue = sanitize_text_field( $value );
                if ( $regex && preg_match( $regex, $sanitizedValue ) !== 1 ) {
                    return ''; // Return empty if regex validation fails
                }
                return $sanitizedValue;
	        case 'colorpicker':
		        return sanitize_hex_color( $value );
            case 'email':
                return sanitize_email( $value );
            case 'url':
                return esc_url_raw( $value );
	        case 'hidden':
	        default:
                return sanitize_text_field( $value );
        }
    }

    /**
     * Sanitize against list of allowed field types
     *
     * @param string $type
     *
     * @return string
     */
    public function sanitize_field_type (string $type ): string
    {
        $types = array(
            'hidden',
            'checkbox',
            'radio',
            'text',
            'textarea',
            'number',
            'email',
            'select',
            'license',
        );

        if ( in_array( $type, $types ) ) {
            return $type;
        }

        $this->log("Invalid field type: $type");
        return 'checkbox';
    }

    /**
     * Delete all WordPress options containing 'simplybook_' or 'simplybookMePl_'
     * Method can be used to log out a user.
     */
    public function delete_all_options(): bool
    {
        if ( !$this->user_can_manage() ) {
            return false;
        }

        global $wpdb;
        $result = $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM $wpdb->options WHERE option_name LIKE %s OR option_name LIKE %s",
                'simplybook_%',
                'simplybookMePl_%'
            )
        );

        return $result !== false;
    }
}
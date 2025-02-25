<?php
namespace Simplybook_old\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * @Rogier maybe move to Admin?
 */
trait Save {
    use Load;
    use Helper;
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
            'widget_settings',
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
     * @return void
     */
    public function update_option($key, $value): void
    {
        if ( !$this->user_can_manage() ) {
			error_log("user cannot manage, exit update_option for $key");
            return;
        }

        //$pass = '7*w$9pumLw5koJc#JT6';
        $options = get_option('simplybook_options', []);
        //sanitize the value
        $field = $this->get_field_by_id($key);

        //don't save if not found
        if ( !$field ) {
            error_log("field ".$key." not found in fields config");
            return;
        }

        $value = $this->sanitize_field($value, $field['type']);
        if ( $field['encrypt'] ) {
            $value = $this->encrypt_string($value);
        }
        $options[$key] = $value;
        update_option('simplybook_options', $options);
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
    public function sanitize_field( $value, $type ) {
        switch ( $type ) {
            case 'checkbox':
            case 'number':
            return (int) $value;
            case 'select':
            case 'text':
            case 'textarea':
                return sanitize_text_field( $value );
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
}
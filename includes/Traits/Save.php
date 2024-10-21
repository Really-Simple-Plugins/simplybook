<?php
namespace Simplybook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

trait Save {
    use Load;
    use Helper;
    /**
     * Get options the old way
     *
     * @deprecated
     * @param $key
     * @param $default
     * @return false|mixed
     */
    public function get_config_obsolete($key, $default = null)
    {
        $pass = '7*w$9pumLw5koJc#JT6';
        $key = 'simplybookMePl_' . $key;
        $value = get_option($key);

        if ( $value === false ) {
            $value = $default;
        } else {
            $decryptedValue = $this->decryptString($value, $pass);

            $unserializedValue = @unserialize($decryptedValue); // Suppress unserialize errors

            if ($unserializedValue !== false) {
                $value = $unserializedValue;
            } else {
                $value = $decryptedValue;
            }
        }

        return $value;
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
            'widget_page_id',
            'widget_page_deleted',
            'domain',
            'auth_datetime',
            'is_auth',
            'auth_data',
            'public_url',
            'cached_keys',
            'flash_messages',
        ];
        foreach ($upgrade_keys as $key) {
            $value = $this->get_config_obsolete($key);
            if ($value !== false) {
                $this->update_option($key, $value);
                delete_option('simplybookMePl_' . $key);
            }
        }
    }

    public function simplybookMePl_addFlashMessage($message, $type = 'error')
    {
        $messages = $this->get_option('flash_messages', array());
        $messages[] = array(
            'message' => $message,
            'type' => $type,
        );
        $this->update_option('flash_messages', $messages);
    }

    public function simplybookMePl_getFlashMessages()
    {
        $messages = $this->get_option('flash_messages', array());
        $this->update_option('flash_messages', array());
        return $messages;
    }

    public function simplybookMePl_clearFlashMessages()
    {
        $this->update_option('flash_messages', array());
    }

    public function encryptString($string, $key){
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = openssl_random_pseudo_bytes($ivLength);

        $encrypted = openssl_encrypt($string, 'AES-256-CBC', $key, 0, $iv);

        return base64_encode($iv . $encrypted);
    }

    public function decryptString($encryptedString, $key): bool|string
    {
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
            return;
        }

        $pass = '7*w$9pumLw5koJc#JT6';
        $options = get_option('simplybook_options', []);
        //sanitize the value
        $field = $this->get_field_by_id($key);

        //don't save if not found
        if ( !$field ) {
            return;
        }

        $value = $this->sanitize_field($value, $field['type']);
        if ( is_array($value) || is_bool($value) || is_object($value) ) {
            $value = serialize($value);
        }

        $value = $this->encryptString($value, $pass);
        $options[$key] = $value;
        update_option('simplybook_options', $options);
    }

    public function update_options( $fields ) {
        foreach ( $fields as $index => $field ) {
            $config_field = $this->get_field_by_id( $field['id'] );
            if ( ! $config_field ) {
                unset( $fields[ $index ] );
                continue;
            }

            $field['value']   = $this->sanitize_field( $field['value'], $config_field['type'] );
            $fields[ $index ] = $field;
        }

        $options = get_option( 'simplybook_options', array() );
        $pass = '7*w$9pumLw5koJc#JT6';

        // build a new options array
        foreach ( $fields as $field ) {
            $field['prev_value'] = isset( $options[ $field['id'] ] ) ? $this->decryptString($options[ $field['id'] ], $pass ) : false;
            do_action( 'simplybook_before_save_option', $field['id'], $field['value'], $field['prev_value'], $field['type'] );
            $options[ $field['id'] ] = $this->encryptString( $field['value'], $pass );
        }

        if ( ! empty( $options ) ) {
            update_option( 'simplybook_options', $options );
        }

        foreach ( $fields as $field ) {
            do_action( 'simplybook_after_save_option', $field['id'], $field['value'], $field['prev_value'], $field['type'] );
        }

        do_action( 'simplybook_after_save_options', $fields );
    }

    public function get_field_by_id( $id ) {
        $fields = $this->fields();
        foreach ( $fields as $field ) {
            if ( $field['id'] === $id ) {
                return $field;
            }
        }
        return false;
    }


    /**
     * Get fields array for the settings
     * @param bool $load_values
     * @return array
     */
    public function fields( bool $load_values = false ): array
    {
        $fields = include( SIMPLYBOOK_PATH . 'includes/Config/fields.php' );
        $fields = apply_filters('simplybook_fields', $fields);

        foreach ( $fields as $key => $field ) {
            $field = wp_parse_args( $field, [
                'id'                 => false,
                'visible'            => true,
                'disabled'           => false,
                'new_features_block' => false,
            ] );

            if ( $load_values ) {
                $value          = $this->sanitize_field( $this->get_option( $field['id'], $field['default'] ), $field['type'] );
                $field['value'] = apply_filters( 'simplybook_field_value_' . $field['id'], $value, $field );
                $fields[ $key ] = apply_filters( 'simplybook_field', $field, $field['id'] );
            }
        }

        $fields = apply_filters( 'simplybook_fields_values', $fields );

        return array_values( $fields );
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
            case 'hidden':
            case 'number':
            return (int) $value;
            case 'select':
            case 'text':
            case 'textarea':
                return sanitize_text_field( $value );
            case 'email':
                return sanitize_email( $value );
            case 'url':
                return esc_url_raw( $value );
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
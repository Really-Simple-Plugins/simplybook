<?php
namespace Simplybook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
trait Load {

    /**
     * Get a field by ID
     * @param string $id
     * @return mixed
     */
    public function get_field_by_id(string $id ): mixed
    {
        $fields = $this->fields();
        foreach ( $fields as $field ) {
            if ( $field['id'] === $id ) {
                return $field;
            }
        }
        return false;
    }

    /**
     * Get option
     *
     * @param string $key
     * @param $default
     * @return false|mixed
     */
    public function get_option(string $key, $default = null)
    {
        global $simplybook_cache;
        if ( !empty($simplybook_cache) ) {
            $options = $simplybook_cache;
        } else {
            $options = get_option('simplybook_options', []);
            $simplybook_cache = $options;
        }

        $value = $options[$key] ?? false;
        if ( $value === false ) {
            $value = $default;
        }

        $field = $this->get_field_by_id($key);
        if ( $field['encrypt'] ) {
            $value = $this->decrypt_string($value);
        }

        if ( $field['type'] === 'checkbox' ) {
            $value = (int) $value;
        }
        return $value;
    }

    /**
     * Decrypt a string
     * @param $encrypted_string
     * @return bool|string
     */
    public function decrypt_string($encrypted_string): bool|string
    {
        $key = '7*w$9pumLw5koJc#JT6';
        $data = base64_decode($encrypted_string);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
    }

    /**
     * Get the widget settings
     *
     * @return array
     */
    public function get_widget_settings(): array
    {
        $fields = $this->get_fields_by_attribute( 'widget_field', true );
        $widget_fields = [];
        foreach ( $fields as $field ) {
            if ( $field['widget_field'] === '/') {
                $widget_fields[ $field['id'] ] = $this->get_option( $field['id'] );
            } else {
                $widget_fields[ $field['widget_field'] ][ $field['id'] ] = $this->get_option( $field['id'] );
            }
        }
        $widget_fields['is_rtl'] = (int) is_rtl();

        if ( !is_array($widget_fields['predefined']) ) {
            $widget_fields['predefined'] = [];
        }

        return $widget_fields;
    }

    /**
     * Get the widget settings
     *
     * @return array
     */
    public function get_api_data(): array
    {
        $fields = $this->get_fields_by_attribute( 'type', 'api' );
        $data = [];
        foreach ( $fields as $field ) {
            $data[ $field['id'] ] = $this->get_option( $field['id'] );
        }

        if ( empty($data['token']) || empty($data['company']) || empty($data['refresh_token']) || empty( $data['domain']) ) {
            return [];
        }

        return $data;
    }

    /**
     * Get array of fields of a specific type. Also loads the values
     *
     * @param string $attribute
     * @param string $attribute_value
     * @return array
     */
    public function get_fields_by_attribute(string $attribute, string $attribute_value ): array
    {
        $fields = $this->fields();
        $fields_of_type = [];
        foreach ( $fields as $field ) {
            if ( !isset( $field[ $attribute ] ) ) {
                continue;
            }
            $fields_of_type[] = $field;
        }
        return $fields_of_type;
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
            $fields[ $key ] = apply_filters( 'simplybook_field', $field, $field['id'] );
        }

        $fields = apply_filters( 'simplybook_fields_values', $fields );

        return array_values( $fields );
    }

}
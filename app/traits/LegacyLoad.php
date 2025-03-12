<?php
namespace SimplyBook\Traits;

use SimplyBook\App;

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

    /**
     * Get a field by ID
     * @param string $id
     * @return array
     */
    public function get_field_by_id(string $id ): array
    {
        $fields = $this->fields();
        foreach ( $fields as $field ) {
            if ( $field['id'] === $id ) {
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
    public function get_option(string $key)
    {
        global $simplybook_cache;
        if ( !empty($simplybook_cache) ) {
            $options = $simplybook_cache;
        } else {
            $options = get_option('simplybook_options', []);
            $simplybook_cache = $options;
        }

        $value = $options[$key] ?? false;

        $field = $this->get_field_by_id($key);
        if ( !$field ) {
            error_log("field $key not found");
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
     * Decrypt a string
     * @param $encrypted_string
     * @return string
     */
    public function decrypt_string($encrypted_string): string
    {
        $key = '7*w$9pumLw5koJc#JT6';
        $data = base64_decode($encrypted_string);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
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
     *
     * @param bool $load_values
     *
     * @return array
     */
    public function fields( bool $load_values = false ): array
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
                $fields[ $key ] = apply_filters( 'simplybook_field', $field, $field['id'] );
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

}
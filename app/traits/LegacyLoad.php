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

    public $counter = 0;

    protected string $newSimplyBookUserDomain = 'wp.simplybook.ovh';

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
     */
    public function get_domain(bool $validate = true)
    {
        return ($this->get_option('domain', $validate) ?: $this->newSimplyBookUserDomain);
    }

}
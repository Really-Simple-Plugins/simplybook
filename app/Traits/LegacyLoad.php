<?php

namespace SimplyBook\Traits;

use SimplyBook\Bootstrap\App;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * todo
 * Give proper name and make it follow Single Responsibility Principle
 */
trait LegacyLoad {
	use HasAllowlistControl;
	use HasEncryption;

	public array $fields = [];
	public bool $values_loaded = false;

    public int $counter = 0;

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
            $value = $this->decryptString($value);
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
     * Get fields array for the settings
     *
     * @param bool $load_values
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
        $fieldsConfig = App::getInstance()->get(GeneralConfig::class)->get('fields');
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
                if ( $load_values && $this->adminAccessAllowed() ) {
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
		$menus = App::getInstance()->get(GeneralConfig::class)->get('menus');
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
     * @throws \LogicException|\ReflectionException For developers - purely
     * indicated that the plugin setup is incorrect. No need to catch this in
     * normal usage.
     */
    public function get_domain(bool $validate = true): string
    {
        $cacheName = 'simplybook_get_domain_legacy_load';
        $cacheValue = wp_cache_get($cacheName, 'simplybook', false, $found);

        if ($found && is_string($cacheValue)) {
            return $cacheValue;
        }

        $savedDomain = $this->get_option('domain', $validate);
        if (!empty($savedDomain)) {
            wp_cache_set($cacheName, $savedDomain, 'simplybook', DAY_IN_SECONDS);
            return $savedDomain;
        }

        $environment = App::getInstance()->get(EnvironmentConfig::class)->get('simplybook.api');
        if (empty($environment['domain'])) {
            throw new \LogicException('SimplyBook domain is not set in the environment.');
        }

        wp_cache_set($cacheName, $environment['domain'], 'simplybook', DAY_IN_SECONDS);
        return $environment['domain'];
    }

}

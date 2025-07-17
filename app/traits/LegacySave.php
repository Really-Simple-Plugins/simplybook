<?php
namespace SimplyBook\Traits;
use SimplyBook\Helpers\Event;

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

    /**
     * This method upgrades the legacy options from version 2.3 to the new
     * format for the 3.0.0 version.
     * @since 3.0.0
     */
    public function upgrade_legacy_options(): void
    {
        $upgrade_keys = [
            'auth_data',
            'auth_datetime',
            'is_auth',
            'api_status',
            'domain',
            'is_auth_ne',
            'flash_messages',
            'widget_page_id',
            'widget_page_deleted',
            'cached_keys',
            'public_url',
            'stop_promotions',
        ];

        foreach ($upgrade_keys as $key) {

            $value = $this->get_config_obsolete($key);

            switch ($key) {
                case 'is_auth' :

                    if ($value === true) {
                        update_option('simplybook_onboarding_completed', true);
                        update_option('simplybook_completed_step', '5');
                    }
                    break;

                case 'api_status' :
                    update_option('simplybook_api_status', $value);
                    break;

                case 'widget_page_id' :
                    if (!empty($value)) {
                        Event::dispatch(Event::CALENDAR_PUBLISHED);
                    }
                    break;

                case 'domain' :
                    $this->update_option('domain', ($value ?: 'simplybook.me'), true, [
                        'type' => 'hidden',
                    ]);
                    break;

                case 'auth_data' :
                    $this->upgradeAuthData($value);
                    break;

                default :
                    break;
            }

            delete_option('simplybookMePl_' . $key);
        }
    }

    /**
     * This method VERY specifically upgrades the auth_data array from the
     * legacy 2.3 version to the new 3.0 version. Never use it after.
     * @param mixed $authData
     * @since 3.0.0
     */
    private function upgradeAuthData($authData): void
    {
        if (!is_array($authData)) {
            return;
        }

        if (!empty($authData['token'])) {
            $this->update_token($authData['token'], 'admin');
        }

        if (!empty($authData['refresh_token'])) {
            $this->update_token($authData['refresh_token'], 'admin', true);
        }

        if (!empty($authData['login'])) {
            $this->update_option('email', $authData['login'], true, [
                'type' => 'hidden',
            ]);
        }

        if (!empty($authData['company'])) {
            update_option('simplybook_company_login', sanitize_text_field($authData['company']), false);
        }

        if (!empty($authData['refresh_time'])) {
            $refreshExpiration = ((int) $authData['refresh_time'] + 3600);
            update_option('simplybook_refresh_company_token_expiration', $refreshExpiration, false);
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
     * @param bool $staleOverride Flag to indicate that you as a developer knows
     * that the field is stale, and you want to save it anyway. This is used
     * in the onboarding process for example. If false, stale fields
     * will not be saved.
     * @param array $config Use this to pass the field config, if empty the
     * method will try to get the field from the config automatically. NOTE:
     * this loads translations as well and can trigger the "jit" error.
     * @return bool
     */
    public function update_option($key, $value, bool $staleOverride = false, array $config = []): bool
    {
        if ( !$this->user_can_manage() ) {
            return false;
        }

        // Abort if the setting is marked as stale
        if (in_array($key, $this->staleFields, true) && ($staleOverride === false)) {
            return false;
        }

        //$pass = '7*w$9pumLw5koJc#JT6';
        $options = get_option('simplybook_options', []);
        //sanitize the value

        if (empty($config)) {
            //todo - parsing all fields like this for each save is quite heavy just to know the type
            // todo - also this is redundant when used as in the OnboardingService
            // todo - it IS the only way to get the field now as I nested the fields in its own group with the groupname equal to the filename
            $config = $this->get_field_by_id($key);

            //don't save if not found
            if ( !$config ) {
                return false;
            }
        }

        // todo - usage of sanitize_field is redundant when used as in the OnboardingService
        $value = $this->sanitize_field($value, $config['type'], ($config['regex'] ?? null));

        // todo - except for the encryption fields, maybe we can create a getEncrypted method in the Storage class?
        if ($config['encrypt'] ?? false) {
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
     *
     * Direct query necessary due to lack of WordPress API support for this operation.
     *
     * @param bool $private Can be used to delete private options too.
     */
    public function delete_all_options(bool $private = false): bool
    {
        if ( !$this->user_can_manage() ) {
            return false;
        }

        global $wpdb;
        $query = "DELETE FROM $wpdb->options WHERE option_name LIKE %s OR option_name LIKE %s";
        $params = ['simplybook_%', 'simplybookMePl_%'];

        if ($private) {
            $query .= " OR option_name LIKE %s";
            $params[] = '_simplybook_%';
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
        $result = $wpdb->query(
            // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
            $wpdb->prepare($query, ...$params)
        );

        // Make sure deleted options are not cached
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }

        return $result !== false;
    }
}
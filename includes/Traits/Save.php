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
        if ( is_array($value) || is_bool($value) || is_object($value) ) {
            $value = serialize($value);
        }

        $value = $this->encryptString($value, $pass);
        $options[$key] = $value;
        update_option('simplybook_options', $options);
    }
}
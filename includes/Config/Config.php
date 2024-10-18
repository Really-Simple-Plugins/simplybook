<?php
namespace Simplybook\Config;

/**
 * Config
 *
 * @since   3.0
 *
 */
Class Config {
    protected array $cache = array();
    public function simplybookMePl_setConfig($key, $value){

        $pass = '7*w$9pumLw5koJc#JT6';
        $key = 'simplybookMePl_' . $key;

        if (is_array($value) || is_bool($value) || is_object($value)) {
            $value = serialize($value);
        }

        $value = simplybookMePl_encryptString($value, $pass);
        update_option($key, $value);

        // Оновлення кешу
        $this->cache[$key] = $value;
    }

    public function simplybookMePl_getConfig($key, $default = null)
    {
        if (isset($this->cache[$key])) {
            // Use cached value if available
            $value = $this->cache[$key];
        } else {
            $pass = '7*w$9pumLw5koJc#JT6';
            $key = 'simplybookMePl_' . $key;
            $value = get_option($key);

            if ( $value === false ) {
                $value = $default;
            } else {
                $decryptedValue = simplybookMePl_decryptString($value, $pass);

                $unserializedValue = @unserialize($decryptedValue); // Suppress unserialize errors

                if ($unserializedValue !== false) {
                    $value = $unserializedValue;
                } else {
                    $value = $decryptedValue;
                }
            }

            // Кешувати отримане значення
            $this->cache[$key] = $value;
        }

        return $value;
    }


    public function simplybookMePl_setConfig($key, $value){

        $pass = '7*w$9pumLw5koJc#JT6';
        $key = 'simplybookMePl_' . $key;

        if (is_array($value) || is_bool($value) || is_object($value)) {
            $value = serialize($value);
        }

        $value = simplybookMePl_encryptString($value, $pass);
        update_option($key, $value);

        $this->cache[$key] = $value;
    }
}

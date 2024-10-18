<?php
namespace Simplybook\Traits;
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
trait Load {
    /**
     * Get option
     *
     * @param string $key
     * @param $default
     * @return false|mixed
     */
    public function get_option($key, $default = null)
    {
        global $simplybook_cache;
        error_log("check value of cached global ");
        error_log(print_r($simplybook_cache, true));
        if (isset($simplybook_cache[$key])) {
            // Use cached value if available
            $value = $simplybook_cache[$key];
        } else {
            $options = get_option('simplybook_options', []);
            $pass = '7*w$9pumLw5koJc#JT6';
            $value = $options[$key] ?? false;

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

            $simplybook_cache[$key] = $value;
        }

        return $value;
    }
}
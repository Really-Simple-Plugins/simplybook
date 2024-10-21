<?php
namespace Simplybook\Frontend\Traits;
use Simplybook\Api\Api;
use Simplybook\Traits\Load;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 *
 * @since   3.0
 *
 */
trait Frontend {
    use Load;

    /**
     * @param $atts
     * @param $content
     * @param $tag
     * @return string
     */
    public function load_widget($atts = [], $content = null, $tag = ''): string
    {
        wp_register_script('simplybook_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
        wp_enqueue_script('simplybook_widget_scripts');

        // normalize attribute keys, lowercase
        $atts = array_change_key_case( (array) $atts, CASE_LOWER );
        $atts = $this->sanitize_attributes($atts);

        $content = '<div id="sbw_z0hg2i"></div>';
//        try {
            $script = $this->get_widget($atts);
//        } catch (SimplybookMePl_Exception $e) {
//            $content .= wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
//            return $content;
//        }
        $content .= sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }

    /**
     * Sanitize an array of attributes
     *
     * @param array $attributes
     * @return array
     */
    public function sanitize_attributes(array $attributes): array
    {
        $sanitized_attributes = [];
        foreach ($attributes as $attribute) {
            $sanitized_attributes[] = $this->sanitize_attribute($attribute);
        }
        return array_unique( $sanitized_attributes );
    }

    /**
     * Sanitize the attribute
     *
     * @param string $attribute
     * @return string
     */
    public function sanitize_attribute(string $attribute ): string
    {
        $allowed_attributes = array('location', 'category', 'provider', 'service');
        return in_array($attribute, $allowed_attributes) ? $attribute : 'location';
    }

    /**
     * Get the widget
     *
     * @param array $atts
     * @return string
     */
    public function get_widget(array $atts = array()): string
    {
        $auth = new Api();

        $data = array(
            'is_auth' => $auth->isAuthorized(),
            'auth_data' => $auth->getAuthData(),
            'nonce' => wp_create_nonce('simplybook_nonce'),
        );

        $widgetSettings = $this->get_option('widget_settings');
        if(!$widgetSettings){
            $widgetSettings = array();
        }

        //check if attributes are set
        if(count($atts)){
            $atts = array_map('sanitize_text_field', $atts);
            $predefinedAttsKeys = array('location', 'category', 'provider', 'service');
            //create new array with predefined attributes from $atts
            $predefinedAtts = array();
            foreach ($predefinedAttsKeys as $key) {
                if(isset($atts[$key])){
                    $predefinedAtts[$key] = $atts[$key];
                }
            }
            if(!isset($postSettings['predefined'])){
                $postSettings['predefined'] = array();
            }
            $postSettings['predefined'] = array_merge(!is_array($postSettings['predefined']) ? array() : $postSettings['predefined'], $predefinedAtts);
        }

        if(!$postSettings){
            $postSettings = array();
        }

        $widgetSettings = array_merge($widgetSettings, $postSettings);

        if( $widgetSettings ) {
            foreach ($widgetSettings as $key => $value) {
                $data[$key] = $value;
            }
        }

       $script = $this->load_template('widget.js', $data);
       return '<script>' . $script . '</script>';
    }

    /**
     * @param string $template
     * @param array $data
     * @return string
     */
    public function load_template(string $template, array $data = array() ): string
    {
        ob_start();
        include SIMPLYBOOK_PATH . 'Frontend/templates/' . $template;

        $content = ob_get_clean();

        //replace variables
        foreach ( $data as $key => $value ) {
            $content = str_replace( '{{' . $key . '}}', $value, $content );
        }
        return $content;
    }

}

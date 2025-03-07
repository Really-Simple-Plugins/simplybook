<?php

namespace SimplyBook\Traits;

use Simplybook_old\Traits\Load;

trait HasWidgets
{
    use Load;

    public function enqueueRemoteSimplybookWidgetScript() {
        wp_enqueue_script('simplybook_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
        wp_enqueue_script('simplybook_widget_scripts');
    }

    /**
     * Sanitize an array of attributes
     *
     * @param array $attributes
     * @return array
     */
    public function sanitizeAttributes(array $attributes): array
    {
        $sanitized_attributes = [];
        foreach ($attributes as $attribute) {
            $sanitized_attributes[] = $this->sanitizeAttribute($attribute);
        }
        return array_unique( $sanitized_attributes );
    }

    /**
     * Sanitize the attribute
     *
     * @param string $attribute
     * @return string
     */
    public function sanitizeAttribute(string $attribute ): string
    {
        $allowed_attributes = array('location', 'category', 'provider', 'service');
        return in_array($attribute, $allowed_attributes) ? $attribute : 'location';
    }

    /**
     * Get the server URL
     *
     * @return string
     */
    public function getServerURL(): string {
        $domain = $this->get_option('domain');
        $login = get_option('simplybook_company_login', '');
        return "https://$login.$domain";
    }

    /**
     * Get the widget
     * @param string $type
     * @param array $atts
     * @return string
     */
    public function getWidget( $type = 'calendar', array $atts = [] ): string
    {
        $post_settings = [];
        $data = [];

        $widget_settings = $this->get_widget_settings();
        $widget_settings['server'] = $this->getServerURL();
        if ( !$widget_settings ) {
            $widget_settings = array();
        }

        $widget_settings = wp_parse_args($widget_settings, $data);

        //check if attributes are set
        if ( count($atts) ) {
            $atts = array_map('sanitize_text_field', $atts);
            $predefinedAttsKeys = array('location', 'category', 'provider', 'service');
            //create new array with predefined attributes from $atts
            $predefinedAtts = array();
            foreach ($predefinedAttsKeys as $key) {
                if ( isset($atts[$key]) ) {
                    $predefinedAtts[$key] = $atts[$key];
                }
            }

            $post_settings['predefined'] = $predefinedAtts;
        }

        $widget_settings = wp_parse_args($post_settings, $widget_settings);

        $types = ['calendar', 'booking-button', 'reviews'];
        $type = in_array($type, $types) ? $type : 'calendar';
        $script = $this->loadTemplate("$type.js", $widget_settings);
        return $script;
    }

    /**
     * @param string $template
     * @param array $data
     * @return string
     */
    public function loadTemplate(string $template, array $data = array() ): string
    {
        ob_start();
        include SIMPLYBOOK_PATH . 'includes/Frontend/templates/' . $template;

        $content = ob_get_clean();
        //replace variables
        foreach ( $data as $key => $value ) {
            if ( is_array($value) ) {
                $value = json_encode($value);
            }
            if (empty($value)) {
                $value = '';
            }
            $content = str_replace( '{{ ' . $key . ' }}', $value, $content );
        }

        return $content;
    }
}
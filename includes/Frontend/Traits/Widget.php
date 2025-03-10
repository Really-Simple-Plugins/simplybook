<?php
namespace Simplybook_old\Frontend\Traits;
use Simplybook_old\Traits\Load;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Trait admin helper
 *
 * @since   3.0
 * @deprecated Use {@see \SimplyBook\Builders\WidgetScriptBuilder} instead.
 */
trait Widget {
    use Load;

    /**
     * @param array $atts
     * @param $content
     * @param $tag
     * @return string
     */
    public function calendar_widget($atts = [], $content = null, $tag = ''): string
    {
	    $this->enqueue_simplybook_widget_scripts();

        // normalize attribute keys, lowercase
        $atts = array_change_key_case( (array) $atts, CASE_LOWER );
        $atts = $this->sanitize_attributes($atts);

        $content = '<div id="sbw_z0hg2i"></div>';
        $script = $this->get_widget('calendar', $atts);
        $content .= sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }

	/**
	 * @param $atts
	 * @param $content
	 * @param $tag
	 * @return string
	 */
	public function reviews_widget($atts = [], $content = null, $tag = ''): string
	{
		$this->enqueue_simplybook_widget_scripts();

		$atts = array_change_key_case( (array) $atts, CASE_LOWER );
		$atts = $this->sanitize_attributes($atts);

		$script = $this->get_widget('reviews', $atts);
		$content = sprintf('<script type="text/javascript">%s</script>', $script);
		return $content;
	}

	/**
	 * @param $atts
	 * @param $content
	 * @param $tag
	 * @return string
	 */
	public function booking_button($atts = [], $content = null, $tag = ''): string
	{
		$this->enqueue_simplybook_widget_scripts();

		$atts = array_change_key_case( (array) $atts, CASE_LOWER );
		$atts = $this->sanitize_attributes($atts);

		$script = $this->get_widget('booking-button', $atts);
		$content = sprintf('<script type="text/javascript">%s</script>', $script);
		return $content;
	}


	public function enqueue_simplybook_widget_scripts() {
		wp_register_script('simplybook_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
		wp_enqueue_script('simplybook_widget_scripts');
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
	 * Get the server URL
	 *
	 * @return string
	 */
	public function get_server(): string {
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
    public function get_widget( $type = 'calendar', array $atts = [] ): string
    {
        $post_settings = [];
        $data = [];

        $widget_settings = $this->get_widget_settings();
	    $widget_settings['server'] = $this->get_server();
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
        $script = $this->load_template("$type.js", $widget_settings);
        return $script;
    }

    /**
     * @param string $template
     * @param array $data
     * @return string
     */
    public function load_template(string $template, array $data = array() ): string
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
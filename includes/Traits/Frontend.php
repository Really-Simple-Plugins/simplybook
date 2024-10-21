<?php
namespace Simplybook\Traits;
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
        try {
            $script = simplybookMePl_Widget($atts);
        } catch (SimplybookMePl_Exception $e) {
            $content .= wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
            return $content;
        }
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

}

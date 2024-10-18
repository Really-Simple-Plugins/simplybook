<?php
namespace Simplybook\Frontend\Shortcodes;

use Simplybook\Shortcodes\SimplybookMePl_Exception;
use Simplybook\Traits\Helper;
use function Simplybook\Shortcodes\simplybookMePl_Widget;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Shortcodes {
    use Helper;

    public function __construct() {
        add_shortcode( 'simplybook_widget', array( $this, 'load_widget' ) );

    }

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


}

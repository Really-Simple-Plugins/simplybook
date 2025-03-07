<?php
namespace SimplyBook\App\Controllers;

use Simplybook_old\Traits\Load;
use SimplyBook\Traits\HasWidgets;
use Simplybook_old\Frontend\Blocks\Blocks;
use SimplyBook\Interfaces\ControllerInterface;

class FrontendController implements ControllerInterface
{
    use Load;
    use HasWidgets;

    public function register()
    {
        ( new Blocks() );

        add_shortcode('simplybook_widget', [$this, 'calendar_widget']);
        add_shortcode('simplybook_reviews', [$this, 'reviews_widget']);
        add_shortcode('simplybook_booking_button', [$this, 'booking_button']);
    }

    /**
     */
    public function calendar_widget(array $atts = [], $content = null, $tag = ''): string
    {
        $this->enqueueRemoteSimplybookWidgetScript();

        // normalize attribute keys, lowercase
        $atts = array_change_key_case( (array) $atts, CASE_LOWER );
        $atts = $this->sanitizeAttributes($atts);

        $content = '<div id="sbw_z0hg2i"></div>';
        $script = $this->getWidget('calendar', $atts);
        $content .= sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }

    /**
     */
    public function reviews_widget($atts = [], $content = null, $tag = ''): string
    {
        $this->enqueueRemoteSimplybookWidgetScript();

        $atts = array_change_key_case( (array) $atts, CASE_LOWER );
        $atts = $this->sanitizeAttributes($atts);

        $script = $this->getWidget('reviews', $atts);
        $content = sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }

    /**
     */
    public function booking_button($atts = [], $content = null, $tag = ''): string
    {
        $this->enqueueRemoteSimplybookWidgetScript();

        $atts = array_change_key_case( (array) $atts, CASE_LOWER );
        $atts = $this->sanitizeAttributes($atts);

        $script = $this->getWidget('booking-button', $atts);
        $content = sprintf('<script type="text/javascript">%s</script>', $script);
        return $content;
    }
}
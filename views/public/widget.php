<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * @var string $wrapperID
 * @var string $config JSON encoded widget configuration
 */
?>
<div id="<?php echo esc_attr($wrapperID); ?>" class="simplybook-widget" data-config="<?php echo esc_attr($config); ?>"></div>

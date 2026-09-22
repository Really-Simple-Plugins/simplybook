<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * @var string $id
 * @var string $config JSON encoded widget configuration
 */
?>
<div id="<?php echo esc_attr($id); ?>" class="simplybook-widget" data-config="<?php echo esc_attr($config); ?>"></div>

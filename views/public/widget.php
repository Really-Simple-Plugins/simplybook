<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $config */
?>

function instantiateSimplyBookWidget() {
    new SimplybookWidget(<?php echo wp_json_encode($config, (JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT)); ?>);
}

document.addEventListener("DOMContentLoaded", instantiateSimplyBookWidget);
document.addEventListener("loadSimplyBookPreviewWidget", instantiateSimplyBookWidget);

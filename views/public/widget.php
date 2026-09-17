<?php
if (!defined('ABSPATH')) {
    exit;
}

/** @var string $config */
?>

function instantiateSimplyBookWidget() {
    new SimplybookWidget(<?php echo $config; ?>);
}

document.addEventListener("DOMContentLoaded", instantiateSimplyBookWidget);
document.addEventListener("loadSimplyBookPreviewWidget", instantiateSimplyBookWidget);

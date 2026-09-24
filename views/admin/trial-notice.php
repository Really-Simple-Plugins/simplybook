<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $message
 * @var string $plansPricesUrl
 */
?>

<div id="message" class="notice notice-warning is-dismissible rsp-trial simplybook-notice" data-notice-id="trial">
    <div class="rsp-container">
        <div class="rsp-notice-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="simplybook-logo"></div>
        <div class="rsp-notice-content">
            <?php echo wp_kses_post(wpautop($message)); ?>
            <div class="rsp-buttons-row">
                <a
                    class="button button-primary"
                    href="<?php echo esc_url($plansPricesUrl); ?>"
                >
                    <?php esc_html_e('Choose your plan', 'simplybook'); ?>
                </a>
                <div class="dashicons dashicons-calendar"></div>
                <button type="button" class="rsp-link" data-notice-action="snooze">
                    <?php esc_html_e('Remind me later', 'simplybook'); ?>
                </button>
                <div class="dashicons dashicons-no-alt"></div>
                <button type="button" class="rsp-link" data-notice-action="dismiss">
                    <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
                </button>
            </div>
        </div>
    </div>
</div>

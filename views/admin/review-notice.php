<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $reviewUrl
 * @var string $reviewMessage
 */
?>

<div id="message" class="updated fade notice is-dismissible rsp-review simplybook-notice" data-notice-id="review">
    <div class="rsp-container">
        <div class="rsp-notice-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="review-logo"></div>
        <div class="rsp-notice-content">
            <?php echo wp_kses_post(wpautop($reviewMessage)); ?>
            <div class="rsp-buttons-row">
                <a class="button button-primary" target="_blank" rel="noopener noreferrer" href="<?php echo esc_url($reviewUrl); ?>">
                    <?php esc_html_e('Leave a review', 'simplybook'); ?>
                </a>
                <div class="dashicons dashicons-calendar"></div>
                <button type="button" class="rsp-link" data-notice-action="snooze">
                    <?php esc_html_e('Maybe later', 'simplybook'); ?>
                </button>
                <div class="dashicons dashicons-no-alt"></div>
                <button type="button" class="rsp-link" data-notice-action="dismiss">
                    <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
                </button>
            </div>
        </div>
    </div>
</div>
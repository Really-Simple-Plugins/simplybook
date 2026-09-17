<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $onboardingUrl
 * @var string $noticeMessage
 */
?>

<div id="message" class="updated fade notice is-dismissible rsp-complete-onboarding simplybook-notice" data-notice-id="complete_onboarding">
    <div class="rsp-container">
        <div class="rsp-notice-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="notice-logo"></div>
        <div class="rsp-notice-content">
            <?php echo wp_kses_post(wpautop($noticeMessage)); ?>
            <div class="rsp-buttons-row">
                <a class="button button-primary" href="<?php echo esc_url($onboardingUrl); ?>">
                    <?php esc_html_e('Complete onboarding', 'simplybook'); ?>
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
<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $onboardingUrl
 * @var string $noticeMessage
 * @var string $completeOnboardingAction
 * @var string $completeOnboardingNonceName
 */
?>

<style>
    .toplevel_page_simplybook-integration .rsp-complete-onboarding {
        margin: 16px;
    }
    .rsp-complete-onboarding {
        border-left:4px solid #333
    }
    .rsp-complete-onboarding .rsp-container {
        display: flex;
        padding:12px;
    }
    .rsp-complete-onboarding .rsp-container .dashicons {
        margin-right:5px;
        margin-left:15px;
    }
    .rsp-complete-onboarding .rsp-complete-onboarding-image {
        width: 80px;
        height: 80px;
    }
    .rsp-complete-onboarding .rsp-complete-onboarding-image img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
    .rsp-complete-onboarding .rsp-buttons-row {
        margin-top:10px;
        display: flex;
        align-items: center;
    }
    .rsp-complete-onboarding .rsp-complete-onboarding-form {
        margin-left: 30px;
    }
    .rsp-complete-onboarding .rsp-complete-onboarding-form button.link {
        background: none;
        border: none;
        color: #2271b1;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
    }
    <?php if (is_rtl()): ?>
    .rsp-complete-onboarding .rsp-container .dashicons {
        margin-left:5px;
        margin-right:15px;
    }
    .rsp-complete-onboarding {
        border-left: 0;
        border-right: 4px solid #333;
    }
    <?php endif; ?>
</style>

<div id="message" class="updated fade notice is-dismissible rsp-complete-onboarding really-simple-plugins" data-notice-type="complete_onboarding">
    <div class="rsp-container">
        <div class="rsp-complete-onboarding-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="notice-logo"></div>
        <form class="rsp-complete-onboarding-form" action="" method="POST">
            <?php wp_nonce_field($completeOnboardingAction, $completeOnboardingNonceName); ?>
            <input type="hidden" name="rsp_complete_onboarding_notice_form" value="1">
            <?php echo wp_kses_post(wpautop($noticeMessage)); ?>
            <div class="rsp-buttons-row">
                <a class="button button-primary" href="<?php echo esc_url($onboardingUrl); ?>">
                    <?php esc_html_e('Complete onboarding', 'simplybook'); ?>
                </a>
                <div class="dashicons dashicons-calendar"></div>
                <button type="submit" class="link" name="rsp_onboarding_notice_choice" value="later">
                    <?php esc_html_e('Remind me later later', 'simplybook'); ?>
                </button>
                <div class="dashicons dashicons-no-alt"></div>
                <button type="submit" class="link" name="rsp_onboarding_notice_choice" value="never">
                    <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
                </button>
            </div>
        </form>
    </div>
</div>
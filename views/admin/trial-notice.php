<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $message
 * @var string $plansPricesUrl
 */
?>

<style>
    .toplevel_page_simplybook-integration .rsp-trial {
        margin: 16px;
    }
    .rsp-trial {
        border-left:4px solid #d63638
    }
    .rsp-trial .rsp-container {
        display: flex;
        padding:12px;
    }
    .rsp-trial .rsp-trial-image {
        width: 80px;
        height: 80px;
    }
    .rsp-trial .rsp-trial-image img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
    .rsp-trial .rsp-buttons-row {
        margin-top:10px;
        display: flex;
        align-items: center;
    }
    .rsp-trial .rsp-container .dashicons {
        margin-right:5px;
        margin-left:15px;
    }
    .rsp-trial .rsp-trial-form button.rsp-link {
        background: none;
        border: none;
        color: #2271b1;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
    }
    .rsp-trial .rsp-trial-content {
        margin-left: 30px;
    }
    <?php if (is_rtl()) : ?>
         .rsp-trial .rsp-container .dashicons {
             margin-left:5px;
             margin-right:15px;
         }
         .rsp-trial .rsp-trial-content {
             margin-left:0;
             margin-right:30px;
         }
        .rsp-trial {
            border-left: 0;
            border-right: 4px solid #d63638;
        }
    <?php endif; ?>
</style>

<div id="message" class="notice notice-warning is-dismissible rsp-trial simplybook-notice" data-notice-id="trial">
    <div class="rsp-container">
        <div class="rsp-trial-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="simplybook-logo"></div>
        <div class="rsp-trial-content rsp-trial-form">
            <?php echo wp_kses_post(wpautop($message)); ?>
            <div class="rsp-buttons-row">
                <a
                    class="button button-primary"
                    href="<?php echo esc_url($plansPricesUrl); ?>"
                >
                    <?php esc_html_e('Discover plans', 'simplybook'); ?>
                </a>
                <div class="dashicons dashicons-calendar"></div>
                <button type="button" class="rsp-link" data-notice-action="snooze">
                    <?php esc_html_e('Remind me tomorrow', 'simplybook'); ?>
                </button>
                <div class="dashicons dashicons-no-alt"></div>
                <button type="button" class="rsp-link" data-notice-action="dismiss">
                    <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
                </button>
            </div>
        </div>
    </div>
</div>

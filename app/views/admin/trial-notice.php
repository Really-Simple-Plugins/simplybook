<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $message
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
    }
    .rsp-trial .rsp-trial-content {
        margin-left: 30px;
    }
    <?php if (is_rtl()): ?>
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

<div id="message" class="notice notice-warning is-dismissible rsp-trial really-simple-plugins" data-notice-type="trial">
    <div class="rsp-container">
        <div class="rsp-trial-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="simplybook-logo"></div>
        <div class="rsp-trial-content">
            <?php echo wp_kses_post(wpautop($message)); ?>
            <div class="rsp-buttons-row">
                <a
                    class="button button-primary"
                    href="#"
                    data-sso-path="v2/r/payment-widget#"
                    data-loading-text="<?php echo esc_attr(__('Redirecting..', 'simplybook')); ?>"
                >
                    <?php esc_html_e('Discover plans', 'simplybook'); ?>
                </a>
            </div>
        </div>
    </div>
</div>
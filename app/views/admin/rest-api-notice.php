<?php
/**
 * Variables that should be passed to the view
 * @var string $restApiMessage
 * @var string $restApiAction
 * @var string $restApiNonceName
 */
?>

<style>
    .toplevel_page_simplybook-integration .simplybook-rest-api-notice {
        margin: 16px;
    }
    .simplybook-rest-api-notice {
        border-left:4px solid #333
    }
    .simplybook-rest-api-notice .rsp-container {
        display: flex;
        padding: 8px 0;
    }
    .simplybook-rest-api-notice .rsp-container p{
        margin: 0px;
    }
    .simplybook-rest-api-notice .simplybook-rest-api-notice-form {
        display: flex;
        gap: 10px;
    }
    .simplybook-rest-api-notice .simplybook-rest-api-notice-form button.link {
        background: none;
        border: none;
        color: #2271b1;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
    }
    <?php if (is_rtl()): ?>
    .simplybook-rest-api-notice {
        border-left: 0;
        border-right: 4px solid #333;
    }
    <?php endif; ?>
</style>

<div id="message" class="error fade notice simplybook-rest-api-notice really-simple-plugins">
    <div class="rsp-container">
        <form class="simplybook-rest-api-notice-form" action="" method="POST">
            <?php wp_nonce_field($restApiAction, $restApiNonceName); ?>
            <input type="hidden" name="simplybook_rest_api_notice_form" value="1">
            <?php echo wp_kses_post(wpautop($restApiMessage)); ?>
            <button type="submit" class="link">
                <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
            </button>
        </form>
    </div>
</div>
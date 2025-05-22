<?php
/**
 * Variables that should be passed to the view
 * @var string $logoUrl
 * @var string $reviewUrl
 * @var string $reviewMessage
 * @var string $reviewAction
 * @var string $reviewNonceName
 */
?>

<style>
    .toplevel_page_simplybook-integration .rsp-review {
        margin: 16px;
    }
    .rsp-review {
        border-left:4px solid #333
    }
    .rsp-review .rsp-container {
        display: flex;
        padding:12px;
    }
    .rsp-review .rsp-container .dashicons {
        margin-right:5px;
        margin-left:15px;
    }
    .rsp-review .rsp-review-image {
        width: 80px;
        height: 80px;
    }
    .rsp-review .rsp-review-image img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
    .rsp-review .rsp-buttons-row {
        margin-top:10px;
        display: flex;
        align-items: center;
    }
    .rsp-review .rsp-review-form {
        margin-left: 30px;
    }
    .rsp-review .rsp-review-form button.link {
        background: none;
        border: none;
        color: #2271b1;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
        font-size: inherit;
    }
    <?php if (is_rtl()): ?>
         .rsp-review .rsp-container .dashicons {
             margin-left:5px;
             margin-right:15px;
         }
        .rsp-review {
            border-left: 0;
            border-right: 4px solid #333;
        }
    <?php endif; ?>
</style>

<div id="message" class="updated fade notice is-dismissible rsp-review really-simple-plugins">
    <div class="rsp-container">
        <div class="rsp-review-image"><img src="<?php echo esc_url($logoUrl); ?>" alt="review-logo"></div>
        <form class="rsp-review-form" action="" method="POST">
            <?php wp_nonce_field($reviewAction, $reviewNonceName); ?>
            <input type="hidden" name="rsp_review_form" value="1">
            <?php echo wp_kses_post(wpautop($reviewMessage)); ?>
            <div class="rsp-buttons-row">
                <a class="button button-primary" target="_blank" rel="noopener noreferrer" href="<?php echo esc_url($reviewUrl); ?>">
                    <?php esc_html_e('Leave a review', 'simplybook'); ?>
                </a>
                <div class="dashicons dashicons-calendar"></div>
                <button type="submit" class="link" name="rsp_review_choice" value="later">
                    <?php esc_html_e('Maybe later', 'simplybook'); ?>
                </button>
                <div class="dashicons dashicons-no-alt"></div>
                <button type="submit" class="link" name="rsp_review_choice" value="never">
                    <?php esc_html_e('Don\'t show again', 'simplybook'); ?>
                </button>
            </div>
        </form>
    </div>
</div>
<?php
/**
 * @var string $title
 * @var string $message
 */
?>

<div class="alert-container">
    <div class="alert alert-danger" style="font-size: 16px; color: #721c24;background-color: #f8d7da;border-color: #f5c6cb; padding: 20px; border-radius: 5px;">
        <strong><?php echo esc_html($title); ?>:</strong>
        <?php echo wp_kses_post($message); ?>
    </div>
</div>
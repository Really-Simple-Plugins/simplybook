<?php
/**
 * @var string $widgetContent
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="no-referrer">
    <title><?php echo esc_html__('SimplyBook.me widget preview', 'simplybook'); ?></title>
    <style>
        html,
        body {
            min-height: 100%;
            margin: 0;
            background: #fff;
        }

        body {
            box-sizing: border-box;
            padding: 16px;
        }
    </style>
    <?php wp_print_scripts(); ?>
</head>
<body>
    <?php
    // The builder sanitizes and JSON-encodes all values embedded in this markup.
    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $widgetContent;
    ?>
</body>
</html>

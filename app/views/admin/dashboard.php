<?php
/**
 * Expected PHP variables that should be passed through the render() method:
 * @var string $logoUrl
 * @var array $navigation
 */
?>
<div id="simplybook_app" style="font-size:16px;">
    <?php echo $this->render('admin/skeleton', compact('logoUrl', 'navigation')); ?>
</div>
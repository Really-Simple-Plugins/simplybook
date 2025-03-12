<?php
/**
 * Expected PHP variables that should be passed through the render() method:
 * @var string $logoUrl
 * @var array $navigation
 */
?>
<div id="simplybook_app">
    <?php echo $this->render('admin/skeleton', compact('logoUrl', 'navigation')); ?>
</div>
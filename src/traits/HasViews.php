<?php namespace SimplyBook\Traits;

use SimplyBook\App;

trait HasViews
{
    /**
     * Method for returning the desired view
     */
    public function render(string $path, array $variables = [], string $extension = 'php'): void
    {
        $filePath = App::env('plugin.view_path') . $path . '.' . $extension;

        if (empty($filePath)) echo '';

        extract($variables);

        ob_start();
        require $filePath;
        echo ob_get_clean();
    }

}
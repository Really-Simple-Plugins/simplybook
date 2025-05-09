<?php namespace SimplyBook\Traits;

use SimplyBook\App;

trait HasViews
{
    /**
     * Method for returning the desired view as a string
     */
    public function view(string $path, array $variables = [], string $extension = 'php'): string
    {
        $filePath = App::env('plugin.view_path') . $path . '.' . $extension;

        if (empty($filePath)) return '';

        extract($variables);

        ob_start();
        require $filePath;
        return ob_get_clean();
    }


    /**
     * Method for outputting the desired view
     */
    public function render(string $path, array $variables = [], string $extension = 'php'): void
    {
        echo $this->view($path, $variables, $extension);
    }

}
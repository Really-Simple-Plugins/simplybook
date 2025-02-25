<?php
namespace SimplyBook\App;

use Simplybook_old\Admin\Tasks\Tasks;
use SimplyBook\Interfaces\ControllerInterface;

/**
 * todo
 * Is this a TaskFeature? Where we can add the Task class as a TaskService
 * dependency via the constructor?
 */
class TaskController implements ControllerInterface
{
    public function register()
    {
        add_action('simplybook_activation', [$this, 'handlePluginActivation']);
        add_action('simplybook_daily', [$this, 'updateTasks']);
    }

    public function handlePluginActivation()
    {
        $tasks = new Tasks();
        $tasks->add_initial_tasks();
    }

    /**
     * On a daily basis, update the task options
     */
    public function updateTasks(): void
    {
        $tasks = new Tasks();
        $tasks_data = $tasks->get_raw_tasks();

        // todo, is this a completed method?
    }
}
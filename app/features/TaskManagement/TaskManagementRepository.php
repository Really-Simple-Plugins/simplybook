<?php
namespace SimplyBook\Features\TaskManagement;

use SimplyBook\Services\TaskService;
use SimplyBook\Interfaces\TaskInterface;

class TaskManagementRepository
{
     /** @var TaskInterface[] */
     private array $tasks = [];

     public function __construct()
    {
        $this->loadTasksFromDatabase();
    }

     /**
      * Add a single task to the repository
      */
     public function addTask(TaskInterface $task): void
     {
         $this->tasks[$task->getId()] = $task;
         $this->saveTasksToDatabase();
     }

     /**
      * Add multiple tasks at once
      *
      * @param TaskInterface[] $tasks
      */
     public function addTasks(array $tasks): void
     {
         foreach ($tasks as $task) {
             $this->addTask($task);
         }
         $this->saveTasksToDatabase();
     }

     /**
      * Retrieve a single task by its ID
      */
     public function getTask(string $taskId): ?TaskInterface
     {
         $this->loadTasksFromDatabase();
         return $this->tasks[$taskId] ?? null;
     }

     /**
      * Retrieve all registered tasks
      *
      * @return TaskInterface[]
      */
     public function getAllTasks(): array
     {
         $this->loadTasksFromDatabase();
         return $this->tasks;
     }

     /**
      * Find tasks that match a specific criteria
      *
      * @param callable $criteria Callback to filter tasks
      * @return TaskInterface[]
      */
     public function findTasks(callable $criteria): array
     {
         $this->loadTasksFromDatabase();
         return array_filter($this->tasks, $criteria);
     }

     /**
      * Load tasks from the WordPress database
      */
     private function loadTasksFromDatabase(): void
     {
         $storedTasks = get_option('simplybook_tasks', []);
         $this->tasks = is_array($storedTasks) ? $storedTasks : [];
     }

     /**
      * Save tasks to the WordPress database
      */
     private function saveTasksToDatabase(): void
     {
         update_option('simplybook_tasks', $this->tasks);
     }
}
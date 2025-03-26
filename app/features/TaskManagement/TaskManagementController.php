<?php
namespace SimplyBook\Features\TaskManagement;

class TaskManagementController
{
    private TaskManagementRepository $repository;
    private TaskManagementService $service;

    public function __construct(TaskManagementRepository $taskRepository, TaskManagementService $taskService)
    {
        $this->repository = $taskRepository;
        $this->service = $taskService;

        echo '<pre>';
        var_dump(class_exists('\SimplyBook\Features\TaskManagement\Tasks\AddServiceTask'));
        exit();
    }
}
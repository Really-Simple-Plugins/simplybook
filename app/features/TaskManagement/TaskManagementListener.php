<?php

namespace SimplyBook\Features\TaskManagement;

class TaskManagementListener
{
    private TaskManagementService $service;

    public function __construct(TaskManagementService $service)
    {
        $this->service = $service;
    }

    public function listen(): void
    {
        add_action('simplybook_company_registered', [$this, 'handleCompanyRegistered'], 10, 2);
        add_action('simplybook_save_design_settings', [$this, 'handleDesignSettingsSaved']);
    }

    /**
     * Handle the company registered event to update task status.
     */
    public function handleCompanyRegistered(string $domain, int $companyId): void
    {
        $this->service->completeTask(
            Tasks\AddServiceTask::IDENTIFIER
        );
    }

    /**
     * Handle the after save options event to update task status.
     */
    public function handleDesignSettingsSaved(): void
    {
        $this->service->completeTask(
            Tasks\CustomizeDesignTask::IDENTIFIER
        );
    }
}
<?php

namespace SimplyBook\Interfaces;

use SimplyBook\Features\TaskManagement\Tasks\AbstractTask;

interface TaskInterface
{
    /**
     * Returns the unique identifier of the task
     */
    public function getId(): string;

    /**
     * Method is used to set that status of the task. For all available
     * statuses {@see AbstractTask} constants.
     */
    public function setStatus(string $status): void;

    /**
     * Returns the status of the task. For all available statuses
     * {@see AbstractTask} constants.
     */
    public function getStatus(): string;

    /**
     * Returns the version of the task
     */
    public function getVersion(): string;

    /**
     * Returns whether the task should be reactivated when the task is upgraded.
     * This is useful for tasks that are dismissed by the user but should be
     * reactivated when the task is upgraded to a new version.
     */
    public function reactivateOnUpgrade(): bool;


    /**
     * Method is used to add an action to the UI of the task item.
     * @example
     * [
     *      'type' => 'button',
     *      'text' => 'Button text',
     *      'link' => 'https://example.com' | '/services/new,
     * ]
     * @return array
     */
    public function getAction(): array;

    /**
     * Returns all data needed to show the task in the UI. Keys that are
     * required are 'id', 'text', 'status', 'type' and 'action'.
     */
    public function toArray(): array;
}
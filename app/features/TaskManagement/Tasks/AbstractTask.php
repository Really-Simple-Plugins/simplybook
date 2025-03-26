<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Interfaces\TaskInterface;

abstract class AbstractTask implements TaskInterface
{
    const STATUS_OPEN = 'open';
    const STATUS_DISMISSED = 'dismissed';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PREMIUM = 'premium';

    /**
     * Override this property to define the identifier of the task. This
     * identifier is used to identify the task in the database and in the UI.
     */
    protected string $identifier;

    /**
     * Override this property to define the version of the task. This version is
     * used to determine if the task should be upgraded during a plugin update.
     */
    protected string $version;

    /**
     * Override this property to define if the task is required or not. If the
     * task is required, the user will not be able to dismiss the task.
     */
    protected bool $required;

    /**
     * Override this property to define if the task should be reactivated when
     * the task is upgraded. This is useful for tasks that are dismissed by the
     * user but should be reactivated when the task is upgraded to a new
     * version.
     */
    protected bool $reactivateOnUpgrade;

    /**
     * Use this property to define if the task is a premium task. This is used
     * as an alternative status when reading the task as an array. Useful for
     * the UI.
     */
    protected bool $premium;

    /**
     * A task is ALWAYS active on construct. Only actions of the user can change
     * this. Do NOT override this property.
     */
    private string $status;

    /**
     * Override this method to define the text that should be displayed to the
     * user in the tasks dashboard component
     * @abstract
     */
    abstract public function getText(): string;

    /**
     * Override this method to define the initial condition of the task. If the
     * condition is false, the task will not be displayed to the user. This is
     * done by setting the initial status to 'completed'.
     */
    public function condition(): bool
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return $this->identifier;
    }

    /**
     * @inheritDoc
     */
    public function getVersion(): string
    {
        return $this->version ?? '1.0.0';
    }

    /**
     * @inheritDoc
     */
    public function getStatus(): string
    {
        return $this->status ?? self::STATUS_OPEN;
    }

    /**
     * @inheritDoc
     */
    public function reactivateOnUpgrade(): bool
    {
        return $this->reactivateOnUpgrade ?? false;
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [];
    }

    /**
     * @inheritDoc
     */
    public function setStatus(string $status): void
    {
        $knownStatuses = [self::STATUS_OPEN, self::STATUS_DISMISSED, self::STATUS_COMPLETED, self::STATUS_PREMIUM];
        if (!in_array($status, $knownStatuses)) {
            return; // Not allowed
        }

        $this->status = $status;
    }

    /**
     * Activate the task by setting the status to 'open'
     */
    public function open(): void
    {
        $this->status = self::STATUS_OPEN;
    }

    /**
     * Dismiss the task by setting the status to 'dismissed'. Only allowed if
     * the task is not required.
     */
    public function dismiss(): void
    {
        if ($this->required) {
            return; // Not allowed
        }

        $this->status = self::STATUS_DISMISSED;
    }

    /**
     * Complete the task by setting the status to 'completed'
     */
    public function completed(): void
    {
        $this->status = self::STATUS_COMPLETED;
    }

    /**
     * Reads if the task is required
     */
    public function isRequired(): bool
    {
        return $this->required ?? false;
    }

    /**
     * Reads if the task is premium
     */
    public function isPremium(): bool
    {
        return $this->premium ?? false;
    }

    /**
     * @inheritDoc
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'text' => $this->getText(),
            'status' => $this->isPremium() ? 'premium' : $this->getStatus(),
            'type' => $this->isRequired() ? 'required' : 'optional',
            'action' => $this->getAction(),
        ];
    }

}
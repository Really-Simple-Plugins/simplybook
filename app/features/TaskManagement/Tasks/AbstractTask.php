<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\Interfaces\TaskInterface;

abstract class AbstractTask implements TaskInterface
{
    const STATUS_OPEN = 'open';
    const STATUS_URGENT = 'urgent';
    const STATUS_DISMISSED = 'dismissed';
    const STATUS_COMPLETED = 'completed';
    const STATUS_PREMIUM = 'premium';
    const STATUS_HIDDEN = 'hidden';

    /**
     * Override this constant to define the identifier of the task. This
     * identifier is used to identify the task in the database and in the UI.
     */
    const IDENTIFIER = '';

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
     * Use this property to define if the task is a premium task. Useful for
     * the UI.
     */
    protected bool $premium;

    /**
     * Use this property to define if the task is related to a special feature
     * or not. Useful for the UI.
     */
    protected bool $specialFeature;

    /**
     * By default, a task is active on construct. This is because the $status
     * property is not set. The {@see getStatus()} method will therefore return
     * the default status 'open'. If you want to set a different default status
     * use the {@see setStatus()} method in the construct of the task. See
     * {@see AddMandatoryProviderTask} for an example.
     */
    private string $status;

    /**
     * Override this method to define the text that should be displayed to the
     * user in the tasks dashboard component
     * @abstract
     */
    abstract public function getText(): string;

    /**
     * @inheritDoc
     */
    public function getId(): string
    {
        return static::IDENTIFIER;
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
        $knownStatuses = [
            self::STATUS_OPEN,
            self::STATUS_URGENT,
            self::STATUS_DISMISSED,
            self::STATUS_COMPLETED,
            self::STATUS_PREMIUM,
            self::STATUS_HIDDEN,
        ];
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
     * Set the task to 'urgent' status
     */
    public function urgent(): void
    {
        $this->status = self::STATUS_URGENT;
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
     * Hide the task by setting the status to 'hidden'
     */
    public function hide(): void
    {
        $this->status = self::STATUS_HIDDEN;
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
     * Reads if the task is related to a special feature
     */
    public function isSpecialFeature(): bool
    {
        return $this->specialFeature ?? false;
    }

    /**
     * Build the label for the task. This is used to display the task in the
     * tasks dashboard component. The label is used to indicate if the task
     * is premium or a special feature. If not, the label reflects the status.
     */
    public function getLabel(): string
    {
        if ($this->isPremium()) {
            return esc_html__('Premium', 'simplybook');
        }

        if ($this->isSpecialFeature()) {
            return esc_html__('Special feature', 'simplybook');
        }

        return ucfirst($this->getStatus());
    }

    /**
     * @inheritDoc
     */
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'text' => $this->getText(),
            'label' => $this->getLabel(),
            'status' => $this->getStatus(),
            'premium' => $this->isPremium(),
            'special_feature' => $this->isSpecialFeature(),
            'type' => $this->isRequired() ? 'required' : 'optional',
            'action' => $this->getAction(),
        ];
    }

}
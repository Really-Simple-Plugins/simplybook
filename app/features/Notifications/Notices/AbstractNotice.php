<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\Interfaces\NoticeInterface;

abstract class AbstractNotice implements NoticeInterface
{
    const STATUS_OPEN = 'open';
    const STATUS_HIDDEN = 'hidden';

    const TYPE_INFO = 'info';
    const TYPE_WARNING = 'warning';

    /**
     * Override this constant to define the identifier of the Notice. This
     * identifier is used to identify the Notice in the database and in the UI.
     */
    const IDENTIFIER = '';

    /**
     * Override this property to define the version of the Notice. This version is
     * used to determine if the Notice should be upgraded during a plugin update.
     */
    protected string $version;

    /**
     * Override this property to define if the Notice should be reactivated when
     * the Notice is upgraded. This is useful for Notices that are dismissed by the
     * user but should be reactivated when the Notice is upgraded to a new
     * version.
     */
    protected bool $reactivateOnUpgrade;

    /**
     * Use this property to define if the Notice is a premium Notice. This is used
     * as an alternative status when reading the Notice as an array. Useful for
     * the UI.
     */
    protected bool $premium;

    /**
     * By default, a Notice is active on construct. This is because the $status
     * property is not set. The {@see getStatus()} method will therefore return
     * the default status 'open'. If you want to set a different default status
     * use the {@see setStatus()} method in the construct of the Notice. See
     * {@see AddMandatoryProviderNotice} for an example.
     */
    private string $status;

    /**
     * Override this method to define the title that should be displayed to the
     * user in the Notices dashboard component
     * @abstract
     */
    abstract public function getTitle(): string;

    /**
     * Override this method to define the text that should be displayed to the
     * user in the Notices dashboard component
     * @abstract
     */
    abstract public function getText(): string;

    /**
     * Use this method to define the route on which the Notice should be
     * displayed.
     * @abstract
     */
    abstract public function getRoute(): string;

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
            self::STATUS_HIDDEN,
        ];
        if (!in_array($status, $knownStatuses)) {
            return; // Not allowed
        }

        $this->status = $status;
    }

    /**
     * Use this method to set the type of notice. By default, the type is
     * 'info' but you can override this method to set the type according to your
     * needs.
     */
    public function getType(): string
    {
        return self::TYPE_INFO;
    }

    /**
     * Activate the Notice by setting the status to 'open'
     */
    public function open(): void
    {
        $this->status = self::STATUS_OPEN;
    }

    /**
     * Hide the Notice by setting the status to 'hidden'
     */
    public function hide(): void
    {
        $this->status = self::STATUS_HIDDEN;
    }

    /**
     * Reads if the Notice is premium
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
            'title' => $this->getTitle(),
            'text' => $this->getText(),
            'status' => $this->getStatus(),
            'premium' => $this->isPremium(),
            'type' => $this->getType(),
            'route' => $this->getRoute(),
            'action' => $this->getAction(),
        ];
    }

}
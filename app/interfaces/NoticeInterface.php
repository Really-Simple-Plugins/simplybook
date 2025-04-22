<?php

namespace SimplyBook\Interfaces;

use SimplyBook\Features\Notifications\Notices\AbstractNotice;

interface NoticeInterface
{
    /**
     * Returns the unique identifier of the notice
     */
    public function getId(): string;

    /**
     * Method is used to set that status of the notice. For all available
     * statuses {@see AbstractNotice} constants.
     */
    public function setStatus(string $status): void;

    /**
     * Returns the status of the notice. For all available statuses
     * {@see AbstractNotice} constants.
     */
    public function getStatus(): string;

    /**
     * Returns the version of the notice
     */
    public function getVersion(): string;

    /**
     * Returns whether the notice should be reactivated when the notice is upgraded.
     * This is useful for notices that are dismissed by the user but should be
     * reactivated when the notice is upgraded to a new version.
     */
    public function reactivateOnUpgrade(): bool;

    /**
     * Method is used to add a link to the UI of the notice item.
     * @example (normal link)
     *  [
     *       'text' => 'Link text',
     *       'link' => 'https://example.com' | '/services/new,
     *  ]
     * @example (login link)
     * [
     *      'text' => 'Link text',
     *      'login_link' => '/v2/management/',
     * ]
     */
    public function getAction(): array;

    /**
     * Returns all data needed to show the notice in the UI. Keys that are
     * required are 'id', 'text', 'status', 'type' and 'action'.
     */
    public function toArray(): array;
}
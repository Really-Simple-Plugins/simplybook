<?php

namespace SimplyBook\Interfaces;

interface NoticeInterface
{
    /**
     * Returns the unique identifier of the notice
     */
    public function getId(): string;

    /**
     * Returns the version of the notice
     */
    public function getVersion(): string;

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
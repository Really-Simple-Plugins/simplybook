<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\App;

class FailedAuthenticationNotice extends AbstractNotice
{
    const IDENTIFIER = 'failed_authentication';

    public function __construct()
    {
        $this->setActive(
            App::provide('client')->authenticationHasFailed()
        );
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return esc_html__('Connection lost', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__(
            'We’ve lost connection to your SimplyBook.me account. Please log out and sign in again to reconnect.',
            'simplybook'
        );
    }

    /**
     * @inheritDoc
     */
    public function getType(): string
    {
        return self::TYPE_WARNING;
    }

    /**
     * @inheritDoc
     */
    public function getRoute(): string
    {
        return 'general';
    }
}
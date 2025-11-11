<?php

namespace SimplyBook\Features\Notifications\Notices;

use SimplyBook\Bootstrap\App;

class FailedAuthenticationNotice extends AbstractNotice
{
    public const IDENTIFIER = 'failed_authentication';

    public function __construct()
    {
        $this->setActive(
            App::client()->authenticationHasFailed()
        );
    }

    /**
     * @inheritDoc
     */
    public function getTitle(): string
    {
        return __('Connection lost', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __(
            'We\'ve lost connection to your SimplyBook.me account. Please log out and sign in again to reconnect.',
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

<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class InstallAppTask extends AbstractTask
{
    public const IDENTIFIER = 'install_sb_app';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Install the SimplyBook.me app for iOS or Android', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('More info', 'simplybook'),
            'modal' => [
                'id' => 'install_app_task',
            ],
        ];
    }
}

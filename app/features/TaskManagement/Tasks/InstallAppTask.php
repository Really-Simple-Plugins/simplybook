<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

use SimplyBook\App;

class InstallAppTask extends AbstractTask
{
    const IDENTIFIER = 'install_sb_app';

    /**
     * @inheritDoc
     */
    protected bool $required = false;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Install the SimplyBook.me app for iOS or Android','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('More info','simplybook'),
            'modal' => [
                'id' => 'install_app_task',
            ],
        ];
    }
}
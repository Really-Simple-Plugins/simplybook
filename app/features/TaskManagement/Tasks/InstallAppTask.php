<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

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
        return esc_html__('Install the Simplybook.me app for iOS or Android','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('More info','simplybook'),
            'link' => 'https://simplybook.me/en/app_client-app_admin-app',
            'target' => '_blank',
        ];
    }
}
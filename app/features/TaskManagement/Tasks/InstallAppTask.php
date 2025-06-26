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
//            'link' => 'https://simplybook.me/en/app_client-app_admin-app',
//            'target' => '_blank',
            'modal' => [
	            'title' => esc_html__('Manage your bookings on the go with the Admin App!', 'simplybook'),
	            'content' => esc_html__('See new and upcoming bookings, access and contact your clients, send payment links (coming soon) and more, with the Admin App. Just scan one of these codes:', 'simplybook'),
	            'image' => App::env('plugin.assets_url') . 'img/placeholder.jpg',
	            'buttons' => [
		            [
			            'image' => 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg',
			            'link' => 'https://apps.apple.com/us/app/simplybook-me-admin/id1498910745',
			            'qr' => App::env('plugin.assets_url') . 'img/placeholder.jpg',
		            ],
		            [
			            'image' => 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg',
			            'link' => 'https://play.google.com/store/apps/details?id=me.simplybook.flutter_simplybook',
			            'qr' => App::env('plugin.assets_url') . 'img/placeholder.jpg',
		            ],
	            ],
	            'footer' => [
		            'text' => esc_html__('I already have the app, I want to ', 'simplybook'),
					'link' => 'https://simplybook.me/en/app_client-app_admin-app',
		            'linkText' => esc_html__('Log in', 'simplybook'),
	            ]
            ],
        ];
    }
}
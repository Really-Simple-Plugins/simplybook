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
                'background' => [
                    'image' => App::env('plugin.assets_url') . 'img/QR-MODAL-BG.svg',
                ],
                'content' => [
                    [
                        'title' => [
                            [
                                esc_html__('Manage your bookings on the go with the Admin App!', 'simplybook'),
                            ],
                        ],
                        'text' => [
                            [
                                /* translators: %1$s: an & (ampersand) sign */
                                sprintf(
                                    esc_html__('See new and upcoming bookings, access %1$s contact your clients, send payment links (coming soon) %1$s more with the Admin App.', 'simplybook'),
                                    '&'
                                ),
                            ],
                            [
                                esc_html__('Just scan one of these codes:', 'simplybook'),
                            ],
                        ],
                        'images' => [
                            [
                                'src' => App::env('plugin.assets_url') . 'img/Combined-QR-Codes.svg',
                                'altText' => esc_html__('Two QR Codes - left to the App Store and right to the Google Play Store pages of the Admin App', 'simplybook'),
                            ],
                        ],
                        'callsToAction' => [
                            [
                                [
                                    'button' => [
                                        'image' => App::env('plugin.assets_url') . 'img/App-Store-Btn.svg',
                                        'link' => 'https://apps.apple.com/us/app/simplybook-me-admin/id1498910745',
                                        'text' => esc_html__('Download on the App Store', 'simplybook'),
                                        'showText' => false,
                                    ],
                                ],
                                [
                                    'button' => [
                                        'image' => App::env('plugin.assets_url') . 'img/Google-Play-Btn.svg',
                                        'link' => 'https://play.google.com/store/apps/details?id=me.simplybook.flutter_simplybook',
                                        'text' => esc_html__('Get it on Google Play', 'simplybook'),
                                        'showText' => false,
                                    ],
                                ],
                            ],
                        ],
                    ],
                    [
                        'images' => [
                            [
                                'src' => App::env('plugin.assets_url') . 'img/QR-MODAL-PHONES.svg',
                                'altText' => esc_html__('Two phones displaying pages of the Admin App', 'simplybook'),
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }
}
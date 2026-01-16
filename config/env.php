<?php if (!defined('ABSPATH')) {
    exit;
}

/**
 * This file is NOT loaded in the config. All other files áre loaded in one
 * config object in the container. This file is loaded separately via
 * the {@see \SimplyBook\Providers\ConfigServiceProvider}
 *
 * Request this information from the container class
 * {@see \SimplyBook\Bootstrap\App} using $this->app->env. This is a
 * {@see \SimplyBook\Support\Helpers\Storage} class.
 *
 * This information can be used early in the WordPress lifecycle because no
 * translations are used.
 */
return [
    'plugin' => [
        'name' => 'SimplyBook.me',
        'version' => '3.2.4',
        'pro' => true,
        'path' => dirname(__DIR__),
        'base_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . plugin_basename(dirname(__DIR__)) . '.php',
        'assets_path' => dirname(__DIR__). DIRECTORY_SEPARATOR .'assets' . DIRECTORY_SEPARATOR,
        'lang_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'assets'. DIRECTORY_SEPARATOR . 'languages' . DIRECTORY_SEPARATOR,
        'view_path' => dirname(__DIR__).DIRECTORY_SEPARATOR.'views'. DIRECTORY_SEPARATOR,
        'feature_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Features' . DIRECTORY_SEPARATOR,
        'react_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'react',
        'dir'  => plugin_basename(dirname(__DIR__)),
        'base_file' => plugin_basename(dirname(__DIR__)) . DIRECTORY_SEPARATOR . plugin_basename(dirname(__DIR__)) . '.php',
        'lang' => plugin_basename(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'languages',
        'url'  => plugin_dir_url(__DIR__),
        'assets_url' => plugin_dir_url(__DIR__).'assets/',
        'views_url' => plugin_dir_url(__DIR__).'views/',
        'react_url' => plugin_dir_url(__DIR__).'react',
        'dashboard_url' => admin_url('admin.php?page=simplybook-integration'),
    ],
    'http' => [
        'version' => 'v1',
        'namespace' => 'simplybook',
    ],
    'simplybook' => [
        'support_url' => 'https://wordpress.org/support/plugin/simplybook/',
        'review_url' => 'https://wordpress.org/support/plugin/simplybook/reviews/#new-post',
        'widget_script_url' => 'https://simplybook.me/v2/widget/widget.js',
        'widget_script_version' => '1.3.0',
        'demo_widget_server_url' => 'https://demowidgetwpplugin.simplybook.it',
        'support' => [
            'enabled' => true,
            'widget' => [
                'url' => 'https://simply.ladesk.com/scripts/track.js',
            ],
        ],
        'api' => [
            'production' => [
                'domain' => 'simplybook.it',
            ],
            'development' => [
                'domain' => 'wp.simplybook.ovh',
            ],
        ],
        'black_friday' => [
            'discount_percentage' => 25,
            'promo_code' => 'BLACKFRIDAY',
            'start_date' => '2025-11-18',
            'end_date' => '2025-11-29'
        ],
        'christmas_promo' => [
            'discount_percentage' => 25,
            'promo_code' => 'CHRISTMAS25',
            'start_date' => '2025-12-01',
            'end_date' => '2025-12-25'
        ],
        'tips_and_tricks' => [
            'all' => 'https://simplybook.me/en/wordpress-booking-plugin',
            'video_tutorials' => 'https://www.youtube.com/channel/UCQrqBCwg_C-Q6DaAQVA-U2Q',
            'items' => [
                [
                    'content' => 'How to get started',
                    'link' => 'https://help.simplybook.me/index.php/WordPress_integration',
                ],
                [
                    'content' => 'Sync SimplyBook.me with Google Calendar or Outlook Calendar',
                    'link' => 'https://help.simplybook.me/index.php?title=Calendar_Sync_custom_feature',
                ],
                [
                    'content' => 'How to accept payments with SimplyBook.me',
                    'link' => 'https://help.simplybook.me/index.php/Accept_payments_custom_feature',
                ],
            ],
        ],
        'domains' => [
            ['value' => 'default:simplybook.it', 'label' => 'simplybook.it'],
            ['value' => 'default:simplybook.me', 'label' => 'simplybook.me'],
            ['value' => 'default:simplybook.asia', 'label' => 'simplybook.asia'],
            ['value' => 'default:bookingsystem.nu', 'label' => 'bookingsystem.nu'],
            ['value' => 'default:simplybooking.io', 'label' => 'simplybooking.io'],
            ['value' => 'default:simplybook.vip', 'label' => 'simplybook.vip'],
            ['value' => 'default:simplybook.cc', 'label' => 'simplybook.cc'],
            ['value' => 'default:simplybook.us', 'label' => 'simplybook.us'],
            ['value' => 'default:simplybook.pro', 'label' => 'simplybook.pro'],
            ['value' => 'default:enterpriseappointments.com', 'label' => 'enterpriseappointments.com'],
            ['value' => 'default:simplybook.webnode.page', 'label' => 'simplybook.webnode.page'],
            ['value' => 'default:servicebookings.net', 'label' => 'servicebookings.net'],
            ['value' => 'default:booking.names.uk', 'label' => 'booking.names.uk'],
            ['value' => 'default:booking.lcn.uk', 'label' => 'booking.lcn.uk'],
            ['value' => 'default:booking.register365.ie', 'label' => 'booking.register365.ie'],
            // wp.simplybook.ovh gets added in development mode via App::provide('simplybook_domains')
        ]
    ]
];
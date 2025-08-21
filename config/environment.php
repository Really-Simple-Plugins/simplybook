<?php if (!defined('ABSPATH')) {
    exit;
}

// The environment config can be used BEFORE the 'init' hook.
return [
    'plugin' => [
        'name' => 'SimplyBook.me',
        'version' => '3.2.0',
        'pro' => true,
        'path' => dirname(__DIR__),
        'base_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . plugin_basename(dirname(__DIR__)) . '.php',
        'assets_path' => dirname(__DIR__). DIRECTORY_SEPARATOR .'assets' . DIRECTORY_SEPARATOR,
        'lang_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'assets'. DIRECTORY_SEPARATOR . 'languages' . DIRECTORY_SEPARATOR,
        'view_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR,
        'feature_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'features' . DIRECTORY_SEPARATOR,
        'react_path' => dirname(__DIR__). DIRECTORY_SEPARATOR . 'react',
        'dir'  => plugin_basename(dirname(__DIR__)),
        'base_file' => plugin_basename(dirname(__DIR__)) . DIRECTORY_SEPARATOR . plugin_basename(dirname(__DIR__)) . '.php',
        'lang' => plugin_basename(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'languages',
        'url'  => plugin_dir_url(__DIR__),
        'assets_url' => plugin_dir_url(__DIR__).'assets/',
        'views_url' => plugin_dir_url(__DIR__).'app/views/',
        'react_url' => plugin_dir_url(__DIR__).'react',
        'dashboard_url' => admin_url('admin.php?page=simplybook-integration'),
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
                'app_key' => 'GWLAm1KkDD962jGUc26t7RamSaY3navt8uKcCNwlLrEqY6aRwOoGNGmW1H0YyLvW',
            ],
            'development' => [
                'domain' => 'wp.simplybook.ovh',
                'app_key' => 'U0FAJxPqxrh95xAL6mqL06aqv8itrt85QniuWJ9wLRU9bcUJp7FxHCPr62Da3KP9L35Mmdp0djZZw9DDQNv1DHlUNu5w3VH6I5CB',
            ],
        ],
        'tips_and_tricks' => [
            'all' => 'https://simplybook.me/en/wordpress-booking-plugin',
            'video_tutorials' => 'https://www.youtube.com/channel/UCQrqBCwg_C-Q6DaAQVA-U2Q',
            'items' => [
                [
                    'title' => 'Integrations',
                    'content' => 'Sync SimplyBook.me with Google Calendar or Outlook Calendar ',
                    'link' => 'https://help.simplybook.me/index.php?title=Calendar_Sync_custom_feature',
                ],
                [
                    'title' => 'Customization',
                    'content' => 'Accept Payments Online ',
                    'link' => 'https://help.simplybook.me/index.php/Accept_payments_custom_feature',
                ],
                [
                    'title' => 'Marketing',
                    'content' => 'Boost Engagement with Promo Codes',
                    'link' => 'https://help.simplybook.me/index.php?title=Coupons_and_Gift_Cards_custom_feature/en',
                ],
                // [
                //     'title' => 'Integrations',
                //     'content' => 'Sync SimplyBook.me with Google Calendar or Outlook Calendar – Keep your schedule updated in real time by integrating your bookings with Google and Outlook Calendar.',
                //     'link' => 'https://help.simplybook.me/index.php?title=Calendar_Sync_custom_feature ',
                // ],
                // [
                //     'title' => 'Automation',
                //     'content' => 'Reduce No-Shows with Automated Reminders – Set up SMS and email reminders to ensure your clients never miss an appointment.',
                //     'link' => '/settings/templates', // todo: use loginLink() method
                // ],
                // [
                //     'title' => 'News & Updates',
                //     'content' => 'SimplyBook.me  newsletter: exciting new features and upcoming enhancements.',
                //     'link' => 'https://news.simplybook.me/ ',
                // ],
                // [
                //     'title' => 'Customization',
                //     'content' => 'Accept Payments Online – Enable secure payment gateways like Stripe or PayPal to allow clients to prepay for services.',
                //     'link' => 'https://help.simplybook.me/index.php/Accept_payments_custom_feature',
                // ],
                // [
                //     'title' => 'Client Management',
                //     'content' => 'Create Membership & Packages – Offer exclusive memberships and service packages to increase client retention and revenue.',
                //     'link' => 'https://help.simplybook.me/index.php?title=Packages_custom_feature/en',
                // ],
                // [
                //     'title' => 'Marketing',
                //     'content' => 'Boost Engagement with Promo Codes – Attract more clients by offering discounts and special promotions via customizable promo codes.',
                //     'link' => 'https://help.simplybook.me/index.php?title=Coupons_and_Gift_Cards_custom_feature/en',
                // ],
            ],
        ],
        'domains' => [
            ['value' => 'default:simplybook.it', 'label' => 'simplybook.it'],
            ['value' => 'default:simplybook.me', 'label' => 'simplybook.me'],
            ['value' => 'default:simplybook.asia', 'label' => 'simplybook.asia'],
            ['value' => 'default:bookingsystem.nu', 'label' => 'bookingsystem.nu'],
            ['value' => 'default:simplybooking.io', 'label' => 'simplybooking.io'],
            ['value' => 'login:simplybook.vip', 'label' => 'simplybook.vip'],
            ['value' => 'login:simplybook.cc', 'label' => 'simplybook.cc'],
            ['value' => 'login:simplybook.us', 'label' => 'simplybook.us'],
            ['value' => 'login:simplybook.pro', 'label' => 'simplybook.pro'],
            ['value' => 'login:enterpriseappointments.com', 'label' => 'enterpriseappointments.com'],
            ['value' => 'login:simplybook.webnode.page', 'label' => 'simplybook.webnode.page'],
            ['value' => 'login:servicebookings.net', 'label' => 'servicebookings.net'],
            ['value' => 'login:booking.names.uk', 'label' => 'booking.names.uk'],
            ['value' => 'login:booking.lcn.uk', 'label' => 'booking.lcn.uk'],
            ['value' => 'login:booking.register365.ie', 'label' => 'booking.register365.ie'],
            // wp.simplybook.ovh gets added in development mode via App::provide('simplybook_domains')
        ]
    ],
    'colors' => [
        'fallback_colors' => [
            'primary' => '#FF3259',
            'secondary' => '#000000',
            'active' => '#055B78',
            'background' => '#f7f7f7',
            'foreground' => '#494949',
            'text' => '#ffffff',
        ],
    ],
    'http' => [
        'version' => 'v1',
        'namespace' => 'simplybook',
    ],
];
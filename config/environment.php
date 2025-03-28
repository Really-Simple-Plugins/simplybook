<?php if (!defined('ABSPATH')) {
    exit;
}

// The environment config can be used BEFORE the 'init' hook.
return [
    'plugin' => [
        'name' => 'SimplyBook.me',
        'version' => '3.0.0',
        'pro' => true,
        'path' => dirname(__DIR__),
        'base_path' => dirname(__DIR__). '/' . plugin_basename(dirname(__DIR__)) . '.php',
        'assets_path' => dirname(__DIR__).'/assets/',
        'view_path' => dirname(__DIR__).'/app/views/',
        'feature_path' => dirname(__DIR__).'/app/features/',
        'react_path' => dirname(__DIR__).'/react',
        'dir'  => plugin_basename(dirname(__DIR__)),
        'base_file' => plugin_basename(dirname(__DIR__)) . '/' . plugin_basename(dirname(__DIR__)) . '.php',
        'lang' => plugin_basename(dirname(__DIR__)) . '/assets/languages',
        'url'  => plugin_dir_url(__DIR__),
        'assets_url' => plugin_dir_url(__DIR__).'assets/',
        'views_url' => plugin_dir_url(__DIR__).'app/views/',
        'react_url' => plugin_dir_url(__DIR__).'react',
        'admin_url' => admin_url('admin.php?page=simplybook'),
    ],
    'simplybook' => [
        'support_link' => 'https://wordpress.org/support/plugin/simplybook/',
        'widget_script_url' => 'https://simplybook.me/v2/widget/widget.js',
        'widget_script_version' => '1.3.0',
        'tips_and_tricks' => [
            'all' => 'https://simplybook.me/en/wordpress-booking-plugin',
            'video_tutorials' => 'https://www.youtube.com/channel/UCQrqBCwg_C-Q6DaAQVA-U2Q',
            'items' => [
                [
                    'title' => 'Integrations',
                    'content' => 'Sync SimplyBook.me with Google Calendar or Outlook Calendar – Keep your schedule updated in real time by integrating your bookings with Google and Outlook Calendar.',
                    'link' => 'https://help.simplybook.me/index.php?title=Calendar_Sync_custom_feature ',
                ],
                [
                    'title' => 'Automation',
                    'content' => 'Reduce No-Shows with Automated Reminders – Set up SMS and email reminders to ensure your clients never miss an appointment.',
                    'link' => '/settings/templates', // todo: use loginLink() method
                ],
                [
                    'title' => 'News & Updates',
                    'content' => 'Simplybook.me  newsletter: exciting new features and upcoming enhancements.',
                    'link' => 'https://news.simplybook.me/ ',
                ],
                [
                    'title' => 'Customization',
                    'content' => 'Accept Payments Online – Enable secure payment gateways like Stripe or PayPal to allow clients to prepay for services.',
                    'link' => 'https://help.simplybook.me/index.php/Accept_payments_custom_feature',
                ],
                [
                    'title' => 'Client Management',
                    'content' => 'Create Membership & Packages – Offer exclusive memberships and service packages to increase client retention and revenue.',
                    'link' => 'https://help.simplybook.me/index.php?title=Packages_custom_feature/en',
                ],
                [
                    'title' => 'Marketing',
                    'content' => 'Boost Engagement with Promo Codes – Attract more clients by offering discounts and special promotions via customizable promo codes.',
                    'link' => 'https://help.simplybook.me/index.php?title=Coupons_and_Gift_Cards_custom_feature/en',
                ],
            ]
        ]
    ],
    'http' => [
        'version' => 'v1',
        'namespace' => 'simplybook',
    ],
];
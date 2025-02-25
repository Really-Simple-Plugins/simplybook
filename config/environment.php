<?php if (!defined('ABSPATH')) {
    exit;
}

// The environment config can be used BEFORE the 'init' hook.
return [
    'plugin' => [
        'name' => 'SimplyBook.me',
        'name_short' => 'SimplyBook',
        'version' => '3.0.0',
        'pro' => true,
        'path' => dirname(__DIR__),
        'base_path' => dirname(__DIR__). '/' . plugin_basename(dirname(__DIR__)) . '.php',
        'assets_path' => dirname(__DIR__).'/assets/',
        'url'  => plugin_dir_url(__DIR__),
        'assets'   => plugin_dir_url(__DIR__).'assets/',
        'dir'  => plugin_basename(dirname(__DIR__)),
        'base_file' => plugin_basename(dirname(__DIR__)) . '/' . plugin_basename(dirname(__DIR__)) . '.php',
        'lang' => plugin_basename(dirname(__DIR__)) . '/assets/languages',
        'admin_url' => admin_url('admin.php?page=simplybook'),
    ],
    'simplybook' => [
        'support_link' => 'https://wordpress.org/support/plugin/simplybook/',
    ]
];
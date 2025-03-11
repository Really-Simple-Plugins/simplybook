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
    ],
    'http' => [
        'version' => 'v1',
        'namespace' => 'simplybook',
    ],
];
<?php if (!defined('ABSPATH')) {
    exit;
}

// The environment config can be used BEFORE the 'init' hook.
return [
    'name' => 'SimplyBook.me',
    'name_short' => 'SimplyBook',
    'version' => '3.0.0',
    'path' => dirname(__DIR__),
    'base_path' => dirname(__DIR__). '/' . plugin_basename(dirname(__DIR__)) . '.php',
    'assets_path' => dirname(__DIR__).'/assets/',
    'url'  => plugin_dir_url(__DIR__),
    'assets'   => plugin_dir_url(__DIR__).'assets/',
    'dir'  => plugin_basename(dirname(__DIR__)),
    'base_file' => plugin_basename(dirname(__DIR__)) . '/' . plugin_basename(dirname(__DIR__)) . '.php',
    'lang' => plugin_basename(dirname(__DIR__)) . '/assets/languages',
];
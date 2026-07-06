<?php

if (!defined('ABSPATH')) {
    exit;
}

// The abilities config can only be used AFTER or ON the 'init' hook.
return [
    'namespace' => 'simplybook',
    'category' => [
        'slug' => 'simplybook',
        'label' => __('SimplyBook.me plugin abilities', 'simplybook'),
        'description' => __('Abilities related to the SimplyBook.me plugin.', 'simplybook'),
    ],
];

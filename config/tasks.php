<?php
/**
 * condition: [
 *          type: serverside, clientside, activation (if task should be added on activation)
 *          function returning a boolean, or __true__, if always true
 * ]
 * status: open, completed, premium
 */

return [
    'add_service' => [
        'id' => 'add_service',
        'condition' => [
            'type' => 'serverside',
            'function' => '(new \Simplybook_old\Api\Api())->company_registration_complete()',
        ],
        'text' => __('Complete the onboarding to get started!','simplybook'),
        'status' => 'open',
        'type' => 'required',
        'action' => [
            'text' => 'Add Service',
            'link' => '/services/new',
        ],
    ],
    // todo - this entry has the same ID as the previous one, why?
    'add_service_todo' => [
        'id' => 'add_service_todo',
        'condition' => [
            'type' => 'serverside',
            'function' => '(new \Simplybook_old\Api\Api())->has_services()',
        ],
        'text' => __('Add your first service','simplybook'),
        'status' => 'open',
        'type' => 'required',
        'action' => [
            'text' => 'Add Service',
            'link' => '/services/new',
        ],
    ],
    'set_schedule' => [
        'id' => 'set_schedule',
        'condition' => [
            'type' => 'serverside',
            'function' => 'has_schedule',
        ],
        'text' => 'Set your business hours',
        'status' => 'open',
        'type' => 'required',
    ],
    'configure_email' => [
        'id' => 'configure_email',
        'condition' => [
            'type' => 'serverside',
            'function' => 'has_schedule',
        ],
        'text' => 'Configure email notifications',
        'status' => 'premium',
        'type' => 'optional',
    ],
    'customize_widget' => [
        'id' => 'customize_widget',
        'condition' => [
            'type' => 'serverside',
            'function' => 'has_schedule',
        ],
        'text' => 'Customize your booking widget',
        'status' => 'premium',
        'type' => 'optional',
    ],
    'task_on_activation' => [
        'id' => 'task_on_activation',
        'condition' => [
            'type' => 'activation',
        ],
        'text' => 'This task gets added on activation',
        'status' => 'open',
        'type' => 'optional',
    ],
];
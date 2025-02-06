<?php
/**
 * condition: [
 *          type: serverside, clientside, activation (if task should be added on activation)
 *          function returning a boolean, or __true__, if always true
 * ]
 * status: open, completed, premium
 */

return [
	[
		'id' => 'add_service',
		'condition' => [
			'type' => 'serverside',
			'function' => '(new \Simplybook\Api\Api())->company_registration_complete()',
		],
		'text' => __('Complete the onboarding to get started!','simplybook'),
		'status' => 'open',
		'type' => 'required',
		'action' => [
			'text' => 'Add Service',
			'link' => '/services/new',
		],
	],
	[
		'id' => 'add_service',
		'condition' => [
			'type' => 'serverside',
			'function' => '(new \Simplybook\Api\Api())->has_services()',
		],
		'text' => __('Add your first service','simplybook'),
		'status' => 'open',
		'type' => 'required',
		'action' => [
			'text' => 'Add Service',
			'link' => '/services/new',
		],
	],
	[
		'id' => 'set_schedule',
		'condition' => [
			'type' => 'serverside',
			'function' => 'has_schedule',
		],
		'text' => 'Set your business hours',
		'status' => 'open',
		'type' => 'required',
	],
	[
		'id' => 'configure_email',
		'condition' => [
			'type' => 'serverside',
			'function' => 'has_schedule',
		],
		'text' => 'Configure email notifications',
		'status' => 'premium',
		'type' => 'optional',
	],
	[
		'id' => 'customize_widget',
		'condition' => [
			'type' => 'serverside',
			'function' => 'has_schedule',
		],
		'text' => 'Customize your booking widget',
		'status' => 'premium',
		'type' => 'optional',
	],
	[
		'id' => 'task_on_activation',
		'condition' => [
			'type' => 'activation',
		],
		'text' => 'This task gets added on activation',
		'status' => 'open',
		'type' => 'optional',
	],
];
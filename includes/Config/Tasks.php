<?php
return [
	[
		'id' => 'add_service',
		'is_initial_task' => true,
		'text' => 'Add your first service',
		'status' => 'open',
		'type' => 'required',
		'action' => [
			'text' => 'Add Service',
			'link' => '/services/new',
		],
		'condition' => 'has_services'
	],
	[
		'id' => 'set_schedule',
		'is_initial_task' => true,
		'text' => 'Set your business hours',
		'status' => 'open',
		'type' => 'required',
	],
	[
		'id' => 'configure_email',
		'is_initial_task' => true,
		'text' => 'Configure email notifications',
		'status' => 'premium',
		'type' => 'optional',
	],
	[
		'id' => 'customize_widget',
		'is_initial_task' => true,
		'text' => 'Customize your booking widget',
		'status' => 'premium',
		'type' => 'optional',
	],
];
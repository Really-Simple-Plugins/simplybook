<?php
namespace Simplybook\Api\ApiResponse;
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class ApiResponse {
	public bool $status;
	public string $message;
	public int $code;
	public function __construct( $status=true, $message='', $code=200) {
		$this->status = $status;
		$this->message = $message;
		$this->code = $code;
	}
}

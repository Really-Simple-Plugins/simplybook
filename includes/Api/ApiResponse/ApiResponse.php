<?php
namespace Simplybook_old\Api\ApiResponse;
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @deprecated Use {@see \SimplyBook\App\Http\DTO\ApiResponseDTO} instead
 */
class ApiResponse {
	public bool $success;
	public string $message;
	public int $code;
	public function __construct( $success = true, $message='', $code=200) {
		$this->success = $success;
		$this->message = $message;
		$this->code = $code;
	}
}
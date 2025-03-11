<?php
namespace SimplyBook\Http\DTO;

class ApiResponseDTO
{
    public bool $success;
    public string $message;
    public int $code;

    public function __construct(bool $success = true, string $message = '', int $code = 200)
    {
        $this->success = $success;
        $this->message = $message;
        $this->code = $code;
    }
}
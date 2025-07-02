<?php
namespace SimplyBook\Http\DTO;

class ApiResponseDTO
{
    public bool $success;
    public string $message;
    public int $code;
    public array $data;

    public function __construct(bool $success = true, string $message = '', int $code = 200, array $data = [])
    {
        $this->success = $success;
        $this->message = $message;
        $this->code = $code;
        $this->data = $data;
    }
}
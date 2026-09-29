<?php

namespace SimplyBook\Exceptions;

class ApiException extends \Exception
{
    protected array $data = [];
    protected int $statusCode = 400;

    public function setResponseCode(int $code): ApiException
    {
        $this->statusCode = $code;
        return $this;
    }

    public function getResponseCode(): int
    {
        return $this->statusCode;
    }

    public function setData(array $data): ApiException
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Get extra data from the exception
     * @param string $key Used to retrieve value from {@see $data} array based
     * on key.
     * @return array|string
     */
    public function getData(string $key = '')
    {
        if (!empty($key)) {
            return ($this->data[$key] ?? '');
        }

        return $this->data;
    }
}

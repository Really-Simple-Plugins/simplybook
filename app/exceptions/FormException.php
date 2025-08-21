<?php

namespace SimplyBook\Exceptions;

class FormException extends \Exception
{
    /**
     * The errors
     */
    protected array $errors = [];

    /**
     * The accepted error keys
     */
    protected array $acceptedErrorKeys = [
        'key',
        'message',
    ];

    /**
     * Set the data for the exception. Multiple address fields can contain an
     * error so each entry in the array should contain the key and the type of
     * the error.
     * @throws \Exception Should be uncaught to know we're doing it wrong
     */
    public function setErrors(array $errors): FormException
    {
        foreach ($errors as $fields) {
            foreach ($fields as $key => $errorData) {
                if (!empty($this->acceptedErrorKeys) && !in_array($key, $this->acceptedErrorKeys)) {
                    throw new \Exception('The key ' . esc_html($key) . ' is not accepted in the data array.');
                }
            }
        }

        $this->errors = $errors;
        return $this;
    }

    /**
     * Get the errors from the exception
     */
    public function getErrors(): array
    {
        return $this->errors;
    }
}
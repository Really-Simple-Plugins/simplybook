<?php

declare(strict_types=1);

namespace SimplyBook\Exceptions;

/**
 * Exception thrown when the ability execution failed. If the result of the
 * execution results in a WP_Error the WP_Error can be parsed, this throwable
 * provides helpers to access the WP_Error details.
 */
class AbilityFailedException extends \RuntimeException
{
    public const ERROR_INVALID_PERMISSIONS = 'ability_invalid_permissions';
    public const ERROR_INVALID_INPUT = 'ability_invalid_input';

    private array $errors = [];
    private array $errorData = [];
    private ?\WP_Error $wpError = null;

    /**
     * Setter method to store the WP_Error instance. Is used for later parsing
     * of the error details and easy access to them.
     */
    public function setWpError(\WP_Error $wpError): AbilityFailedException
    {
        $this->wpError = $wpError;
        return $this;
    }

    /**
     * Manually set errors array in case no WP_Error is available or used.
     */
    public function setErrors(array $errors): AbilityFailedException
    {
        $this->errors = $errors;
        return $this;
    }

    /**
     * Either returns the errors from the WP_Error instance or the manually set
     * errors array.
     */
    public function getErrors(): array
    {
        if ($this->wpError instanceof \WP_Error) {
            return $this->wpError->errors;
        }

        return $this->errors;
    }

    /**
     * Manually set error data array in case no WP_Error is available or used.
     */
    public function setErrorData(array $errorData): AbilityFailedException
    {
        $this->errorData = $errorData;
        return $this;
    }

    /**
     * Either returns the error data from the WP_Error instance or the manually
     * set error data array.
     */
    public function getErrorData(): array
    {
        if ($this->wpError instanceof \WP_Error) {
            return $this->wpError->error_data;
        }

        return $this->errorData;
    }

    /**
     * Helper method to easily check if the error contains invalid permissions'
     * error.
     */
    public function executionNotAllowed(): bool
    {
        $errors = $this->getErrors();
        return in_array(self::ERROR_INVALID_PERMISSIONS, array_keys($errors), true);
    }

    /**
     * Helper method to easily check if the error contains invalid input error.
     */
    public function hasInvalidInput(): bool
    {
        $errors = $this->getErrors();
        return in_array(self::ERROR_INVALID_INPUT, array_keys($errors), true);
    }
}

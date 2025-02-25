<?php
namespace Simplybook\Exceptions;

/**
 * Used to throw validation exceptions. Properties are public to allow for easy
 * access to the field, rule and parameters that caused the exception. Use these
 * to show different error messages based on the field and rule that failed.
 */
class ValidationException extends \Exception
{
    public string $field;
    public string $rule;
    public array $parameters;

    public function __construct(string $field, string $rule, array $parameters = [], string $message = "")
    {
        $this->field = $field;
        $this->rule = $rule;
        $this->parameters = $parameters;

        $message = $message ?: "Validation failed for field '{$field}' with rule '{$rule}'.";

        parent::__construct($message);
    }
}
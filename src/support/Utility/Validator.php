<?php namespace Simplybook\Utility;

use Simplybook\Exceptions\ValidationException;

/**
 * Though Helpers and Utils are often used interchangeably, utility classes are
 * typically more generic, while helper classes are tailored to an application's
 * needs.
 */
class Validator
{
    /**
     * The data to validate
     */
    private array $data;

    /**
     * The validation rules
     */
    private array $rules;

    /**
     * Use custom error messages for specific fields and rules and/or override
     * the default messages for built-in rules when you need translatable
     * messages for example.
     */
    private array $customMessages = [];

    /**
     * Built-in validation rules
     */
    private array $validationRules = [
        'required' => 'validateRequired',
        'email' => 'validateEmail',
        'min' => 'validateMin',
        'max' => 'validateMax',
        'numeric' => 'validateNumeric',
        'alpha' => 'validateAlpha',
        'alphanumeric' => 'validateAlphanumeric',
        'url' => 'validateUrl',
        'date' => 'validateDate',
        'in' => 'validateIn',
        'regex' => 'validateRegex'
    ];

    /**
     * Default error messages for built-in rules
     */
    private array $defaultMessages = [
        'required' => 'The :field field is required.',
        'email' => 'The :field must be a valid email address.',
        'min' => 'The :field must be at least :param characters.',
        'max' => 'The :field must not exceed :param characters.',
        'numeric' => 'The :field must be numeric.',
        'alpha' => 'The :field must contain only letters.',
        'alphanumeric' => 'The :field must contain only letters and numbers.',
        'url' => 'The :field must be a valid URL.',
        'date' => 'The :field must be a valid date.',
        'in' => 'The :field must be one of: :param.',
        'regex' => 'The :field format is invalid.'
    ];

    public function __construct(array $data, array $rules, array $messages = [])
    {
        $this->data = $data;
        $this->rules = $rules;
        $this->customMessages = $messages;
    }

    /**
     * Add a custom validation rule
     */
    public function addRule(string $ruleName, callable $callback, string $message): void
    {
        $this->validationRules[$ruleName] = $callback;
        $this->defaultMessages[$ruleName] = $message;
    }

    /**
     * Validate the data against the rules
     * @throws ValidationException if validation fails
     */
    public function validate(): bool
    {
        foreach ($this->rules as $field => $fieldRules) {
            $rules = is_string($fieldRules) ? explode('|', $fieldRules) : $fieldRules;

            foreach ($rules as $rule) {
                $this->processRule($field, $rule);
            }
        }

        return empty($this->errors);
    }

    /**
     * Process a single validation rule
     * @throws ValidationException
     */
    private function processRule(string $field, string $rule): void
    {
        $parameters = [];

        if (strpos($rule, ':') !== false) {
            [$rule, $parameter] = explode(':', $rule, 2);
            $parameters = explode(',', $parameter);
        }

        if (isset($this->validationRules[$rule])) {
            $method = $this->validationRules[$rule];

            if (is_string($method) && method_exists($this, $method)) {
                if (!$this->$method($field, $parameters)) {
                    $this->throwValidationException($field, $rule, $parameters);
                }
            } elseif (is_callable($method)) {
                if (!$method($this->data[$field] ?? null, ...$parameters)) {
                    $this->throwValidationException($field, $rule, $parameters);
                }
            }
        }
    }

    /**
     * Add an error message
     * @throws ValidationException
     */
    private function throwValidationException(string $field, string $rule, array $parameters = []): void
    {
        $message = $this->customMessages["$field.$rule"]
            ?? $this->customMessages[$rule]
            ?? $this->defaultMessages[$rule]
            ?? 'The :field field is invalid.';

        $message = str_replace(':field', $field, $message);
        $message = str_replace(':param', implode(', ', $parameters), $message);

        throw new ValidationException($field, $rule, $parameters, $message);
    }

    private function validateRequired(string $field): bool
    {
        return isset($this->data[$field]) && $this->data[$field] !== '';
    }

    private function validateEmail(string $field): bool
    {
        return isset($this->data[$field]) &&
            filter_var($this->data[$field], FILTER_VALIDATE_EMAIL) !== false;
    }

    private function validateMin(string $field, array $parameters): bool
    {
        $length = is_string($this->data[$field])
            ? strlen($this->data[$field])
            : $this->data[$field];
        return isset($this->data[$field]) && $length >= (int)($parameters[0] ?? 0);
    }

    private function validateMax(string $field, array $parameters): bool
    {
        $length = is_string($this->data[$field])
            ? strlen($this->data[$field])
            : $this->data[$field];
        return isset($this->data[$field]) && $length <= (int)($parameters[0] ?? 0);
    }

    private function validateNumeric(string $field): bool
    {
        return isset($this->data[$field]) && is_numeric($this->data[$field]);
    }

    private function validateAlpha(string $field): bool
    {
        return isset($this->data[$field]) && ctype_alpha($this->data[$field]);
    }

    private function validateAlphanumeric(string $field): bool
    {
        return isset($this->data[$field]) && ctype_alnum($this->data[$field]);
    }

    private function validateUrl(string $field): bool
    {
        return isset($this->data[$field]) &&
            filter_var($this->data[$field], FILTER_VALIDATE_URL) !== false;
    }

    private function validateDate(string $field): bool
    {
        return isset($this->data[$field]) &&
            strtotime($this->data[$field]) !== false;
    }

    private function validateIn(string $field, array $parameters): bool
    {
        return isset($this->data[$field]) &&
            in_array($this->data[$field], $parameters, true);
    }

    private function validateRegex(string $field, array $parameters): bool
    {
        return isset($this->data[$field]) &&
            preg_match($parameters[0], $this->data[$field]);
    }
}
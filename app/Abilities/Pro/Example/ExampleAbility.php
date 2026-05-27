<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Pro\Example;

use SimplyBook\Abilities\AbstractAbility;

class ExampleAbility extends AbstractAbility
{
    public const NAME = 'example-ability';

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('Example Ability', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('This is an example ability for demonstration purposes. In just adds or removes an option from the database.', 'simplybook');
    }

    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'properties' => [
                'option_name' => [
                    'type' => 'string',
                    'description' => __('The name of the option to add or remove.', 'simplybook'),
                ],
                'option_value' => [
                    'type' => ['string', 'null'],
                    'description' => __('The value to set for the option when adding. Ignored when removing.', 'simplybook'),
                ],
                'action' => [
                    'type' => 'string',
                    'enum' => ['add', 'remove'],
                    'description' => __('The action to perform: "add" to add the option, "remove" to delete it.', 'simplybook'),
                ],
            ],
            'required' => ['option_name', 'action'],
        ];
    }

    public function getOutputSchema(): ?array
    {
        return [
            'type' => 'boolean',
            'description' => __('Indicates whether the operation was successful.', 'simplybook'),
        ];
    }

    protected function defaultExecuteCallback(): ?callable
    {
        return static function ($input) {
            $option_name = $input['option_name'] ?? '';
            $option_value = $input['option_value'] ?? null;
            $action = $input['action'] ?? 'add';

            if ($action === 'add') {
                return update_option($option_name, $option_value, false);
            } elseif ($action === 'remove') {
                return delete_option($option_name);
            }

            return false;
        };
    }

    protected function defaultPermissionCallback(): ?callable
    {
        return static function () {
            return current_user_can('manage_options');
        };
    }
}

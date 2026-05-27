<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Design;

use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Services\DesignSettingsService;

class ListDesignSettingsAbility extends AbstractAbility
{
    public const NAME = 'list-design-settings';

    private DesignSettingsService $designSettingsService;
    
    public function __construct(DesignSettingsService $designSettingsService)
    {
        $this->designSettingsService = $designSettingsService;
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('List Design Settings', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Returns the saved SimplyBook.me design settings as key/value pairs. Optionally returns a single setting when a key is provided.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => ['object', 'null'],
            'properties' => [
                'key' => [
                    'type' => 'string',
                    'description' => __('Optional. The design setting key to return. Omit to return all design settings.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    public function getOutputSchema(): ?array
    {
        return [
            'oneOf' => [
                [
                    'type' => 'object',
                    'description' => __('Map of design setting keys to their saved values. Contains a single entry when an input key is provided.', 'simplybook'),
                    'additionalProperties' => true,
                ],
                [
                    'type' => 'string',
                    'description' => __('Human-readable message returned when the design settings could not be found or the requested key does not exist.', 'simplybook'),
                ],
            ],
        ];
    }

    /**
     * @inheritDoc
     */
    protected function defaultExecuteCallback(): ?callable
    {
        $settings = $this->designSettingsService->getDesignOptions();

        return static function ($input = null) use ($settings) {
            if (empty($settings)) {
                return __('Design settings could not be found.', 'simplybook');
            }

            $key = is_array($input) ? ($input['key'] ?? null) : null;

            if (!is_string($key) || $key === '') {
                return $settings;
            }

            if (!array_key_exists($key, $settings)) {
                return sprintf(
                    /* translators: %s: design setting key */
                    __('Design setting "%s" could not be found.', 'simplybook'),
                    $key
                );
            }

            return [$key => $settings[$key]];
        };
    }

    /**
     * @inheritDoc
     */
    protected function defaultPermissionCallback(): ?callable
    {
        return static function () {
            return current_user_can('simplybook_manage');
        };
    }

    /**
     * @inheritDoc
     */
    public function getMeta(): ?array
    {
        return [
            'show_in_rest' => true,
            'mcp' => [
                'public' => true,
            ]
        ];
    }
}

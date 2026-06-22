<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Design;

use Throwable;
use SimplyBook\Abilities\AbstractAbility;
use SimplyBook\Services\DesignSettingsService;

class UpdateDesignSettingsAbility extends AbstractAbility
{
    public const NAME = 'update-design-settings';

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
        return __('Update Design Settings', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Updates one or more SimplyBook.me design settings. Values are validated against the design fields configuration to prevent accidental type mismatches before being saved.', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getInputSchema(): ?array
    {
        return [
            'type' => 'object',
            'required' => ['settings'],
            'properties' => [
                'settings' => [
                    'type' => 'object',
                    'description' => __('Map of design setting keys to their new values. Nested groups (e.g. "theme_settings") are passed as nested objects.', 'simplybook'),
                    'additionalProperties' => true,
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
            'type' => ['object', 'string', 'null'],
            'description' => __('The updated design settings map on success, or a human-readable message describing the validation or save error.', 'simplybook'),
        ];
    }

    /**
     * @inheritDoc
     */
    protected function executeCallback(): ?callable
    {
        $service = $this->designSettingsService;

        return static function ($input = null) use ($service) {
            if (!is_array($input) || empty($input['settings']) || !is_array($input['settings'])) {
                return __('A non-empty "settings" object is required.', 'simplybook');
            }

            try {
                do_action('simplybook_save_design_settings', $input['settings']);
            } catch (Throwable $e) {
                return __('The provided design settings could not be saved.', 'simplybook');
            }

            // Re-fetch so the caller sees the merged, persisted state.
            return $service->getDesignOptions(true);
        };
    }

    /**
     * @inheritDoc
     */
    protected function permissionCallback(): ?callable
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

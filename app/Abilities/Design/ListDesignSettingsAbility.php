<?php

declare(strict_types=1);

namespace SimplyBook\Abilities\Design;

use WP_Error;
use SimplyBook\Support\Helpers\Storage;
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
                    'description' => __('Optional. The design setting key to return. Omit to return all design settings. Use dot notation to get nested values.', 'simplybook'),
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
            'type' => ['object', 'array', 'string', 'boolean', 'number', 'null'],
            'description' => __('The full design settings map, a nested section, a scalar value resolved by dot-notation, or a human-readable message when the settings or requested key could not be found.', 'simplybook'),
        ];
    }

    /**
     * @inheritDoc
     */
    protected function getExecuteCallback(): ?callable
    {
        $settings = $this->designSettingsService->getDesignOptions();
        $storage = new Storage($settings);

        return static function ($input = null) use ($storage) {
            if ($storage->isEmpty()) {
                $code = 'simplybook_design_settings_not_found';
                $message = __('Design settings could not be found.', 'simplybook');
                return new WP_Error($code, $message, [
                    'status' => 404,
                ]);
            }

            if (empty($input) || !is_array($input) || empty($input['key'])) {
                return $storage->all();
            }

            $search = (string) $input['key'];
            if (!$storage->has($search)) {
                $code = 'simplybook_design_setting_not_found';
                $message = sprintf(
                    /* translators: %s: user-provided search key */
                    __('Design setting "%s" could not be found.', 'simplybook'),
                    esc_html($search)
                );

                return new WP_Error($code, $message, [
                    'status' => 404,
                ]);
            }

            return $storage->get($search);
        };
    }

    /**
     * @inheritDoc
     */
    protected function getPermissionCallback(): ?callable
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

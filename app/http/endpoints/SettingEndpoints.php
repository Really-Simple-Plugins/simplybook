<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Exceptions\FormException;
use SimplyBook\Interfaces\MultiEndpointInterface;
use SimplyBook\Controllers\DesignSettingsController;

class SettingEndpoints implements MultiEndpointInterface
{
    use LegacySave;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'settings';

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            self::ROUTE . '/save' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'saveSettingsCallback'],
            ],
            self::ROUTE . '/get' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'getSettingsCallback'],
            ],
        ];
    }

    /**
     * Process the request to save the settings. Method will also make sure the
     * settings are saved in the correct format. Settings are skipped for saving
     * if the 'value' key is not set.
     */
    public function saveSettingsCallback(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $fields = $this->retrieveHttpParameters($request, $ajaxData, '');

        unset($fields['nonce']);

        if (count($fields) === 0) {
            return $this->sendHttpResponse(['error' => 'No data to save']);
        }

        if (isset($fields['settings_section'])) {
            return $this->processSpecificSettingSection($fields['settings_section'], $fields);
        }

        //check the data format. If it is [id => value], convert it to [ ['id' => 'the-id', 'value' => 'the-value'], ...]
        if (!isset($fields[0]['id'])) {
            //convert [id => value, format to [ ['id' => 'the-id', 'value' => 'the-value'], ...]
            $fields = array_map(function($key, $value) {
                return ['id' => $key, 'value' => $value];
            }, array_keys($fields), $fields);
        }

        //filter out all fields where the 'value' key is not set
        $fields = array_filter($fields, function($field) {
            return isset($field['value']);
        });

        $this->update_options($fields);
        $fields = $this->fields(true);
        return $this->sendHttpResponse($fields);
    }

    /**
     * Return the fields array. Values of the fields are included when requested
     */
    public function getSettingsCallback(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request, $ajaxData);
        $getSettingsWithValues = ($storage->getInt('withValues') === 1);

        $fields = $this->fields($getSettingsWithValues);
        return $this->sendHttpResponse($fields);
    }

    /**
     * Method can be called when the settings_section is set. This will trigger
     * the action simplybook_save_{settings_section} which can be used to
     * process the settings elsewhere. See {@see DesignSettingsController} as
     * an example.
     *
     * @uses do_action simplybook_save_{settings_section}
     */
    private function processSpecificSettingSection(string $settingsSection, array $fields): \WP_REST_Response
    {
        /**
         * Action: simplybook_save_{settings_section}
         * @hooked SimplyBook\Listeners\TaskManagementListener::listen()
         * @hooked SimplyBook\Controllers\DesignSettingsController::saveSettings()
         * @throws FormException Should be thrown on invalid settings
         */
        try {
            do_action('simplybook_save_' . sanitize_title($settingsSection), $fields);
        } catch (FormException $e) {
            return $this->sendHttpResponse([
                'errors' => $e->getErrors(),
            ], false, esc_html__('Error processing settings', 'simplybook'));
        }

        $fields = $this->fields(true);
        return $this->sendHttpResponse($fields);
    }
}
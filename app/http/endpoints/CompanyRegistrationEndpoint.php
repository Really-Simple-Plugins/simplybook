<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class CompanyRegistrationEndpoint implements SingleEndpointInterface
{
    use LegacySave;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'company_registration';

    private string $callbackUrl;

    public function __construct()
    {
        $this->callbackUrl = $this->get_callback_url();
    }

    /**
     * This endpoint is disabled when the temporary callback URL is not (yet)
     * set or is expired.
     */
    public function enabled(): bool
    {
        return !empty($this->callbackUrl) && $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoute(): string
    {
        return self::ROUTE . '/' . $this->callbackUrl;
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'callback'],
            'permission_callback' => '__return_true',
        ];
    }

    /**
     * This callback runs via the POST request to the company registration API.
     * The response is used to update:
     * - the company token
     * - the company refresh token
     * - the company domain
     * - the company ID
     *
     * This method will also:
     * - update the company token expiration time
     * - cleanup the callback URL
     * - validate the tasks
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        if ($storage->getBoolean('success') === false) {
            $errorMessage = 'An error occurred during the registration process';
            if ($storage->isNotEmpty('error.message')) {
                $errorMessage = $storage->getString('error.message');
                $this->log($storage->getString('error.message'));
            }
            return new \WP_REST_Response([
                'error' => $errorMessage,
            ], 400);
        }

        $this->update_token($storage->getString('token'), 'admin');
        $this->update_token($storage->getString('refresh_token'), 'admin', true);

        update_option('simplybook_refresh_company_token_expiration', time() + 3600);

        $this->update_option('domain', $storage->getString('domain'), true);
        $this->update_option('company_id', $storage->getInt('company_id'), true);

        // todo - find better way of doing the below. Maybe a custom action where controller can hook into?
        $this->cleanup_callback_url();

        /**
         * Action: simplybook_after_company_registered
         * @hooked SimplyBook\Controllers\ServicesController::setInitialServiceName
         */
        do_action('simplybook_after_company_registered', $storage->getString('domain'), $storage->getInt('company_id'));

        return new \WP_REST_Response([
            'message' => 'Successfully registered company for current WordPress website.',
        ]);
    }
}
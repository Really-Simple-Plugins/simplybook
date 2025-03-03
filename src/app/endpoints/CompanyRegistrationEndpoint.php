<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use Simplybook_old\Traits\Save;
use SimplyBook\Traits\HasRestAccess;
use Simplybook_old\Admin\Tasks\Tasks;
use SimplyBook\Interfaces\SingleEndpointInterface;

class CompanyRegistrationEndpoint implements SingleEndpointInterface
{
    use Save;
    use HasRestAccess;

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
        return !empty($this->callbackUrl);
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
    public function callback(\WP_REST_Request $request): void
    {
        $client = App::provide('client');
        $storage = $this->retrieveHttpStorage($request, [], '');
        $data = $request->get_json_params();

        if ($storage->getBoolean('success') === false) {
            if ($storage->isNotEmpty('error.message')) {
                $this->log($storage->getString('error.message'));
            }
            return;
        }

        $client->update_token($storage->getString('token'), 'admin' );
        $client->update_token($storage->getString('refresh_token'), 'admin', true );

        update_option('simplybook_refresh_company_token_expiration', time() + 3600);

        $this->update_option('domain', $storage->getString('domain'));
        $this->update_option('company_id', $storage->getInt('company_id'));

        // todo - find better way of doing the below. Maybe a custom action where controller can hook into?

        $this->cleanup_callback_url();

        $tasks = new Tasks();
        $tasks->validate_tasks();
    }
}
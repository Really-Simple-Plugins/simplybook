<?php namespace SimplyBook\Http\Endpoints;

use SimplyBook\Interfaces\EndpointInterface;

class ExampleEndpoint implements EndpointInterface
{
    public function registerRoutes()
    {
        register_rest_route('namespace',
            'endpoint' . '/(?P<endpoint_id>[^/]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'callback'],
                'permission_callback'  => [$this, 'checkPermissions'],
            ]
        );
    }

    /**
     * Handle the request
     * @return bool|\WP_REST_Response
     */
    public function callback(\WP_REST_Request $request)
    {
        return new \WP_REST_Response('Success', 200);
    }

    /**
     * Check if the request can be processed
     * @return bool|\WP_Error
     */
    public function checkPermissions(\WP_REST_Request $request)
    {
        $endpointID = $request->get_param('endpoint_id');

        if (!empty($endpointID)) {
            return true;
        }

        return new \WP_Error('rest_forbidden', esc_html__('Forbidden.', 'rs-plugin'), array('status' => 403));
    }

}
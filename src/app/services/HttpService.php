<?php namespace SimplyBook\App\Services;

class HttpService
{
    /**
     * Retrieve the parameters from the request.
     *
     * If the data is coming from an AJAX request, its data will be prioritized
     * over the request's JSON parameters.
     *
     * @param mixed $request
     * @param array $ajaxData
     */
    protected function retrieveRestParameters($request, array $ajaxData = []): array
    {
        return !empty($ajaxData) ? $ajaxData : $request->get_json_params();
    }

    /**
     * Standardized response format
     *
     * @param array $data - Data to return
     * @param string $status - If this action has completed successfully
     * @param string $message - Message to return
     * @param int $code - HTTP status code
     * @return \WP_REST_Response
     */
    protected function sendRestResponse(array $data = [], string $status = 'success', string $message = '', int $code = 200): \WP_REST_Response
    {
        if (ob_get_length()) {
            ob_clean();
        }

        return new \WP_REST_Response([
            'message' => $message,
            'status'  => $status ? 'success' : 'error',
            'data'    => $data,
            'request_success' => true, // can be used to check if the response in react actually contains this array.
        ], $code);
    }
}
<?php namespace SimplyBook\App\Services;

use SimplyBook\Helpers\Storage;

class HttpService
{
    /**
     * Retrieve the parameters from the request.
     *
     * If the data is coming from an AJAX request, its data will be prioritized
     * over the request's JSON parameters.
     */
    public function retrieveHttpParameters(\WP_REST_Request $request, array $ajaxData = [], string $param = 'data'): array
    {
        return $ajaxData[$param] ?? $request->get_param($param);
    }

    /**
     * Retrieve the parameters from the request and store them as Storage.
     */
    public function retrieveHttpStorage(\WP_REST_Request $request, array $ajaxData = [], string $param = 'data'): Storage
    {
        return new Storage(
            $this->retrieveHttpParameters($request, $ajaxData, $param)
        );
    }

    /**
     * Standardized response format
     *
     * @param array $data - Data to return
     * @param bool $status - If this action has completed successfully
     * @param string $message - Message to return
     * @param int $code - HTTP status code
     * @return \WP_REST_Response
     */
    public function sendHttpResponse(array $data = [], bool $status = true, string $message = '', int $code = 200): \WP_REST_Response
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
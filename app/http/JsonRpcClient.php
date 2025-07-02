<?php

namespace SimplyBook\Http;

/**
 * JSON-RPC Client class
 */
class JsonRpcClient
{
    protected int $requestId = 1;
    protected array $contextOptions;
    protected string $url;

    /**
     * Set the URL for the JSON-RPC client
     */
    public function setUrl(string $url): JsonRpcClient
    {
        $this->url = $url;
        return $this;
    }

    /**
     * Set the context options for the JSON-RPC client
     *
     * @param array $values Format: [
     *     'header: value',
     * ]
     */
    public function setHeaders(array $values): JsonRpcClient
    {
        $headers = array_merge([
            'Content-type: application/json'
        ], $values);

        $this->contextOptions = [
            'http' => [
                'method' => 'POST',
                'header' => implode("\r\n", $headers) . "\r\n"
            ]
        ];

        return $this;
    }

    /**
     * Performs a jsonRPC request and returns the result
     *
     * @param string $method
     * @param array $params
     * @return mixed
     * @throws \Exception
     */
    public function __call(string $method, array $params)
    {
        if (empty($this->url)) {
            throw new \Exception('URL is not set');
        }

        if (empty($this->contextOptions)) {
            throw new \Exception('Context options are not set');
        }

        $currentId = $this->requestId++;
        $request = [
            'method' => $method,
            'params' => array_values($params),
            'id'     => $currentId
        ];
        $request = json_encode($request);

        $this->contextOptions['http']['content'] = $request;

        $response = file_get_contents($this->url, false, stream_context_create($this->contextOptions));
        $result = json_decode($response, false);

        if ($result->id != $currentId) {
            throw new \Exception('Incorrect response id (request id: ' . esc_html($currentId) . ', response id: ' . esc_html($result->id) . ')' . "\n\nResponse: " . esc_html($response));
        }

        if (isset($result->error) && $result->error) {
            throw new \Exception('Request error: ' . esc_html($result->error->message));
        }

        return $result->result;
    }
}
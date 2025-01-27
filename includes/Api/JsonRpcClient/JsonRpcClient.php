<?php
namespace Simplybook\Api\JsonRpcClient;

/**
 * JSON-RPC CLient class
 */
class JsonRpcClient {

	protected $_requestId = 1;
	protected $_contextOptions;
	protected $_url;

	/**
	 * Constructor. Takes the connection parameters
	 *
	 * @param String $url
	 * @param [] $headers
	 * @param [] $options
	 */
	public function __construct($url, $options = array()) {
		$headers = array('Content-type: application/json');
		if (isset($options['headers'])) {
			$headers = array_merge($headers, $options['headers']);
		}
		$this->_contextOptions = array(
			'http' => array(
				'method' => 'POST',
				'header' => implode("\r\n", $headers) . "\r\n"
			)
		);

		$this->_url = $url;
	}

	/**
	 * Performs a jsonRCP request and return result
	 *
	 * @param String $method
	 * @param [] $params
	 * @return mixed
	 */
	public function __call($method, $params) {
		$currentId = $this->_requestId++;
		$request = array(
			'method' => $method,
			'params' => array_values($params),
			'id'     => $currentId
		);
		$request = json_encode($request);

		$this->_contextOptions['http']['content'] = $request;

		$response = file_get_contents($this->_url, false, stream_context_create($this->_contextOptions));
		$result = json_decode($response, false);
		if (!$result) {
			error_log("invalid response: " );
			error_log(print_r($response,true));
		}
		if ($result->id != $currentId) {
			error_log("Incorrect response id (request id: {$currentId}, response id: {$result->id})" );
			error_log(print_r($response,true));
		}
		if (isset($result->error) && $result->error) {
			error_log("invalid response: " );
			error_log(print_r($result->error->message,true));
		}

		return $result->result;
	}
}
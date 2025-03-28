import { X_WP_NONCE, NONCE, SB_API_URL } from '../config';
import { __ } from "@wordpress/i18n";

/**
 * HttpClient class to handle HTTP requests.
 */
class HttpClient {
    private readonly endpoint: string;
    private getMethodHeaders: Record<string, string> = {
        'X-WP-NONCE': X_WP_NONCE,
    }

    private postMethodHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-WP-NONCE': X_WP_NONCE,
    };

    private payload: Record<string, any> = {
        'nonce': NONCE,
    }

    /**
     * Constructor to initialize the endpoint URL.
     * @param endpoint - The API endpoint to be used.
     */
    constructor(endpoint: string) {
        this.endpoint = SB_API_URL + endpoint;
    }

    /**
     * Performs a GET request.
     * @returns The response data in JSON format.
     * @throws An error if the response is not ok.
     */
    async get() {
        const response = await fetch(this.endpoint, {
            method: 'GET',
            headers: this.getMethodHeaders,
        });
        if (!response.ok) {
            const errorData = await response.json();
            return this.handleError(errorData);
        }
        return response.json();
    }

    /**
     * Performs a POST request.
     * @param body - The body of the POST request.
     * @returns The response data in JSON format.
     * @throws An error if the response is not ok.
     */
    async post(body: any) {
        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: this.postMethodHeaders,
            body: JSON.stringify({
                ...body,
                nonce: NONCE,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return this.handleError(errorData);
        }
        return response.json();
    }

    /**
     * Sets custom headers for GET or POST requests.
     * @param headers - The headers to be set.
     * @param method - The HTTP method ('get' or 'post').
     * @returns The HttpClient instance.
     */
    public setHeaders(headers: Record<string, string>, method: 'get' | 'post') {
        if (method === 'get') {
            this.getMethodHeaders = {
                ...this.getMethodHeaders,
                ...headers,
            };
            return this;
        }

        if (method === 'post') {
            this.postMethodHeaders = {
                ...this.postMethodHeaders,
                ...headers,
            };
            return this;
        }

        return this;
    }

    /**
     * Sets additional payload data.
     * @param payload - The payload data to be set.
     * @returns The HttpClient instance.
     */
    public setPayload(payload: Record<string, any>) {
        this.payload = {
            ...this.payload,
            ...payload,
        };
        return this;
    }

    /**
     * Handles errors from the server response.
     * @param errorData - The error data from the server.
     * @throws An error with a message.
     */
    private handleError(errorData: any) {
        let error = __('An error occurred', 'simplybook');

        if (typeof errorData === 'string') {
            error = errorData;
        }

        if (errorData?.message) {
            error = errorData.message;
        }

        if (errorData?.error) {
            error = errorData.error;
        }

        throw new Error(error);
    }
}

export default HttpClient;
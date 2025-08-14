import { X_WP_NONCE, NONCE, SB_API_URL } from '../config';
import { __ } from "@wordpress/i18n";
import { DataError } from "../helpers/DataError";

/**
 * HttpClient class to handle HTTP requests.
 */
class HttpClient {
    private route: string | null = null;
    private getMethodHeaders: Record<string, string> = {
        'X-WP-NONCE': X_WP_NONCE,
    };

    private postMethodHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-WP-NONCE': X_WP_NONCE,
    };

    private payload: Record<string, any> = {
        'nonce': NONCE,
    };

    /**
     * Constructor to initialize the route URL.
     * @param route - The API route to be used.
     */
    constructor(route?: string) {
        if (route) {
            this.route = SB_API_URL + route;
        }
    }

    /**
     * Performs a GET request.
     * @returns The response data in JSON format.
     * @throws Error if the response is not ok or route is not set.
     */
    async get() {
        if (!this.route) {
            throw new Error(__('Route is not set', 'simplybook'));
        }

        const response = await fetch(this.route, {
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
     * @param data - The body of the POST request.
     * @returns The response data in JSON format.
     * @throws Error if the response is not ok or route is not set.
     */
    async post(data?: any) {
        if (!this.route) {
            throw new Error(__('Route is not set', 'simplybook'));
        }

        if (!this.payload.payloadWasSet) {
            this.setPayload(data);
        }

        const response = await fetch(this.route, {
            method: 'POST',
            headers: this.postMethodHeaders,
            body: JSON.stringify({
                ...this.payload,
                nonce: NONCE,
            }),
        });

        this.resetPayload();

        if (!response.ok) {
            const errorData = await response.json();
            return this.handleError(errorData);
        }
        return response.json();
    }

    /**
     * Performs a PUT request.
     * @param data - The body of the POST request.
     * @returns The response data in JSON format.
     * @throws Error if the response is not ok or route is not set.
     */
    async put(data: any) {
        if (!this.route) {
            throw new Error(__('Route is not set. Use setRoute() before calling put()', 'simplybook'));
        }

        if (!this.payload.payloadWasSet) {
            this.setPayload(data);
        }

        const payload = {
            ...this.payload,
            ...(data && { ...data }),
        };

        const response = await fetch(this.route, {
            method: 'PUT',
            headers: this.postMethodHeaders,
            body: JSON.stringify({ ...payload }),
        });

        this.resetPayload();

        if (!response.ok) {
            const errorData = await response.json();
            return this.handleError(errorData);
        }
        return response.json();
    }

    /**
     * Performs a DELETE request.
     * @returns The response data in JSON format.
     * @throws Error if the response is not ok or route is not set.
     */
    async delete() {
        if (!this.route) {
            throw new Error(__('Route is not set. Use setRoute() before calling delete()', 'simplybook'));
        }

        const payload = {
            nonce: NONCE,
        };

        const response = await fetch(this.route, {
            method: 'DELETE',
            headers: this.postMethodHeaders,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return this.handleError(errorData);
        }
        return response.json();
    }

    /**
     * Sets the route URL.
     * @param route - The API route to be used.
     * @returns The HttpClient instance.
     */
    public setRoute(route: string) {
        this.route = SB_API_URL + route;
        return this;
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
        if (!payload) {
            throw new Error(__('Payload not set. Use setPayload().', 'simplybook'));
        }
        this.payload = {
            ...this.payload,
            ...payload,
            payloadWasSet: true,
        };
        return this;
    }

    private resetPayload() {
        this.payload = {
            'nonce': NONCE,
        };
    }

    /**
     * Handles errors from the server response.
     * @param errorData - The error data from the server.
     * @throws An error with a message.
     */
    private handleError(errorData: any) {
        let error = __('An unknown error occurred. Please try again.', 'simplybook');
        let fields;

        if (errorData?.code === 'internal_server_error') {
            throw new Error(error);
        }

        if (typeof errorData === 'string') {
            error = errorData;
        }

        if (errorData?.message) {
            error = errorData.message;
        }

        if (errorData?.error) {
            error = errorData.error;
        }

        if (errorData?.errors) {
            fields = errorData.errors;
        }

        throw new DataError(error, fields);
    }
}

export default HttpClient;
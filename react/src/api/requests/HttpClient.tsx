import {X_WP_NONCE, NONCE, SB_API_URL} from '../config';
import {__} from "@wordpress/i18n";

/**
 * HttpClient class to handle HTTP requests.
 */
class HttpClient {
    private route: string | null = null;
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
     * @throws An error if the response is not ok or route is not set.
     */
    async get() {
        if (!this.route) {
            throw new Error(__('Route is not set', 'simplybook'));
        }

        return await fetch(this.route, {
            method: 'GET',
            headers: this.getMethodHeaders,
        }).then(async (response) => {
            console.log(response);
            return {
                json: await response.json().then((json) => (json)),
                ok: response.ok,
            }
        }).then((response) => {
            if (!response.ok){
                return this.handleError(response.json);
            }
            return response.json;
        }).catch((error) => {
            return this.handleError(error);
        });


        // const response = await fetch(this.route, {
        //     method: 'GET',
        //     headers: this.getMethodHeaders,
        // });
        // if (!response.ok) {
        //     let errorData;
        //     try {
        //         errorData = await response.json();
        //     } catch (e) {
        //         // If JSON parsing fails, response is likely HTML (PHP error)
        //         const htmlText = await response.text();
        //         throw new Error(`Server error (${response.status}): ${htmlText.substring(0, 100)}...`);
        //     }
        //     return this.handleError(errorData);
        // }
        // try {
        //     return await response.json();
        // } catch (e) {
        //     // If JSON parsing fails, response is likely HTML (PHP error)
        //     const message = e instanceof Error ? e.message : 'Unknown error';
        //     throw new Error(`Invalid JSON response: ${message}`);
        // }
    }

    /**
     * Performs a POST request.
     * @param route - The API route or body data if route is already set.
     * @param data - The body of the POST request.
     * @returns The response data in JSON format.
     * @throws An error if the response is not ok or route is not set.
     */
    async post(data?: any) {
        console.log(this.route);
        if (!this.route) {
            throw new Error(__('Route is not set', 'simplybook'));
        }

        const payload = data ?? this.payload;
        if (!payload) {
            throw new Error(__('Payload is not set', 'simplybook'));
        }

        return await fetch(this.route, {
            method: 'POST',
            headers: this.postMethodHeaders,
            body: JSON.stringify({
                ...payload,
                nonce: NONCE,
            }),
        }).then(async (response) => {
            return {
                json: await response.json().then((json) => (json)),
                ok: response.ok,
            }
        }).then((response) => {
            if (!response.ok){
                return this.handleError(response.json);
            }
            return response.json;
        }).catch((error) => {
            return this.handleError(error);
        });


        // const response = await fetch(this.route, {
        //     method: 'POST',
        //     headers: this.postMethodHeaders,
        //     body: JSON.stringify({
        //         ...payload,
        //         nonce: NONCE,
        //     }),
        // });
        // if (!response.ok) {
        //     let errorData;
        //     try {
        //         errorData = await response.json();
        //     } catch (e) {
        //         // If JSON parsing fails, response is likely HTML (PHP error)
        //         const htmlText = await response.text();
        //         throw new Error(`Server error (${response.status}): ${htmlText.substring(0, 100)}...`);
        //     }
        //     return this.handleError(errorData);
        // }
        // try {
        //     return await response.json();
        // } catch (e) {
        //     // If JSON parsing fails, response is likely HTML (PHP error)
        //     const message = e instanceof Error ? e.message : 'Unknown error';
        //     throw new Error(`Invalid JSON response: ${message}`);
        // }
    }

    /**
     * Performs a PUT request.
     */
    async put(data: any) {
        if (!this.route) {
            throw new Error(__('Route is not set. Use setRoute() before calling put()', 'simplybook'));
        }

        const payload = {
            ...data,
            nonce: NONCE,
        };

        const response = await fetch(this.route, {
            method: 'PUT',
            headers: this.postMethodHeaders,
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                // If JSON parsing fails, response is likely HTML (PHP error)
                const htmlText = await response.text();
                throw new Error(`Server error (${response.status}): ${htmlText.substring(0, 100)}...`);
            }
            return this.handleError(errorData);
        }
        try {
            return await response.json();
        } catch (e) {
            // If JSON parsing fails, response is likely HTML (PHP error)
            const message = e instanceof Error ? e.message : 'Unknown error';
            throw new Error(`Invalid JSON response: ${message}`);
        }
    }

    /**
     * Performs a DELETE request.
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
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                // If JSON parsing fails, response is likely HTML (PHP error)
                const htmlText = await response.text();
                throw new Error(`Server error (${response.status}): ${htmlText.substring(0, 100)}...`);
            }
            return this.handleError(errorData);
        }
        try {
            return await response.json();
        } catch (e) {
            // If JSON parsing fails, response is likely HTML (PHP error)
            const message = e instanceof Error ? e.message : 'Unknown error';
            throw new Error(`Invalid JSON response: ${message}`);
        }
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
// @ts-ignore
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import HttpClient from "../api/requests/HttpClient";

/**
 * Hook to manage page URL availability checking with debouncing.
 */
const usePageAvailability = (initialUrl: string, debounceDelay = 500) => {
    const [pageUrl, setPageUrl] = useState(initialUrl);
    const [pageAvailable, setPageAvailable] = useState(false);

    const httpClient = new HttpClient();

    /**
     * Checks if the provided page URL is available.
     */
    const checkPageAvailability = async (url: string) => {
        try {
            const response = await httpClient.setRoute('onboarding/is_page_title_available').setPayload({url}).post();
            return response.status === "success";
        } catch (error) {
            return false;
        }
    };

    /**
     * Debounced availability check to minimize API requests.
     */
    const debouncedCheckAvailability = useCallback(
        debounce(async (url: string) => {
            setPageAvailable(await checkPageAvailability(url));
        }, debounceDelay),
        [debounceDelay]
    );

    /**
     * Updates URL and triggers debounced availability check.
     */
    const handlePageUrlChange = (url: string) => {
        setPageUrl(url);
        debouncedCheckAvailability(url);
    };

    /**
     * Initial availability check on mount.
     */
    useEffect(() => {
        (async () => {
            setPageAvailable(await checkPageAvailability(pageUrl));
        })();
    }, []);

    return {
        pageUrl,
        pageAvailable,
        setPageUrl: handlePageUrlChange,
    };
};

export default usePageAvailability;
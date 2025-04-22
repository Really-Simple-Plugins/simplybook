import { useQuery } from "@tanstack/react-query";
import { Notice } from "../types/Notice";
import HttpClient from "../api/requests/HttpClient";

const useNotificationsData = () => {

    const statusPriority = {
        open: 10,
        hidden: 40,
    };

    const getNoticesRoute = 'get_notices';
    const client = new HttpClient();

    /**
     * Fetches notices from the server using Tanstack Query.
     */
    const { data: response, isLoading, error } = useQuery({
        queryKey: [getNoticesRoute],
        queryFn: () => client.setRoute(getNoticesRoute).get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    /**
     * Log an error message if the request fails.
     */
    if (error !== null) {
        console.error('Error fetching notices: ', error.message);
    }

    /**
     * Extract the notices from the response for easy access. And sort them by
     * priority.
     * @type {Notice[]}
     */
    let notices: Notice[] = [];
    if (Array.isArray(response?.data)) {
        notices = response?.data.map((notice: Notice) => {
            return {
                ...notice,
                priority: (statusPriority[notice.status]) ?? 69,
            };
        }).sort((a: Notice, b: Notice) => a.priority - b.priority);

        // Just to be sure we do this here too, but they shouldn't be in the
        // response anyway.
        notices = notices.filter((notice: Notice) => notice.status !== "hidden");
    }

    /**
     * Filters the notices for a specific route.
     * @param {string} route - The route to filter by.
     * @returns {Notice[]}
     */
    const getNoticesForRoute = (route: string) => {
        return notices.filter((notice: Notice) => notice.route === route);
    }

    return {
        allNotices: notices,
        getNoticesForRoute,
        isLoading,
        hasError: (error !== null),
        message: (response?.message ?? error?.message),
    };
};

export default useNotificationsData;
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useNotificationsData = () => {

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

    return {
        allNotices: response?.data,
        isLoading,
        hasError: (error !== null),
        message: (response?.message ?? error?.message),
    };
};

export default useNotificationsData;
import {useQuery} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";
import {useNotifications} from "../context/NotificationContext";

const useProviderData = (): object => {

    const { triggerNotificationById } = useNotifications();

    const route = 'providers';
    const client = new HttpClient(route);

    // Query for fetching settings from server
    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
    });

    if (error !== null) {
        console.error('Error fetching providers: ', error.message);
    }

    if (response?.data?.length === 0) {
        triggerNotificationById('add_mandatory_provider');
    }

    return {
        providers: response?.data,
        providersFetched: !isLoading,
        providersHasError: (error !== null),
        providersMessage: (response?.message ?? error?.message),
    };
};

export default useProviderData;
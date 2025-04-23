import {useQuery} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";
import {useNotifications} from "../context/NotificationContext";

const useServicesData = (): object => {

    const { triggerNotificationById } = useNotifications();

    const route = 'services';
    const client = new HttpClient(route);

    // Query for fetching settings from server
    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
    });

    if (error !== null) {
        console.error('Error fetching services: ', error.message);
    }

    if (response?.data?.length === 0) {
        triggerNotificationById('add_mandatory_service');
    }

    return {
        services: response?.data,
        servicesFetched: !isLoading,
        servicesHasError: (error !== null),
        servicesMessage: (response?.message ?? error?.message),
    };
};

export default useServicesData;
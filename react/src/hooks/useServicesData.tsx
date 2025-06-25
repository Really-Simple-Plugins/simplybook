import {useQuery} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useServicesData = () => {
    const route = 'services';
    const client = new HttpClient(route);

    const { isLoading, error, data: response } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    if (error) {
        console.error('Error fetching services data: ', error.message);
    }

    const services = response?.data || [];
    const servicesFetched = !isLoading && !error;

    return {
        services,
        servicesFetched,
        isLoading,
        error,
    };
};

export default useServicesData;
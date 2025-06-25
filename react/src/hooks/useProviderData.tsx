import {useQuery} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useProviderData = () => {
    const route = 'providers';
    const client = new HttpClient(route);

    const { isLoading, error, data: response } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    if (error) {
        console.error('Error fetching provider data: ', error.message);
    }

    const providers = response?.data || [];
    const providersFetched = !isLoading && !error;

    return {
        providers,
        providersFetched,
        isLoading,
        error,
    };
};

export default useProviderData;
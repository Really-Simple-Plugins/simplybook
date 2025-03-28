import {useQuery} from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import HttpClient from "../api/requests/HttpClient";

const useDomainData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const route = 'get_domain';
    const client = new HttpClient(route);

    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (error !== null) {
        console.error('Error fetching domain data:', error.message);
    }

    return {
        domain: response?.data?.domain,
        domainFetched: !isLoading,
        hasError: (error !== null),
        message: response?.message ?? error?.message,
    };
};

export default useDomainData;
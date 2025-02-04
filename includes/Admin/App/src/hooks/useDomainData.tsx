import {useQuery} from "@tanstack/react-query";
import getDomain from "../api/endpoints/getDomain";
import useOnboardingData from "./useOnboardingData";

const useDomainData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const query = useQuery<string>({
        queryKey: ["domain_data"],
        queryFn: async () => {
            if (!onboardingCompleted) {
                return '';
            }

            const response = await getDomain();
            console.log("getdomain response", response);
            return response;
        },
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: onboardingCompleted,
    });


    return {
        domain: query.data,
        domainFetched: (query.data?.length ?? 0) > 0,
    };
};

export default useDomainData;

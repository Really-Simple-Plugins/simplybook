import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getLoginUrl from "../api/endpoints/getLoginUrl";
import { LoginData } from "../types/LoginData";
import useOnboardingData from "./useOnboardingData";

const defaultLoginData: LoginData = {
    url: '',
    login_url: '',
    domain: '', // Add any other required properties here
};

const useLoginData = () => {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const { onboardingCompleted } = useOnboardingData();

    const query = useQuery<LoginData>({
        queryKey: ["login_data"],
        queryFn: async () => {
            const response = await getLoginUrl();
            console.log("getLoginUrl response", response);
            return response;
        },
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: true,
        initialData: defaultLoginData,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return {
        loginUrlFetched: query.isFetched,
        directUrl: query.data?.url,
        loginUrl: query.data?.login_url,
        domain: query.data?.domain,
        alreadyLoggedIn,
        setAlreadyLoggedIn,
    };
};

export default useLoginData;

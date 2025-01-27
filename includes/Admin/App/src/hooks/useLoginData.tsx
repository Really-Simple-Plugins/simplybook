import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getLoginUrl from "../api/endpoints/getLoginUrl";
import {LoginData} from "../types/LoginData";
const useLoginData = () => {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const [fetched, setFetched] = useState(false);
    const query = useQuery<LoginData>({
        queryKey: ["login_data"],
        queryFn: async () => {
            const response = await getLoginUrl();
            console.log("getloginurl response", response);
            setFetched(true);
            return response;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
    });

    return {
        fetched,
        fetchLoginData: query.refetch,
        directUrl: query.data?.url,
        loginUrl: query.data?.login_url,
        domain: query.data?.domain,
        alreadyLoggedIn: alreadyLoggedIn,
        setAlreadyLoggedIn,
    };
};

export default useLoginData;

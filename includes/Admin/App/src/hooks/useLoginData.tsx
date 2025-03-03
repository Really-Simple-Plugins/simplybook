import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import getLoginUrl from "../api/endpoints/getLoginUrl";
import { LoginData } from "../types/LoginData";
import useOnboardingData from "./useOnboardingData";

const defaultLoginData: LoginData = {
  direct_url: "",
  login_url: "",
};

const useLoginData = () => {
  const queryClient = useQueryClient();
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const { onboardingCompleted } = useOnboardingData();

  const query = useQuery<LoginData>({
    queryKey: ["login_data"],
    queryFn: async () => {
      if (!onboardingCompleted) {
        return defaultLoginData;
      }

      const response = await getLoginUrl();
      console.log("getLoginUrl response", response);
      return response;
    },
    staleTime: 1000 * 60 * 60,
    retry: 0,
    enabled: false,
    initialData: defaultLoginData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const fetchAndInvalidate = async () => {
    let response = await query.refetch();
    queryClient.setQueryData(["login_data"], response.data);
    console.log("queried data", response.data);
    return response.data;
  };

  return {
    loginData: query.data,
    loginUrlFetched: query.isFetched,
    loginUrlIsFetching: query.isFetching,
    directUrl: query.data?.direct_url,
    loginUrl: query.data?.login_url,
    alreadyLoggedIn,
    setAlreadyLoggedIn,
    fetchLinkData: fetchAndInvalidate,
  };
};

export default useLoginData;
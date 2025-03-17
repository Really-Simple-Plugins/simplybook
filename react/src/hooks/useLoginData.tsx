import { useQuery, useQueryClient } from "@tanstack/react-query";
import getLoginUrl from "../api/endpoints/getLoginUrl";
import { LoginData } from "../types/LoginData";


const defaultLoginData: LoginData = {
  simplybook_dashboard_url: "",
};


const useLoginData = () => {

  const queryClient = useQueryClient();

  const query = useQuery<LoginData>({
    // Set the key where to store the data
    queryKey: ["login_data"],
    // Run the query
    queryFn: async () => {
      const response = await getLoginUrl();
      
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

  /**
   * Refetch query to refresh data when  something has changed 
   * @returns 
   */
  const fetchAndInvalidate = async () => {
    let response = await query.refetch();
    queryClient.setQueryData(["login_data"], response.data);

    return response.data;
  };

  return {
    loginData: query.data,
    fetchLinkData: fetchAndInvalidate,
  };
};

export default useLoginData;
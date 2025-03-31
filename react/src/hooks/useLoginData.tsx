import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginData } from "../types/LoginData";
import HttpClient from "../api/requests/HttpClient";

const defaultLoginData: LoginData = {
    simplybook_dashboard_url: "",
};

const useLoginData = () => {

    const queryClient = useQueryClient();

    const route = 'get_login_url';
    const client = new HttpClient(route);

    const query = useQuery<LoginData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: false, // Only fetch on request
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
        const response = await query.refetch();
        queryClient.setQueryData([route], response?.data);
        return response?.data;
    };

    return {
        loginData: query.data,
        fetchLinkData: fetchAndInvalidate,
    };
};

export default useLoginData;
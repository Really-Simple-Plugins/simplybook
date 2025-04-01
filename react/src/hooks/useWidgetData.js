import { useQuery, useQueryClient } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useWidgetData = () => {
    const queryClient = useQueryClient();

    const route = 'get_widget';
    const client = new HttpClient(route);

    const {data: response, refetch} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        enabled: false,
    });

    const invalidateAndRefetchWidgetScript = async () => {
        queryClient.invalidateQueries({queryKey: [route]}).then(function(response) {
            return refetch();
        });
    };

    return {
        widgetScript: response?.data?.widget,
        invalidateAndRefetchWidgetScript
    };
};
export default useWidgetData;
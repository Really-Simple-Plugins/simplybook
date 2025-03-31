import { useQuery, useQueryClient } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useWidgetData = () => {
    const queryClient = useQueryClient();

    const route = 'get_widget';
    const client = new HttpClient(route);

    const query = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        enabled: false,
    });

    const invalidateAndRefetchWidgetScript = async () => {
        await queryClient.invalidateQueries({queryKey: [route]}).then(function(response) {
            query.refetch();
        });
    };

    return {
        widgetScript: query?.data?.widget,
        invalidateAndRefetchWidgetScript
    };
};
export default useWidgetData;
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useWidgetData = () => {
    const queryClient = useQueryClient();

    const client = new HttpClient();
    const getWidgetRoute = 'get_widget';
    const getPreviewWidgetRoute = 'get_preview_widget';

    const {data: response, refetch} = useQuery({
        queryKey: [getWidgetRoute],
        queryFn: () => client.setRoute(getWidgetRoute).get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        enabled: false,
    });

    const invalidateAndRefetchWidgetScript = async () => {
        queryClient.invalidateQueries({queryKey: [getWidgetRoute]}).then(function(response) {
            return refetch();
        });
    };

    const createPreviewWidget = async (formData) => {
        return await client.setRoute(getPreviewWidgetRoute).setPayload(formData).post();
    }

    return {
        widgetScript: response?.data?.widget,
        invalidateAndRefetchWidgetScript,
        createPreviewWidget,
    };
};
export default useWidgetData;
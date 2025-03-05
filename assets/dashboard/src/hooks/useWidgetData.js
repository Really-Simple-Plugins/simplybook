import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getWidget from "../api/endpoints/getWidget";

const useWidgetData = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["widget_script"],
        queryFn: () => getWidget(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        initialData: '',
        retry: 0,
        enabled: false,
    });

    const invalidateAndRefetchWidgetScript = async () => {
        console.log("invalidate and refetch widget script");
        queryClient.invalidateQueries(["widget_script"]);
        await query.refetch();
    };

    return {
        widgetScript: query.data,
        invalidateAndRefetchWidgetScript
    };
};
export default useWidgetData;